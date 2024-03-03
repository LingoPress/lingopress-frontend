import { useEffect, useState } from "react";
import PerLineComponent from "./PerLineComponent";

const TranslateSection = ({ pressData }) => {
  const [PressContent, setPressContent] = useState([]);
  useEffect(() => {
    if (pressData.length > 0) {
      const content = pressData[0].desc;

      const convert = content.split("\n");
      setPressContent(convert);
    }
  }, [pressData]);

  return (
    <>
      {PressContent ? (
        <div>
          {PressContent.map((item, index) => (
            <PerLineComponent key={index} line={item} />
          ))}
        </div>
      ) : null}
    </>
  );
};
export default TranslateSection;
