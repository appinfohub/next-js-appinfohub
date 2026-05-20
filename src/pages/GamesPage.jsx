import React from "react";
import AdsSection from "../components/AdsSection";
import GameSection from "../components/GameSection";


const GamesPage = () => {
  return (
    <>
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-8 mb-4 w-full max-w-6xl px-4 mx-auto">Games</h1>
      <div className="my-8">
        <AdsSection />
      </div>
      {/* <GameSection category="Popular Games" />
      <div className="my-8">
        <AdsSection />
      </div> */}

      <GameSection category="Action" />
      <div className="my-8">
        <AdsSection />
      </div>
      <GameSection category="Adventure" />

      <div className="my-8">
        <AdsSection />
      </div>

      <GameSection category="Board" />
      <div className="my-8">
        <AdsSection />
      </div>
      <GameSection category="Card" />

      <div className="my-8">
        <AdsSection />
      </div>
      <GameSection category="Casual" />
      <div className="my-8">
        <AdsSection />
      </div>

      <GameSection category="Demo" />
      <div className="my-8">
        <AdsSection />
      </div>

      <GameSection category="Music" />

      <div className="my-8">
        <AdsSection />
      </div>

      <GameSection category="Puzzle" />
      <div className="my-8">
        <AdsSection />
      </div>

      <GameSection category="Role Playing" />
      <div className="my-8">
        <AdsSection />
      </div>

      {/* <GameSection category="Simulation" />
      <div className="my-8">
        <AdsSection />
      </div> */}

      <GameSection category="Sports" />

      <div className="my-8">
        <AdsSection />
      </div>
      <GameSection category="Word" />

      <div className="my-8">
        <AdsSection />
      </div>

      <GameSection category="Arcade" />

      <div className="my-8">
        <AdsSection />
      </div>

<GameSection category="Racing" />

      <div className="my-8">
        <AdsSection />
      </div>


      <GameSection category="Strategy" />

      <div className="my-8">
        <AdsSection />
      </div>
      <GameSection category="Educational" />

      <div className="my-8">
        <AdsSection />
      </div>
      <GameSection category="Casino" />

      <div className="my-8">
        <AdsSection />
      </div>
      

      <div className="my-8">
        <AdsSection />
      </div>
    </>
  );
};

export default GamesPage;

