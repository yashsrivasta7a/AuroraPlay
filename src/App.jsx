import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Hero from "./Pages/Hero";
import Second from "./Pages/Second";
import About from "./Pages/About";
import Footer from "./Pages/Footer";
import { TrackContext } from "./Api's/trackContext";
import Squares from "./Components/Squares";
import Navbar from "./Components/Navbar";

function App() {
  const [tracks, setTracks] = useState([]);
  return (
    <TrackContext.Provider value={{ tracks, setTracks }}>
      <Router>
        <div>
          <Navbar />
          <div id="home">
            <Hero />
          </div>
          <div id="about">
            <About />
          </div>
          <div id="tracks">
            <Second />
          </div>
          <Footer />
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-1 opacity-15">
            <Squares
              speed={0.5}
              squareSize={60}
              direction="diagonal"
              borderColor="#ccc"
              hoverFillColor="#888"
            />
          </div>
        </div>
      </Router>
    </TrackContext.Provider>
  );
}

export default App;