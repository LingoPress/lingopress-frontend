import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import TranslateSection from "./TranslateSection";
import styled from "@emotion/styled";
import {useAtom} from "jotai/index";
import {authAtom} from "../../atom/user";
import {axiosPrivate, axiosPublic} from "../../utils/axiosMethod";

const PressTitle = styled.h1`
  font-size: 1.3rem;
`;
const PressSection = () => {
  const props = useParams();
  const [pressData, setPressData] = useState([]);
  const [authStatus, setAuthStatus] = useAtom(authAtom);
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
    <section style={{
      width: "78vw"
    }}>
      <PressTitle>{pressData ? pressData.title : null}</PressTitle>
      <br/>
      <br/>
      <TranslateSection pressData={pressData}/>
      <br/>
      <br/>
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
    </section>
  );
};

export default PressSection;
