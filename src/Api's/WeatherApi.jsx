import React, { useContext, useEffect, useState, createContext } from "react";
import { CityContext } from "../Components/WeatherBar";
import axios from "axios";

export const WeatherContext = createContext();

function WeatherApi({ children }) {
  const city = useContext(CityContext);
  const [weatherData, setWeatherData] = useState({ weather: "", temperature: "" });

  useEffect(() => {
    if (!city || city.trim() === "") {
      console.log("No city provided");
      return;
    }
    const fetchWeather = async () => {
      try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
          params: {
            q: city,
            appid: "12959c2a83a2ab932abc26546d1b2b9c",
          },
        });

        let weather = response.data.weather[0].main;
        let temperature = response.data.main.temp - 273;
        console.log(`Weather: ${weather}, Temperature: ${temperature}°C`);

        setWeatherData({ weather, temperature }); 
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };
    fetchWeather();
  }, [city]);

  return (
    <WeatherContext.Provider value={weatherData}>
      {children}
    </WeatherContext.Provider>
  );
}

export default WeatherApi;
