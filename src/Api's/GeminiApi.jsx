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
        const prompt = `You are a highly knowledgeable music curator specializing in personalized playlists. Suggest exactly 6 unique Spotify song titles that perfectly match the current weather condition "${weather}" and temperature "${temperature}°C" in the city of ${city}. 
Consider the mood, atmosphere, and cultural context associated with the weather and time of day. Include songs that are currently popular or trending specifically in ${city}, as well as timeless tracks that resonate locally. 
Ensure that 3 out of the 6 songs are in the predominant regional language of ${city}, reflecting authentic local music culture. Prioritize diversity in genres and avoid generic, overplayed, or clichéd tracks.
Exclude any songs that are not available on Spotify. Return only the song titles, separated by commas, with no artist names, explanations, or extra formatting.Format the output strictly as: Song Name 1, Song Name 2, Song Name 3, Song Name 4, Song Name 5, Song Name 6.`;

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
