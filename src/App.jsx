import React, { useState } from 'react'
import Hero from './Pages/Hero'
import Second from "./Pages/Second";
import { TrackContext } from './Api\'s/trackContext';
import Squares from './Components/Squares';
import Footer from './Pages/Footer';


function App() {
  const [tracks, setTracks] = useState([]);
  return (
  <TrackContext.Provider value={{ tracks, setTracks }}> 
    <div>
     
      <Hero/>
      <Second/>
      <Footer/>
      
      <div  className="absolute top-0 left-0 w-full h-full pointer-events-none z-1 opacity-15 ">
        <Squares
            speed={0.5}
            squareSize={60}
            direction="diagonal" 
            borderColor="#fff"
            hoverFillColor="#222"
          />
        </div>
    </div>
    </TrackContext.Provider>
  )
}

export default App