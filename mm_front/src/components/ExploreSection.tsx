import React from "react";
import TradingView from "./TradingView";

const ExploreSection = () => {
  return (
    <div className="bg-gray-100 h-full p-3 ">
      <div className="grid gap-2 grid-cols-4">
        <div className="col-span-3  bg-white rounded-md p-2 shadow-xl transition-all hover:shadow-2xl ">
          <TradingView />
        </div>
        <div className="bg-white rounded-md p-2 shadow-xl transition-all hover:shadow-2xl ">
          <div className="w-full border-b p-3 text-xl font-bold">News</div>
          <div className="w-full"></div>
        </div>
        <div className="col-span-4 bg-white rounded-md p-2 shadow-xl transition-all hover:shadow-2xl ">
          <div className="w-full border-b p-3 text-xl font-bold">Info</div>
          <div className="w-full"></div>
        </div>
      </div>
    </div>
  );
};
export default ExploreSection;
