import React from "react";
import Axiso from "axios";
import Fuse from "fuse.js";
import { useRecoilState, useRecoilValue } from "recoil";
import { tickerState } from "../store/tickerStats";

const fuseOptions = {
  shouldSort: true,
  threshold: 0.4,
  location: 0,
  distance: 50,
  maxPatternLength: 12,
  minMatchCharLength: 3,
  keys: ["symbol", "name"],
};

interface ITicker {
  createdAt: string;
  deletedAt: string | null;
  id: number;
  industry: string;
  name: string;
  sector: string;
  symbol: string;
  updatedAt: string;
  v: number;
}

const useTickers = () => {
  const [tickers, setTicker] = React.useState<ITicker[]>([]);
  React.useEffect(() => {
    const fetchData = async () => {
      const res = await Axiso.get("http://localhost:4000/finance/tickers");
      setTicker(res.data);
    };
    fetchData();
    return () => {};
  }, []);
  return { tickers };
};

const SearchBar = () => {
  const { tickers } = useTickers();
  //   const query = React.useState<string>("");
  //   const fuse = new Fuse(tickers, fuseOptions);
  //   const data = query ? fuse.search() : tickers;

  const [ticker, setTicker] = useRecoilState(tickerState);
  const [fuzzyTicker, setFuzzyTicker] = React.useState<string>("");
  const [fuzzySymbol, setFuzzySymbol] = React.useState<string>("");
  return (
    <div className="">
      {/* <div className="absolute">{JSON.stringify(tickers)}</div> */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (fuzzyTicker && fuzzySymbol) {
            console.log("change ticker");
            setTicker({
              name: fuzzyTicker,
              symbol: fuzzySymbol,
            });
          }
        }}
      >
        <input
          className="p-1 border border-gray-300 rounded-sm w-64"
          placeholder="🏃‍♂ Search company"
          type="text"
          onChange={(e) => {
            const value = e.target.value;
            const filtered_tickers = tickers.filter((t) =>
              t.name.startsWith(value)
            );
            console.log(filtered_tickers);
            if (filtered_tickers.length >= 1) {
              setFuzzyTicker(filtered_tickers[0].name);
              setFuzzySymbol(filtered_tickers[0].symbol);
            }
          }}
        ></input>
      </form>
      <div>
        Search Result({tickers.length}) : {fuzzyTicker}({fuzzySymbol})
      </div>
    </div>
  );
};

export default SearchBar;
