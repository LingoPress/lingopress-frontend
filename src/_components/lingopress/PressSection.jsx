import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import dummydata from "../../mock/dummydata";
import TranslateSection from "./TranslateSection";
import styled from "@emotion/styled";

const PressTitle = styled.h1`
  font-size: 1.3rem;
`;
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
      <PressTitle>
        {pressData.length > 0 ? pressData[0].title : null}
      </PressTitle>
      <br />
      <br />
      <TranslateSection pressData={pressData} />
    </div>
  );
};

export default PressSection;
