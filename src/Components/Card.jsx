import React from "react";
import BlurText from "./BlurText";
import "./Card.css"; // Import the CSS file for font

const Card = () => {
  return (
    <div className="flex flex-col items-center select-none py-6 px-8">
      <div className="relative h-32 -mb-4 transition-all duration-200 z-20">
        <svg
          width={328}
          height={328}
          viewBox="0 0 128 128"
          className="duration-500 border-4 rounded-full shadow-md border-white border-spacing-5 animate-[spin_5s_linear_infinite] transition-all"
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

      <div className="z-30 flex flex-col w-[35rem] h-auto transition-all duration-300 bg-[#6f52a9] shadow-md rounded-2xl shadow-[#664e97] py-6 px-6 ">
        <div className="flex justify-center w-full mb-4">
          <BlurText
            text="AURORA PLAY!"
            delay={150}
            animateBy="words"
            direction="top"
            className="text-6xl text-[#321d5c] font-extrabold font-boldonse"
          />
        </div>

       

        <div className="flex flex-row items-center justify-between mx-3 bg-indigo-100 rounded-md min-h-12 py-2 px-4">
          <span className="text-sm text-zinc-600">0:00</span>
          <input
            type="range"
            min={0}
            max={100}
            defaultValue={0}
            className="w-24 flex-grow h-1 mx-2 my-auto bg-gray-300 rounded-full appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-zinc-400 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-md"
          />
          <span className="text-sm text-zinc-600">3:45</span>
        </div>

        <div className="flex flex-row items-center justify-center mx-3 space-x-6 mt-6">

          <div className="flex items-center justify-center w-12 h-full cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-skip-back"
            >
              <polygon points="19 20 9 12 19 4 19 20" />
              <line x1={5} y1={19} x2={5} y2={5} />
            </svg>
          </div>

          <label
            htmlFor="playStatus"
            className="flex items-center justify-center w-12 h-full cursor-pointer"
          >
            <input
              type="checkbox"
              name="playStatus"
              id="playStatus"
              className="hidden peer"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-play peer-checked:hidden"
            >
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="hidden peer-checked:inline-block"
            >
              <rect x={6} y={4} width={4} height={16} />
              <rect x={14} y={4} width={4} height={16} />
            </svg>
          </label>

          <div className="flex items-center justify-center w-12 h-full cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-skip-forward"
            >
              <polygon points="5 4 15 12 5 20 5 4" />
              <line x1={19} y1={5} x2={19} y2={19} />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
