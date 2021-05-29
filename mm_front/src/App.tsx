import React from "react";
import ExploreSection from "./components/ExploreSection";
import { Board, Explore, Inbox, Logo } from "./icons";
import { Route, Link, useLocation } from "react-router-dom";
import cls from "classnames";
import BoardSection from "./components/BoardSection";
import InfoSection from "./components/InfoSection";

const LeftBar = () => {
  const location = useLocation();
  return (
    <div className="h-full border-gray-400 border-r border-opacity-40 p-8 ">
      <Link to="/">
        <div className="title flex items-center justify-start text-4xl cursor-pointer">
          <Logo />
          <div className="text-gray-500 pl-2 ">호재조</div>
        </div>
      </Link>
      <div className="grid gap-5 mt-8">
        <Link to="/">
          <div
            className={cls(
              "flex items-center justify-start pl-2  h-10 hover:bg-green-300 hover:text-white transition-all cursor-pointer rounded-md",
              location.pathname === "/" && {
                "bg-green-300 text-white": true,
              }
            )}
          >
            <Explore />
            <div className="pl-2 ">OverView</div>
          </div>
        </Link>
        <Link to="/board">
          <div
            className={cls(
              "flex items-center justify-start pl-2  h-10 hover:bg-green-300 hover:text-white transition-all cursor-pointer rounded-md",
              location.pathname === "/board" && {
                "bg-green-300 text-white": true,
              }
            )}
          >
            <Board />
            <div className="pl-2">Board</div>
          </div>
        </Link>
        <Link to="/info">
          <div
            className={cls(
              "flex items-center justify-start pl-2  h-10 hover:bg-green-300 hover:text-white transition-all cursor-pointer rounded-md",
              location.pathname === "/info" && {
                "bg-green-300 text-white": true,
              }
            )}
          >
            <Inbox />
            <div className="pl-2">Info</div>
          </div>
        </Link>
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
    <div className="min-h-screen w-screen p-8 bg-blue-100 h-full">
      <div className="flex rounded-xl bg-white h-full">
        <section className="w-60 min-h-screen h-full">
          <LeftBar />
        </section>
        <section className="w-10/12 min-h-screen h-full">
          <StatusBar />
          <Route exact path="/" component={ExploreSection}></Route>
          <Route exact path="/board" component={BoardSection}></Route>
          <Route exact path="/info" component={InfoSection}></Route>
        </section>
      </div>
    </div>
  );
}

export default App;
