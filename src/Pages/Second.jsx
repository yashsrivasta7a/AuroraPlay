import React from "react";
import Card from "../Components/Card";
import SplashCursor from "../Components/SplashCursor";
import BlurText from "../Components/BlurText";
import WeatherBar from "../Components/WeatherBar";


function Second() {
  return (
    <div className="flex justify-start items-start h-screen bg-[#0a0316]">
      <div className="relative h-32 mb-80 transition-all duration-200 right-96">
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
  
      </div>

      <div className="z-0">
        <SplashCursor />
      </div>
    </div>
  );
}

export default Second;
