import React from "react";
import { Editor } from "@toast-ui/react-editor";

const BoardSection = () => {
  const editorRef = React.useRef<Editor>(null);

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
    </div>
  );
};

export default BoardSection;
