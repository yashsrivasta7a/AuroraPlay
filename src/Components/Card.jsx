import React from "react";
import BlurText from "./BlurText";
import "./Card.css"; 
import WeatherBar from "./WeatherBar";

const Card = () => {
  return (
    <div className="flex flex-col items-center select-none py-6 px-8">
      <div className="relative h-32 sm: -mb-4 transition-all duration-200 z-20">
        <svg   className="w-52 h-52 sm:w-64 sm:h-64 md:w-72 md:h-72 duration-500 border-4 rounded-full shadow-[0_0_15px_rgba(255,255,255,0.8)] border-white animate-[spin_5s_linear_infinite] transition-all"
          viewBox="0 0 128 128"
          width={328}
          height={328}
          viewBox="0 0 128 128"
          className="duration-500 border-4 rounded-full shadow-[0_0_15px_rgba(255,255,255,0.8)] border-white border-spacing-5 animate-[spin_5s_linear_infinite] transition-all"
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
  
      </div>

      <div className="z-30 flex flex-col overflow-hidden  sm:max-w-md md:max-w-[35rem] h-auto transition-all duration-300  bg-gradient-to-t from-[#362853] to-[#9b72cf]  shadow-md rounded-2xl shadow-[#664e97] py-6 px-6 ">
        <div className="flex justify-center w-full m-2">
          <BlurText
            text="AURORA PLAY!"
            delay={150}
            animateBy="words"
            direction="top"
            className="sm:text-4xl md:text-6xl text-[#321d5c] font-extrabold font-boldonse drop-shadow-[0_0_5px_rgba(50,29,92,0.5)]"
          />
        </div>

        {/* <div className="flex flex-row items-center justify-between mx-3 bg-indigo-100 rounded-md min-h-12 py-2 px-4">
          <span className="text-sm text-zinc-600">0:00</span>
          <input
            type="range"
            min={1}
            max={100}
            defaultValue={0}
            className="w-24 flex-grow h-1 mx-2 my-auto bg-gray-300 rounded-full appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-zinc-400 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-md"
          />
          <span className="text-sm text-zinc-600">3:45</span>
        </div> */}

   
        
        <div className="mt-5" >
          <WeatherBar/>
        </div>
        
      </div>
    </div>
  );
};

export default Card;
