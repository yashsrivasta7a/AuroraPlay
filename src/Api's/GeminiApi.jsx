import React, { useContext, useEffect } from "react";
import axios from "axios";
import { CityContext } from "../Components/WeatherBar";
import { WeatherContext } from "./WeatherApi";
import { TrackContext } from "./trackContext";

const AZURE_OPENAI_API_KEY = import.meta.env.VITE_AZURE_OPENAI_API_KEY;
const AZURE_OPENAI_ENDPOINT = import.meta.env.VITE_AZURE_OPENAI_ENDPOINT;
const AZURE_OPENAI_DEPLOYMENT_ID = import.meta.env
  .VITE_AZURE_OPENAI_DEPLOYMENT_ID;
const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;
console.log(AZURE_OPENAI_DEPLOYMENT_ID);

function GeminiApi() {
  const { setTracks } = useContext(TrackContext);
  const city = useContext(CityContext);
  const { weather, temperature } = useContext(WeatherContext);

  useEffect(() => {
    if (!weather || !temperature || !city) return;

    async function fetchData() {
      try {
        const prompt = `You are an expert music curator specializing in hyper-personalized Spotify playlists. Suggest exactly 6 unique Spotify song titles that perfectly reflect the current weather condition "${weather}" and temperature "${temperature}°C" in the city of ${city}. 
Carefully consider the mood, atmosphere, time of day, and cultural context of ${city} when selecting the songs. Blend trending hits currently popular in ${city} with timeless local favorites, ensuring cultural authenticity. 
Exactly 3 out of the 6 songs must be in the predominant regional language of ${city}, representing its local music scene and identity. Diversity of genres is essential—avoid mainstream clichés, overplayed anthems, or generic filler. Prioritize songs that evoke emotion and enhance the listener’s connection with the moment. Verify that all chosen tracks are available on Spotify. 

Before producing the final answer, think step by step about the following (but do not reveal this reasoning to the user): 
1. Analyze cultural and linguistic context of ${city}. 
2. Map the weather condition "${weather}" and temperature "${temperature}°C" to moods, genres, or themes. 
3. Identify currently trending local tracks and timeless regional classics. 
4. Ensure 3 songs are in the regional language and 3 are in wider/global languages for balance. 
5. Cross-check diversity of genres and moods, avoiding anything too generic. 
6. Select final 6 songs that best fit the listener’s context. 

Return only the song titles, separated by commas, with no artist names, explanations, numbers, or extra formatting. Strictly format the output as: Song Name 1, Song Name 2, Song Name 3, Song Name 4, Song Name 5, Song Name 6.`;

        const response = await axios.post(
          `${AZURE_OPENAI_ENDPOINT}/openai/deployments/${AZURE_OPENAI_DEPLOYMENT_ID}/chat/completions?api-version=2024-12-01-preview`,
          {
            messages: [
              {
                role: "system",
                content: `You are an expert music curator who creates personalized, culturally relevant Spotify playlists. 
Your task is to suggest song titles that perfectly match the current weather, temperature, season, time of day, and local music trends for a specific city. 
Focus on diversity, avoid overused tracks, and include authentic regional language songs where applicable. 
Respond ONLY with a comma-separated list of song names, no artists, explanations, or extra formatting.`,
              },
              {
                role: "user",
                content: prompt,
              },
            ],
            max_tokens: 150,
            temperature: 0.7,
          },
          {
            headers: {
              "Content-Type": "application/json",
              "api-key": AZURE_OPENAI_API_KEY,
            },
          }
        );

        const songsText = response.data.choices[0]?.message?.content;
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
