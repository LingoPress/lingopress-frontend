import { useEffect, useState } from "react";
import PerLineComponent from "./PerLineComponent";

const TranslateSection = ({ pressData }) => {
  const [originalContent, setOriginalContent] = useState([]);
  const [translatedContent, setTranslatedContent] = useState([]);
  useEffect(() => {
    if (pressData) {
      console.log("hola");
      setOriginalContent(pressData.originalContent);
      setTranslatedContent(pressData.translatedContent);
    }
  }, [pressData]);

  return (
    <>
      {originalContent ? (
        <div>
          {originalContent.map((item, index) => (
            <PerLineComponent
              key={index}
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
