import { React, useContext } from "react";
import Card from "../Components/Card";
import SplashCursor from "../Components/SplashCursor";
import BlurText from "../Components/BlurText";
import WeatherBar from "../Components/WeatherBar";
import WeatherApi from "../Api's/WeatherApi";
import { TrackContext } from "../Api's/trackContext";
import Squares from "../Components/Squares";


function Second() {
  
  const { tracks } = useContext(TrackContext);
  return (
    <div>
      <div id="second-section" className="flex flex-col md:flex-row justify-evenly h-screen bg-[#0a0316] ">
        <div className="relative w-full h-screen overflow-hidden hidden md:block">
          <div className="absolute left-[-25rem] top-1/2 transform -translate-y-1/2">
            <svg
              width={628}
              height={628}
              viewBox="0 0 128 128"
              className="duration-100 opacity-50 border-4 rounded-full 
      shadow-[0_0_15px_rgba(255,255,255,0.8)] border-white 
      border-spacing-5 animate-[spin_8s_linear_infinite] transition-all"
            >
              <rect width={128} height={128} fill="black" />
              <circle cx={20} cy={20} r={2} fill="white" />
              <circle cx={40} cy={30} r={2} fill="white" />
              <circle cx={60} cy={10} r={2} fill="white" />
              <circle cx={80} cy={40} r={2} fill="white" />
              <circle cx={100} cy={20} r={2} fill="white" />
              <circle cx={120} cy={50} r={2} fill="white" />
              <circle cx={90} cy={30} r={10} fill="white" fillOpacity="0.5" />
              <circle cx={90} cy={30} r={8} fill="white" />
              <path
                d="M0 128 Q32 64 64 128 T128 128"
                fill="purple"
                stroke="black"
                strokeWidth={1}
              />
              <path
                d="M0 128 Q32 48 64 128 T128 128"
                fill="mediumpurple"
                stroke="black"
                strokeWidth={1}
              />
              <path
                d="M0 128 Q32 32 64 128 T128 128"
                fill="rebeccapurple"
                stroke="black"
                strokeWidth={1}
              />
            </svg>
          </div>
        </div>
        <div className="z-30 top-14 flex relative flex-col w-full h-fit transition-all duration-300 bg-gradient-to-t from-[#392b55] to-[#9b72cf] shadow-md rounded-2xl shadow-[#664e97] py-6 px-6">
          <h1 className="text-center font-bold p-3 font-boldonse text-3xl md:text-5xl text-[#362853]">
            YOUR TRACKS  
          </h1>
          <ul className="mt-8 text-start text-[#8766ca] text-xs p-3 font-semibold grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
  {tracks.length > 0 ? (
    tracks.map((track, index) => (
      <li key={track.id} className="p-3 mb-3 bg-[#311853] hover:bg-[#362853] hover:text-white rounded-xl text-center">
        <a href={track.url} className="block">
       
          <img src={track.images} alt={track.name} className="w-32 h-32 mx-auto rounded-lg" />
    
          <div className="mt-2"> {track.name}</div>
        </a>
      </li>
    ))
  ) 
             : (
              <p>No tracks available.</p>
            )}
          </ul>
        </div>
        <div className="z-0">
          <SplashCursor />
        </div>
        <div className="absolute  w-full h-full pointer-events-none z-1 opacity-15">
          <Squares
            speed={0.5}
            squareSize={60}
            direction="diagonal"
            borderColor="#fff"
            hoverFillColor="#222"
          />
        </div>
        <div className="relative w-screen h-screen overflow-hidden md:w-screen hidden md:block">
          <div className="absolute right-[-25rem] top-1/2 transform -translate-y-1/2">
            <svg
              width={628}
              height={628}
              viewBox="0 0 128 128"
              className="duration-100 opacity-50 border-4 rounded-full 
      shadow-[0_0_15px_rgba(255,255,255,0.8)] border-white 
      border-spacing-5 animate-[spin_8s_linear_infinite] transition-all"
            >
              <rect width={128} height={128} fill="black" />
              <circle cx={20} cy={20} r={2} fill="white" />
              <circle cx={40} cy={30} r={2} fill="white" />
              <circle cx={60} cy={10} r={2} fill="white" />
              <circle cx={80} cy={40} r={2} fill="white" />
              <circle cx={100} cy={20} r={2} fill="white" />
              <circle cx={120} cy={50} r={2} fill="white" />
              <circle cx={90} cy={30} r={10} fill="white" fillOpacity="0.5" />
              <circle cx={90} cy={30} r={8} fill="white" />
              <path
                d="M0 128 Q32 64 64 128 T128 128"
                fill="purple"
                stroke="black"
                strokeWidth={1}
              />
              <path
                d="M0 128 Q32 48 64 128 T128 128"
                fill="mediumpurple"
                stroke="black"
                strokeWidth={1}
              />
              <path
                d="M0 128 Q32 32 64 128 T128 128"
                fill="rebeccapurple"
                stroke="black"
                strokeWidth={1}
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Second;

{
  /* <div className="relative h-32 mb-80 transition-all duration-200 right-96">
    <svg
      width={628}
      height={628}
      viewBox="0 0 128 128"
      className="duration-100 border-4 rounded-full shadow-[0_0_15px_rgba(255,255,255,0.8)] border-white border-spacing-5 animate-[spin_3s_linear_infinite] transition-all"
    >
      <rect width={128} height={128} fill="black" />
      <circle cx={20} cy={20} r={2} fill="white" />
      <circle cx={40} cy={30} r={2} fill="white" />
      <circle cx={60} cy={10} r={2} fill="white" />
      <circle cx={80} cy={40} r={2} fill="white" />
      <circle cx={100} cy={20} r={2} fill="white" />
      <circle cx={120} cy={50} r={2} fill="white" />
      <circle cx={90} cy={30} r={10} fill="white" fillOpacity="0.5" />
      <circle cx={90} cy={30} r={8} fill="white" />
      <path
        d="M0 128 Q32 64 64 128 T128 128"
        fill="purple"
        stroke="black"
        strokeWidth={1}
      />
      <path
        d="M0 128 Q32 48 64 128 T128 128"
        fill="mediumpurple"
        stroke="black"
        strokeWidth={1}
      />
      <path
        d="M0 128 Q32 32 64 128 T128 128"
        fill="rebeccapurple"
        stroke="black"
        strokeWidth={1}
      />
      <path
        d="M0 128 Q16 64 32 128 T64 128"
        fill="purple"
        stroke="black"
        strokeWidth={1}
      />
      <path
        d="M64 128 Q80 64 96 128 T128 128"
        fill="mediumpurple"
        stroke="black"
        strokeWidth={1}
      />
    </svg>

  </div> */
}
