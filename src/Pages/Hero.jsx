import React from "react";
import Card from "../Components/Card";
import SplashCursor from "../Components/SplashCursor";
import BlurText from "../Components/BlurText";
import WeatherBar from "../Components/WeatherBar";
import Squares from "../Components/Squares";
import SocialLinks from '../Components/SocialLinks';


function Hero() {
  return (
    <div className="flex justify-center h-screen items-center  bg-[#0a0316]">
      <div className="w-[80vw] h-[80vh] flex mt-14 flex-col justify-center items-center rounded-2xl z-10 bg-transparent">
        <Card />
      <SocialLinks/>
      </div>
      {/* <div className="z-0">
        <SplashCursor />
      </div> */}
     
    </div>
  );
}

export default Hero;
