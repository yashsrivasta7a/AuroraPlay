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
          contents: `Find a Spotify music genre suitable for the weather condition "${weather}" and temperature "${temperature}°C" in the city of ${city}.
           Return the most relevant genre. Prioritize genres popular in the local region of ${city} (e.g. Haryanvi music for a city in Haryana).
           If a specific local genre isn't strongly tied to the weather, suggest a broadly fitting genre for the weather.
            Return format: genre (e.g., Punjabi Hip hop).return only genre`
        //   contents: `Find 5 Spotify songs with their Spotify track IDs that are suitable for the weather condition "${weather}" and
        //    temperature "${temperature}°C" in Gurugram, Haryana, India. Prioritize Bollywood rain songs or other Hindi romantic/melancholic 
        //    songs if the weather is rainy. For other weather conditions, suggest popular contemporary Bollywood or Indian pop songs or indian hip hop songs that 
        //    generally fit the mood. Return format for each song: Song Title - Artist,spotify:track:{track_id} (e.g., Tip Tip Barsa Paani -
        //     Udit Narayan, Alka Yagnik,spotify:track:xxxxxxxxxxxxx). Return the 5 songs separated by a newline. If specific song IDs cannot 
        //     be reliably found, return "No suitable songs with Spotify IDs found."`,
        });

        const detectedGenre = response.text;
        console.log(detectedGenre);
        
        if (!detectedGenre) return;

        // const trackIds = detectedGenre
        //   .split("\n")
        //   .map((line) => line.match(/spotify:track:([a-zA-Z0-9]+)/)?.[1])
        //   .filter(Boolean);

        // console.log(trackIds);

        // if (trackIds.length === 0) {
        //   console.log("No suitable songs with Spotify IDs found.");
        //   return;
        // }

        // console.log("Extracted Track IDs:", trackIds);

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

        // const trackDetails = await Promise.all(
        //   trackIds.map(async (trackId) => {
        //     try {
        //       const response = await axios.get(
        //         `https://api.spotify.com/v1/tracks/${trackId}`,
        //         {
        //           headers: {
        //             Authorization: `Bearer ${accessToken}`,
        //             "Content-Type": "application/json",
        //           },
        //         }
        //       );
        //       return {
        //         id: response.data.id,
        //         name: response.data.name,
        //         artists: response.data.artists.map((artist) => artist.name),
        //         url: response.data.external_urls.spotify,
        //       };
        //     } catch (error) {
        //       console.error("Error fetching track details:", error);
        //       return null;
        //     }
        //   })
        // );

        // setTracks(trackDetails.filter(Boolean));
      } catch (error) {
        console.error("Error fetching data:", error.response?.data || error);
      }
    }

    fetchData();
  }, [city, weather, temperature]);

  return (
    <div>
      <h2>Top Songs for {genre || "N/A"}</h2>
      <ul>
        {tracks.length > 0 ? (
          tracks.map((track) => (
            <li key={track.id}>
              <a href={track.url} target="_blank" rel="noopener noreferrer">
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
}
export default GeminiApi;
