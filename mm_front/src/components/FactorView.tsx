import React from "react";

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

const FactorView = () => {
  return (
    <div>
      <div className="flex">
        <FactorItem header="Open" content="127.01" />
        <FactorItem header="heigh" content="127.01" />
        <FactorItem header="Close" content="126.68" />
        <FactorItemBear header="Change" content="-0.20%" />
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
