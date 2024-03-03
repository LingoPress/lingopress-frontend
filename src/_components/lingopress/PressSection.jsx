import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import dummydata from "../../mock/dummydata";
import TranslateSection from "./TranslateSection";

const PressSection = () => {
  const props = useParams();
  const [pressData, setPressData] = useState([]);

  useEffect(() => {
    const newsData = dummydata.filter(
      (news) => news.id === Number.parseInt(props.press_id),
    );
    //
    setPressData(newsData);

    // 뉴스정보 가져오기
  }, []);
  return (
    <div>
      <h1>{pressData.length > 0 ? pressData[0].title : null}</h1>
      <TranslateSection pressData={pressData} />
    </div>
  );
};

export default PressSection;
