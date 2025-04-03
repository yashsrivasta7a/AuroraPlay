    import React, { useContext, useEffect, useState } from "react";
    import { CityContext } from "../Components/WeatherBar";
    import axios from "axios";

    function WeatherApi() {
    const city = useContext(CityContext);
    
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
                        appid: process.env.WEATHER_API
                    }
                });
            
                let weather = response.data.weather[0].main; 
                let temperature = response.data.main.temp - 273;
                console.log(`Weather: ${weather}, Temperature: ${temperature}°C`);
            } catch (error) {
                console.error("Error fetching weather data:", error);
            }
        };
        fetchWeather();
    }, [city]);
    
    return (
        <div>
        <h1>
        </h1>
        </div>
    );
    }

    export default WeatherApi;
