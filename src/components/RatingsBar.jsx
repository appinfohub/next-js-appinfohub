import React from "react";

const RatingsBar = ({ rating, votes }) => {
  // 5 stars, fill based on rating
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <span key={i} className={
        i <= Math.floor(rating)
          ? "text-yellow-400 text-2xl"
          : rating >= i - 0.5
          ? "text-yellow-300 text-2xl"
          : "text-gray-300 text-2xl"
      }>
        ★
      </span>
    );
  }
  return (
    <div className="my-6 flex flex-col items-center">
      <div className="flex items-center gap-2">
        <span className="text-3xl font-bold text-gray-900">{rating}</span>
        <div className="flex">{stars}</div>
      </div>
      <div className="text-gray-700 text-base font-medium mt-1">{votes}</div>
    </div>
  );
};

export default RatingsBar;

