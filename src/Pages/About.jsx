import React from "react";
import { FaMusic, FaCloud, FaMagic } from "react-icons/fa";
import Squares from "../Components/Squares";

function About() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex justify-center items-center h-auto min-h-screen bg-[#0a0316] py-10">
      <div className="z-30 flex flex-col w-[90vw] max-w-5xl h-auto bg-gradient-to-t from-[#362853] to-[#9b72cf] shadow-lg rounded-3xl shadow-[#664e97] py-10 px-8 animate-fade-in">

        <h1 className="text-center font-bold p-3 font-boldonse text-4xl md:text-6xl text-[#ffffff] drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]">
          About Aurora Play
        </h1>

        <div className="mt-6 text-center text-[#d1b3f5] text-base md:text-lg leading-relaxed space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <FaCloud className="text-[#ffffff] text-2xl sm:text-xl" />
            <span>
              Transform weather data into <span className="font-bold text-[#ffffff]">beautiful melodies</span>.
            </span>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <FaMusic className="text-[#ffffff] text-2xl sm:text-xl" />
            <span>
              Experience a <span className="font-bold text-[#ffffff]">unique soundtrack</span> for your day.
            </span>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <FaMagic className="text-[#ffffff] text-2xl sm:text-xl" />
            <span>
              Powered by <span className="font-bold text-[#ffffff]">AI</span>, blending creativity and technology.
            </span>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center">
          <h2 className="text-center pt-8 font-bold text-2xl md:text-4xl text-[#ffffff] drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
            Ready to Experience the Magic?
          </h2>
          <p className="mt-4 text-center text-[#d1b3f5] text-sm md:text-lg leading-relaxed">
            Dive into the world of Aurora Play and let the weather guide your music journey. 
            Discover how AI can transform your daily routine into a symphony of emotions.
          </p>
          <button
            onClick={scrollToTop}
            className="mt-6 bg-[#6f52a9] hover:bg-[#5a3f8c] text-white font-semibold py-3 px-6 rounded-full shadow-md transition-all duration-300 transform hover:scale-105"
          >
            Try Now
          </button>
        </div>
      </div>
      <div className="absolute  w-full h-full pointer-events-none z-1 opacity-15">
        <Squares
          speed={0.5}
          squareSize={60}
          direction="diagonal"
          borderColor="#ccc"
          hoverFillColor="#888"
        />
      </div>
    </div>
  );
}

export default About;
