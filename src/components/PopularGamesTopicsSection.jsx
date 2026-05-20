import React from "react";
import { popularGames } from "../data/topicsData";

const PopularGamesTopicsSection = () => (
  <section className="w-full max-w-6xl mx-auto mt-10 mb-8 px-4">
    <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900">Popular Games</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {popularGames.map((game, idx) => (
        <div
          key={game.id}
          className="bg-white rounded-2xl shadow-md p-4 hover:shadow-xl transition border border-gray-100"
        >
          <div className="flex items-center gap-4">
            <div className="flex-1 min-w-0">
              <span className="font-semibold text-lg text-gray-800 truncate block mb-1">
                {idx + 1}. {game.name}
              </span>
              <span className="inline-block px-2 py-0.5 text-xs rounded bg-blue-100 text-blue-700 font-medium mb-2">
                {game.category}
              </span>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-yellow-500 font-bold text-base">★</span>
                <span className="text-gray-700 text-sm font-medium">{game.rating}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default PopularGamesTopicsSection;

