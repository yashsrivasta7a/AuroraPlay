import React, { createContext, useState } from "react";
import styled from "styled-components";
import WeatherApi from "../Api's/WeatherApi";
import GeminiApi from "../Api's/GeminiApi";
import { useRef } from "react";

export const CityContext = createContext();

const Loader = () => {
  const audioRef = useRef(new Audio('public/amari.mp3'));
  const [isPlaying, setIsPlaying] = useState(false);

  const handleTunes = () => {
    const audio = audioRef.current;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }

    setIsPlaying(!isPlaying);
  };

  return (
    <StyledWrapper className={isPlaying ? 'playing' : 'paused'} onClick={handleTunes}>
      <ul className="wave-menu">
        {Array.from({ length: 10 }).map((_, index) => (
          <li key={index} />
        ))}
      </ul>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .wave-menu {
    border: 4px solid #6f52a9;
    border-radius: 50px;
    width: 160px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
    margin: 0;
    cursor: pointer;
    transition: background 0.2s ease;
  }

  /* Background colors based on state */
  &.playing .wave-menu {
    background: #6f52a9;
  }

  &.paused .wave-menu {
    background: #fff;
  }

  .wave-menu li {
    list-style: none;
    width: 3px;
    border-radius: 10px;
    margin: 0 4px;
    transition: height 0.3s ease, transform 0.3s ease, background 0.2s ease;
  }

  /* Paused State - Purple Bars, Still */
  &.paused .wave-menu li {
    height: 10px;
    background: #6f52a9;
    animation: none;
  }

  /* Playing State - White Bars, Animated */
  &.playing .wave-menu li {
    height: 25px;
    background: #fff;
    animation-duration: 0.3s;
    animation-iteration-count: infinite;
    animation-direction: alternate;
    animation-play-state: running;
  }

  /* Animations assigned */
  &.playing .wave-menu li:nth-child(1) { animation-name: wave1; }
  &.playing .wave-menu li:nth-child(2) { animation-name: wave2; animation-delay: 0.2s; }
  &.playing .wave-menu li:nth-child(3) { animation-name: wave3; animation-delay: 0.3s; }
  &.playing .wave-menu li:nth-child(4) { animation-name: wave4; animation-delay: 0.1s; }
  &.playing .wave-menu li:nth-child(5) { animation-name: wave2; animation-delay: 0.4s; }
  &.playing .wave-menu li:nth-child(6) { animation-name: wave3; animation-delay: 0.2s; }
  &.playing .wave-menu li:nth-child(7) { animation-name: wave1; animation-delay: 0.3s; }
  &.playing .wave-menu li:nth-child(8) { animation-name: wave4; animation-delay: 0.1s; }
  &.playing .wave-menu li:nth-child(9) { animation-name: wave2; animation-delay: 0.4s; }
  &.playing .wave-menu li:nth-child(10) { animation-name: wave3; animation-delay: 0.2s; }

  @keyframes wave1 {
    from { transform: scaleY(1); }
    to { transform: scaleY(0.4); }
  }

  @keyframes wave2 {
    from { transform: scaleY(0.6); }
    to { transform: scaleY(1); }
  }

  @keyframes wave3 {
    from { transform: scaleY(0.4); }
    to { transform: scaleY(0.9); }
  }

  @keyframes wave4 {
    from { transform: scaleY(0.7); }
    to { transform: scaleY(1.2); }
  }
`;
function WeatherBar() {
  const [city, setCity] = useState("");
  const [submittedCity, setSubmittedCity] = useState("");

  
  const handleScroll = (e) => {
    e.preventDefault();
    setSubmittedCity(city);
    const secondSection = document.getElementById("second-section");
    if (secondSection) {
      secondSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setSubmittedCity(city);
  };

  return (
    <CityContext.Provider value={submittedCity}>
      <WeatherApi>
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5 bg-[#321d5c] p-4 sm:p-3 rounded-3xl w-full">
          <div className="flex justify-center sm:justify-start">
            <Loader />
          </div>

          <form
            onSubmit={onSubmitHandler}
            className="w-full sm:w-auto flex justify-center"
          >
            <input
              type="text"
              placeholder="ENTER YOUR CITY BUD"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full lg:w-72 sm:w-64 rounded-xl text-center font-semibold placeholder:text-center text-sm p-2 placeholder:text-[#6f52a9]"
            />
          </form>
        </div>

        <div className="mt-4">
          <button
            onClick={handleScroll}
            className="bg-[#6f52a9] p-3 rounded-3xl w-full text-white font-semibold hover:bg-[#372261] transition-colors"
          >
            Get Tracks
          </button>
        </div>

        <GeminiApi />
      </WeatherApi>
    </CityContext.Provider>
  );
}

export default WeatherBar;