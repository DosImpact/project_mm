import React from "react";
import { atom } from "recoil";

export const tickerState = atom({
  key: "tickerState",
  default: {
    name: "",
    symbol: "",
  },
});
