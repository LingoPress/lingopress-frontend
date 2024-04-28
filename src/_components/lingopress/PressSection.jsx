import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TranslateSection from "./TranslateSection";
import styled from "@emotion/styled";
import { axiosPrivate, axiosPublic } from "../../utils/axiosMethod";
import { useMediaQuery } from "react-responsive";
import Vocabulary from "./Vocabulary";

const PressTitle = styled.h1`
  font-size: 2.3rem;
  margin-bottom: 5rem;
`;
const PressSection = ({ authStatus }) => {
  const isMobile = useMediaQuery({ query: "(max-width:768px)" });
  const props = useParams();
  const [pressData, setPressData] = useState([]);
  useEffect(() => {
    // 뉴스정보 가져오기
    const responseData = async () => {
      let result;
      if (authStatus.is_logged_in !== null) {
        if (authStatus.is_logged_in === false) {
          result = await axiosPublic.get(
            `${process.env.REACT_APP_BACKEND_API_URL}/api/v1/press/${props.press_id}`,
          );
        } else {
          result = await axiosPrivate.get(
            `${process.env.REACT_APP_BACKEND_API_URL}/api/v1/press/${props.press_id}`,
          );
        }
        setPressData(result.data.data);
      }
    };
    responseData();
  }, [authStatus]);
  return (
    <>
      {authStatus.is_logged_in ? <Vocabulary isMobile={isMobile} /> : null}
      <section
        style={{
          width: isMobile ? "95vw" : "78vw",
          margin: "3rem",
        }}
      >
        <PressTitle>{pressData ? pressData.title : null}</PressTitle>
        <TranslateSection pressData={pressData} isMobile={isMobile} />

        <a
          style={{
            textDecoration: "none",
            color: "black",
            fontSize: "0.8rem",
            fontWeight: "bold",
            padding: "1rem",
            border: "0.1rem solid black",
            borderRadius: "1rem",
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
      </section>
    </>
  );
};

export default PressSection;
