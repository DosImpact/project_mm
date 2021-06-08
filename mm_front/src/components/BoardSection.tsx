import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Editor } from "@toast-ui/react-editor";

interface Article {
  author: string;
  content: string;
  createdAt: string;
  deletedAt?: string;
  id: string;
  updatedAt: string;
  v: number;
}
interface IuseArticles {
  loading: boolean;
  erorr?: boolean;
  articles?: Article[];
}
const useArticles = () => {
  const [state, setState] = useState<IuseArticles>({ loading: true });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await Axios.get("http://localhost:4000/article");
        if (res.data?.ok) {
          const articles: Article[] = res.data?.articles;
          console.log(articles);
          setState({
            erorr: false,
            loading: false,
            articles,
          });
        } else {
          setState({
            erorr: true,
            loading: false,
          });
        }
      } catch (error) {
        setState({
          erorr: true,
          loading: false,
        });
      }
    };
    fetchData();
    return () => {};
  });

  return state;
};

const BoardSection = () => {
  const editorRef = React.useRef<Editor>(null);
  const { loading, articles, erorr } = useArticles();

  const getContent = () => {
    const markdown = editorRef.current?.getInstance().getMarkdown();
    console.log(markdown);
  };

  return (
    <div>
      <div className="EditorSection">
        <Editor
          ref={editorRef}
          initialValue="주식 종목에 대한 가치들을 사람들과 논의해봐요!!"
          previewStyle="vertical"
          height="600px"
          initialEditType="markdown"
          useCommandShortcut={true}
          usageStatistics={false}
        />
      </div>
      <div className="bg-gray-100">
        <button
          className="bg-white cursor-pointer rounded-md m-3 h-10 w-20 font-semibold hover:bg-green-300 hover:text-white"
          onClick={() => {
            getContent();
          }}
        >
          글쓰기
        </button>
      </div>
      <div>{loading && <div>loading...</div>}</div>
      <div>
        {!erorr && (
          <div>
            {articles?.map((e) => {
              return (
                <div className="articleContainer my-3 rounded-md border-gray-100 border p-2">
                  <div className="flex flex-row justify-between  ">
                    <div className="font-bold text-xl">{e.author}</div>
                    <div className="mx-2 text-gray-500">{e.createdAt}</div>
                  </div>
                  <div className="my-2">{e.content}</div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default BoardSection;
