import React, { createContext, useState } from "react";
import styled from "styled-components";
import WeatherApi from "../Api's/WeatherApi";
import GeminiApi from "../Api's/GeminiApi";
import { useRef } from "react";

export const CityContext = createContext();

const Loader = () => {
  return (
    <StyledWrapper>
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
    transition: ease 0.2s;
    position: relative;
    background: #fff;
  }

  .wave-menu li {
    list-style: none;
    height: 25px;
    width: 3px;
    border-radius: 10px;
    background: #6f52a9;
    margin: 0 4px;
    animation-name: wave1;
    animation-duration: 0.3s;
    animation-iteration-count: infinite;
    animation-direction: alternate;
    transition: ease 0.2s;
  }

  .wave-menu:hover > li {
    background: #fff;
  }

  .wave-menu:hover {
    background: #6f52a9;
  }

  .wave-menu li:nth-child(2) {
    animation-name: wave2;
    animation-delay: 1s;
  }

  .wave-menu li:nth-child(3) {
    animation-name: wave3;
    animation-delay: 0.23s;
    animation-duration: 1s;
  }

  .wave-menu li:nth-child(4) {
    animation-name: wave4;
    animation-delay: 0.1s;
    animation-duration: 1.3s;
  }

  .wave-menu li:nth-child(5) {
    animation-delay: 1s;
  }

  .wave-menu li:nth-child(6) {
    animation-name: wave2;
    animation-duration: 1s;
  }

  .wave-menu li:nth-child(8) {
    animation-name: wave4;
    animation-delay: 0.4s;
    animation-duration: 1s;
  }

  .wave-menu li:nth-child(9) {
    animation-name: wave3;
    animation-delay: 0.15s;
  }

  @keyframes wave1 {
    from {
      transform: scaleY(1);
    }
    to {
      transform: scaleY(0.5);
    }
  }

  @keyframes wave2 {
    from {
      transform: scaleY(0.3);
    }
    to {
      transform: scaleY(0.6);
    }
  }

  @keyframes wave3 {
    from {
      transform: scaleY(0.6);
    }
    to {
      transform: scaleY(0.8);
    }
  }

  @keyframes wave4 {
    from {
      transform: scaleY(0.2);
    }
    to {
      transform: scaleY(0.5);
    }
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