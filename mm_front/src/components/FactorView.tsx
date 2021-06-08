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
      <div className="Header font-bold text-3xl">{header}</div>
      <div className="content m-3 font-semibold">{content}</div>
    </div>
  );
};

const FactorItemBear: React.FunctionComponent<IFactorItem> = ({
  content,
  header,
}) => {
  return (
    <div className="item  bg-gray-100 rounded-md m-3 p-5 flex flex-col justify-center items-center w-1/4">
      <div className="Header font-bold text-3xl">{header}</div>
      <div className="content m-3 font-semibold text-red-400">{content}</div>
    </div>
  );
};

const FactorItemBull: React.FunctionComponent<IFactorItem> = ({
  content,
  header,
}) => {
  return (
    <div className="item  bg-gray-100 rounded-md m-3 p-5 flex flex-col justify-center items-center w-1/4">
      <div className="Header font-bold text-3xl">{header}</div>
      <div className="content m-3 font-semibold text-blue-400 ">{content}</div>
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
      <div className={`Header font-bold text-3xl ${colorHeader}`}>{header}</div>
      <div className={`content m-3 font-semibold ${colorContent} `}>
        {content}
      </div>
    </div>
  );
};

const FactorView = () => {
  return (
    <div>
      <div className="flex">
        <FactorItem header="상승장" content="+20%" />
        <FactorItemBull header="상승장" content="+20%" />
        <FactorItemBear header="상승장" content="+20%" />
        <FactorItemCustom
          header="상승장"
          content="+20%"
          colorHeader="text-yellow-400"
          colorContent="text-yellow-400"
        />
      </div>
      <div className="flex">
        <FactorItem header="상승장" content="+20%" />
        <FactorItem header="상승장" content="+20%" />
        <FactorItem header="상승장" content="+20%" />
        <FactorItem header="상승장" content="+20%" />
      </div>
      <div className="flex">
        <FactorItem header="상승장" content="+20%" />
        <FactorItem header="상승장" content="+20%" />
        <FactorItem header="상승장" content="+20%" />
        <FactorItem header="상승장" content="+20%" />
      </div>
    </div>
  );
};

export default FactorView;
