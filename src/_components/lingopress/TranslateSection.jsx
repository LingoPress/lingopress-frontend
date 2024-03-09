import { useEffect, useState } from "react";
import PerLineComponent from "./PerLineComponent";

const TranslateSection = ({ pressData }) => {
  const [originalContent, setOriginalContent] = useState([]);
  const [translatedContent, setTranslatedContent] = useState([]);
  useEffect(() => {
    if (pressData) {
      setOriginalContent(pressData.originalText);
      setTranslatedContent(pressData.translatedText);
    }
  }, [pressData]);

  return (
    <>
      {originalContent ? (
        <div>
          {originalContent.map((item, index) => (
            <PerLineComponent
              key={index}
              // lineNumber는 1부터 시작해야함.
              lineNumber={index + 1}
              originalContent={item}
              translatedContent={translatedContent[index]}
            />
          ))}
        </div>
      ) : null}
    </>
  );
};
export default TranslateSection;
