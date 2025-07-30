import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { GoogleGenAI } from "@google/genai";
import { CityContext } from "../Components/WeatherBar";
import { WeatherContext } from "./WeatherApi";
import { TrackContext } from "./trackContext";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;

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
i cant give you actually weather so suggsest song according to weather too.
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
