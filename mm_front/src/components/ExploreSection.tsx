import React from "react";
import { useRecoilState } from "recoil";
import { tickerState } from "../store/tickerStats";
import FactorView from "./FactorView";
import NewsView from "./NewsView";
import TradingView from "./TradingView";

const ExploreSection = () => {
  const [ticker, _] = useRecoilState(tickerState);

  return (
    <div className="bg-gray-100 h-full p-3 ">
      <div className="grid gap-2 grid-cols-4">
        <div className="col-span-3  bg-white rounded-md p-2 shadow-xl transition-all hover:shadow-2xl ">
          <TradingView symbol={ticker.symbol} />
        </div>
        <div className="bg-white rounded-md p-2 shadow-xl transition-all hover:shadow-2xl ">
          <div className="w-full border-b p-3 text-xl font-bold">
            News 요약서비스
          </div>
          <div className="w-full">
            <NewsView />
          </div>
        </div>
        <div className="col-span-4 bg-white rounded-md p-2 shadow-xl transition-all hover:shadow-2xl ">
          <div className="w-full border-b p-3 text-xl font-bold">
            Statistics (APPL)
          </div>
          <div className="w-full">
            <FactorView />
          </div>
        </div>
      </div>
    </div>
  );
};
export default ExploreSection;
