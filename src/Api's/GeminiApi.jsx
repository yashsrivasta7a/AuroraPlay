import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { GoogleGenAI } from "@google/genai";
import { CityContext } from "../Components/WeatherBar";
import { WeatherContext } from "./WeatherApi";
import { TrackContext } from "./trackContext";

const ai = new GoogleGenAI({
  apiKey: "AIzaSyBoFGWAfA9i9pn_9cT1_ZPbrZfManQlFK8",
});

const CLIENT_ID = "1a8d8b0640d34c21bdae823cad4e0a07";
const CLIENT_SECRET = "ecd16fd2b2ff47c6a129d872a0df9f01";

function GeminiApi() {
  const { setTracks } = useContext(TrackContext);
  const city = useContext(CityContext);
  const { weather, temperature } = useContext(WeatherContext);

  useEffect(() => {
    if (!weather || !temperature || !city) return;

    async function fetchData() {
      try {

        const response = await ai.models.generateContent({
          model: "gemini-2.0-flash",
          contents: `Suggest 6 Spotify song names suitable for the current weather condition "${weather}" and temperature "${temperature}°C" in the city of ${city}. 
Match the songs to the mood of the weather . Include songs that are currently popular or trending in ${city} and avoid any songs that are not available on Spotify.
Include songs according to the current season and time of day, and consider the local culture and music scene.
make sure to include 3 out 6 song in the regional language of ${city} .
Avoid generic or overused tracks and prioritize ones that reflect the current vibe in ${city}. 
Return only the song names, without artist names, in a comma-separated format.

Return format: Song Name 1, Song Name 2, ..., Song Name 6.
Do not include any explanation or extra formatting.`,
        });

        const songsText = response.text;
        if (!songsText) return;

        const songNames = songsText
          .split(",")
          .map((song) => song.trim())
          .filter((song) => song.length > 0);

        console.log("Gemini Songs:", songNames);

        const authResponse = await axios.post(
          "https://accounts.spotify.com/api/token",
          new URLSearchParams({
            grant_type: "client_credentials",
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
          }),
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );

        const accessToken = authResponse.data.access_token;


        const trackPromises = songNames.map((songName) =>
          axios.get(
            `https://api.spotify.com/v1/search?q=${encodeURIComponent(
              songName
            )}&type=track&limit=1`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          )
        );

        const responses = await Promise.all(trackPromises);

        const trackList = responses
          .map((res) => res.data.tracks.items[0])
          .filter(Boolean)
          .map((track) => ({
            id: track.id,
            name: track.name,
            url: track.external_urls.spotify,
            images: track.album.images[0]?.url || "",
          }));

        setTracks(trackList);
      } catch (error) {
        console.error("Error fetching data:", error.response?.data || error);
      }
    }

    fetchData();
  }, [city, weather, temperature]);

  return null;
}

export default GeminiApi;
