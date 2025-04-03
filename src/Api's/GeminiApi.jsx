import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { GoogleGenAI } from "@google/genai";
import { CityContext } from "../Components/WeatherBar";
import { WeatherContext } from "./WeatherApi";

const ai = new GoogleGenAI({
  apiKey: "AIzaSyBoFGWAfA9i9pn_9cT1_ZPbrZfManQlFK8",
});

const CLIENT_ID = "1a8d8b0640d34c21bdae823cad4e0a07";
const CLIENT_SECRET = "ecd16fd2b2ff47c6a129d872a0df9f01";

function GeminiApi() {
  const city = useContext(CityContext);
  const { weather, temperature } = useContext(WeatherContext);
  const [genre, setGenre] = useState("");
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    if (!weather || !temperature || !city) return;

    async function fetchData() {
      try {


        // Gemini AI
        const response = await ai.models.generateContent({
          model: "gemini-2.0-flash",
          contents: `Find a Spotify music genre suitable for the weather condition "${weather}" and temperature "${temperature}°C" in the city of ${city}. Return the most relevant genre. Prioritize genres popular in the local region of ${city} (e.g. Haryanvi music for a city in Haryana). If a specific local genre isn't strongly tied to the weather, suggest a broadly fitting genre for the weather. Return format: genre , dont give explainations and give weather speicific and genre that is not too vast`,
        });
        
        
        const detectedGenre = response.text;
        if (!detectedGenre) return;
        setGenre(detectedGenre);
        console.log(detectedGenre);

        //  Spotify
        const authResponse = await axios.post(
          "https://accounts.spotify.com/api/token",
          new URLSearchParams({
            grant_type: "client_credentials",
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
          }),
          { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        );

        const accessToken = authResponse.data.access_token;

        const searchResponse = await axios.get(
          `https://api.spotify.com/v1/search?q=${encodeURIComponent(detectedGenre)}&type=track&limit=5`,
          { headers: { Authorization: `Bearer ${accessToken}` } }
        );

        const trackList = searchResponse.data.tracks.items.map((track) => ({
          id: track.id,
          name: track.name,
          artists: track.artists.map((artist) => artist.name),
          url: track.external_urls.spotify,
        }));

        setTracks(trackList);
        
      } catch (error) {
        console.error("Error fetching data:", error.response?.data || error);
      }
    }

    fetchData();
  }, [city, weather, temperature]);

  return (
    <div>
      <ul>
        {tracks.length > 0 ? (
          tracks.map((track) => (
            <li key={track.id}>
              <a href={track.url} >
                {track.name} - {track.artists.join(", ")}
              </a>
            </li>
          ))
        ) : (
          <p>Loading or no tracks found.</p>
        )}
      </ul>
    </div>
  );
};

export default GeminiApi;
