import React from "react";
import Axiso from "axios";
import { useRecoilState } from "recoil";
import { tickerState } from "../store/tickerStats";

interface IFactorItem {
  header: string;
  content: string;
}

const FactorItem: React.FunctionComponent<IFactorItem> = ({
  content,
  header,
}) => {
  return (
    <div className="item  bg-gray-100 rounded-md m-3 p-5 flex flex-col justify-center items-center w-1/4">
      <div className="Header font-bold ">{header}</div>
      <div className="content m-3 font-semibold text-3xl">{content}</div>
    </div>
  );
};

const FactorItemBull: React.FunctionComponent<IFactorItem> = ({
  content,
  header,
}) => {
  return (
    <div className="item  bg-gray-100 rounded-md m-3 p-5 flex flex-col justify-center items-center w-1/4">
      <div className="Header font-bold ">{header}</div>
      <div className="content m-3 font-semibold text-3xl text-red-400">
        {content}
      </div>
    </div>
  );
};

const FactorItemBear: React.FunctionComponent<IFactorItem> = ({
  content,
  header,
}) => {
  return (
    <div className="item  bg-gray-100 rounded-md m-3 p-5 flex flex-col justify-center items-center w-1/4">
      <div className="Header font-bold ">{header}</div>
      <div className="content m-3 font-semibold text-3xl text-blue-400 ">
        {content}
      </div>
    </div>
  );
};

const FactorItemCustom: React.FunctionComponent<{
  header: string;
  content: string;
  colorHeader?: string;
  colorContent?: string;
}> = ({ content, header, colorHeader, colorContent }) => {
  return (
    <div className="item  bg-gray-100 rounded-md m-3 p-5 flex flex-col justify-center items-center w-1/4">
      <div className={`Header font-bold  ${colorHeader}`}>{header}</div>
      <div className={`content m-3 font-semibold text-3xl ${colorContent} `}>
        {content}
      </div>
    </div>
  );
};

interface Indexer {
  [index: string]: string;
}
export interface IOHLCV {
  Date?: Indexer;
  Close?: Indexer;
  Open?: Indexer;
  High?: Indexer;
  Low?: Indexer;
  Volume?: Indexer;
  Change?: Indexer;
  SMA_3?: Indexer;
  SMA_5?: Indexer;
  SMA_10?: Indexer;
  SMA_20?: Indexer;
  MMT?: Indexer;
  MMT_TARGE?: Indexer;
}

const useOHLCV = (symbol: string) => {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [ohlcv, set_ohlcv] = React.useState<IOHLCV>({});
  React.useEffect(() => {
    const fetchData = async () => {
      const res = await Axiso.get(
        `http://localhost:4000/finance/ticker/ohlcv/${symbol}`
      );
      // console.log(res);
      set_ohlcv(res.data);
      setLoading(false);
    };
    fetchData();
    return () => {};
  }, [symbol]);

  return { loading, ohlcv };
};

const FactorView = () => {
  const [ticker, _] = useRecoilState(tickerState);
  const { loading, ohlcv } = useOHLCV(ticker.symbol);
  // console.log(ohlcv);
  // if (!loading && ohlcv && ohlcv?.Open) {
  //   console.log(Object.keys(ohlcv?.Open));
  //   console.log(Object.keys(ohlcv?.Open).slice(-1));
  // }

  return (
    <div>
      <div className="flex">
        {!loading && (
          <>
            <FactorItem
              header="Open"
              content={String(
                ohlcv &&
                  ohlcv?.Open &&
                  ohlcv?.Open[Number(Object.keys(ohlcv?.Open).slice(-1))]
              )}
            />
            <FactorItem
              header="High"
              content={String(
                ohlcv &&
                  ohlcv?.High &&
                  ohlcv?.High[Number(Object.keys(ohlcv?.High).slice(-1))]
              )}
            />
            <FactorItem
              header="Close"
              content={String(
                ohlcv &&
                  ohlcv?.Close &&
                  ohlcv?.Close[Number(Object.keys(ohlcv?.Close).slice(-1))]
              )}
            />
            <FactorItemBear
              header="Change"
              content={String(
                ohlcv &&
                  ohlcv?.Change &&
                  ohlcv?.Change[Number(Object.keys(ohlcv?.Change).slice(-1))]
              )}
            />
          </>
        )}
      </div>
      <div className="flex">
        <FactorItemBull header="3일 상승장" content="+12.37%" />
        <FactorItemBull header="5일 상승장" content="+7.20%" />
        <FactorItemBear header="변동성 돌파" content="0.89" />
        <FactorItemCustom
          header="골든크로스"
          content="+20%"
          colorHeader="text-yellow-400"
          colorContent="text-yellow-400"
        />
      </div>

      <div className="flex">
        <FactorItemBull header="S&P SMA_3" content="+0.01%" />
        <FactorItemCustom
          header="가격예측(Beta)"
          content="137.85"
          colorHeader="text-red-400"
          colorContent="text-red-400"
        />
        <FactorItemCustom
          header="더블 상승장"
          content="FALSE"
          colorHeader="text-yellow-400"
          colorContent="text-blue-400"
        />
        <FactorItemCustom
          header="연속 상승장"
          content="FALSE"
          colorHeader="text-yellow-400"
          colorContent="text-blue-400"
        />
      </div>
    </div>
  );
};

export default FactorView;
