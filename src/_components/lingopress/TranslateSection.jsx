import { useEffect, useState } from "react";
import PerLineComponent from "./PerLineComponent";

const TranslateSection = ({ pressData }) => {
  // const [originalContent, setOriginalContent] = useState([]);
  // const [translatedContent, setTranslatedContent] = useState([]);
  const [content, setContent] = useState([]);
  useEffect(() => {
    if (pressData) {
      // setOriginalContent(pressData.originalText);
      // setTranslatedContent(pressData.translatedText);
      setContent(pressData.content);
    }
  }, [pressData]);

  return (
    <>
      {content ? (
        <div>
          {content.map((item, index) => (
            <PerLineComponent
              key={index}
              // lineNumber는 1부터 시작해야함.
              lineNumber={item.pressContentLineNumber}
              originalContent={item.originalLineText}
              translatedContent={item.machineTranslatedLineText}
              userTranslatedContent={item.userTranslatedLineText}
              isCorrect={item.isCorrect}
            />
          ))}
        </div>
      ) : null}
    </>
  );
};
export default TranslateSection;
