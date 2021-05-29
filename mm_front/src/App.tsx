import React from "react";
import ExploreSection from "./components/ExploreSection";
import { Board, Explore, Inbox, Logo } from "./icons";

const LeftBar = () => {
  return (
    <div className="h-full border-gray-400 border-r border-opacity-40 p-8 ">
      <div className="title flex items-center justify-start text-4xl cursor-pointer">
        <Logo />
        <div className="text-gray-500 pl-2">호재조</div>
      </div>
      <div className="grid gap-5 mt-8">
        <div className="flex items-center justify-start pl-2  h-10 hover:bg-green-300 hover:text-white transition-all cursor-pointer rounded-md">
          <Explore />
          <div className="pl-2 ">OverView</div>
        </div>

        <div className="flex items-center justify-start pl-2  h-10 hover:bg-green-300 hover:text-white transition-all cursor-pointer rounded-md">
          <Board />
          <div className="pl-2">Board</div>
        </div>

        <div className="flex items-center justify-start pl-2  h-10 hover:bg-green-300 hover:text-white transition-all cursor-pointer rounded-md">
          <Inbox />
          <div className="pl-2">Info</div>
        </div>
      </div>
    </div>
  );
};

const StatusBar = () => {
  return (
    <div className="p-8 border-b border-gray-300 min-w-full max-w-full w-full">
      <div className="flex justify-between">
        <div className="left flex items-center text-2xl text-green-400">
          🚀 APPL
        </div>
        <div className="right flex gap-5 items-center">
          <div className="SearchBar">
            <input
              className="p-1 border border-gray-300 rounded-sm w-64"
              placeholder="🏃‍♂ Search company"
              type="text"
            ></input>
          </div>

          <div className="InfoBox flex flex-col">
            <div className="opacity-50 font-semibold">Porfolio Value</div>
            <div className="font-bold">$56,221,96</div>
          </div>

          <div className="InfoBox flex flex-col">
            <div className="opacity-50 font-semibold">Porfolio Value</div>
            <div className="font-bold">$56,221,96</div>
          </div>
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <div className="min-h-screen w-screen p-8 bg-blue-100">
      <div className="flex rounded-xl bg-white">
        <section className="w-60 min-h-screen">
          <LeftBar />
        </section>
        <section className="w-10/12">
          <StatusBar />
          <ExploreSection />
        </section>
      </div>
    </div>
  );
}

export default App;
