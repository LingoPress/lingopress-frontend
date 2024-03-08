import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TranslateSection from "./TranslateSection";
import styled from "@emotion/styled";
import axios from "axios";

const PressTitle = styled.h1`
  font-size: 1.3rem;
`;
const PressSection = () => {
  const props = useParams();
  const [pressData, setPressData] = useState([]);
  useEffect(() => {
    // 뉴스정보 가져오기
    const responseData = async () => {
      const result = await axios.get(
        `${process.env.REACT_APP_BACKEND_API_URL}/api/v1/press/${props.press_id}`,
      );
      console.log(result.data.data);
      setPressData(result.data.data);
    };
    responseData();
  }, []);
  return (
    <div>
      <PressTitle>{pressData ? pressData.title : null}</PressTitle>
      <br />
      <br />
      <TranslateSection pressData={pressData} />
      <br />
      <br />
      <a
        style={{
          textDecoration: "none",
          color: "black",
          fontSize: "0.8rem",
          fontWeight: "bold",
          padding: "10px",
          border: "1px solid black",
          borderRadius: "10px",
          marginTop: "1rem",
          marginBottom: "1rem",
        }}
        href={pressData.originalUrl}
        target="_blank"
        rel="noreferrer"
      >
        {" "}
        원문 보기{" "}
      </a>
    </div>
  );
};

export default PressSection;
