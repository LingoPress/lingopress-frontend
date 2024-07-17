import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import TranslateSection from "./TranslateSection";
import styled from "@emotion/styled";
import { axiosPrivate, axiosPublic } from "../../utils/axiosMethod";
import { useMediaQuery } from "react-responsive";
import Vocabulary from "./Vocabulary";
import ReactPlayer from "react-player/youtube";

const PressTitle = styled.h1`
  font-size: 2.3rem;
  margin-bottom: 1rem;
`;
const PressDescription = styled.p`
  margin-top: 2rem;
  font-size: 1.5rem;
  margin-bottom: 4rem;
`;

const YoutubeVideoWrap = styled.div`
  position: relative;
  width: 30rem;
  padding-top: 25px;
  margin-bottom: 2rem;
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
            `${process.env.REACT_APP_BACKEND_API_URL}/v1/press/${props.press_id}`,
          );
        } else {
          result = await axiosPrivate.get(
            `${process.env.REACT_APP_BACKEND_API_URL}/v1/press/${props.press_id}`,
          );
        }
        setPressData(result.data.data);
      }
    };
    responseData();
  }, [authStatus]);

  const options = { month: "long", day: "numeric", year: "numeric" };

  const playerRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  const handlePlayFrom = (seconds) => {
    if (playerRef.current) {
      playerRef.current.seekTo(seconds);
      setPlaying(true); // 재생 상태로 설정
      window.scrollTo(0, 0);
    }
  };
  return (
    <>
      {authStatus.is_logged_in ? <Vocabulary isMobile={isMobile} /> : null}
      <section
        style={{
          width: isMobile ? "95vw" : "78vw",
          margin: "3rem",
        }}
      >
        {pressData.category === "YOUTUBE" ? (
          <YoutubeVideoWrap
            style={{
              width: isMobile ? "88vw" : "60vw",
            }}
          >
            <ReactPlayer
              ref={playerRef}
              url={pressData ? pressData.originalUrl : null}
              controls={true}
              width="100%"
              playing={playing}
              config={{
                youtube: {
                  playerVars: {
                    rel: 0,
                  },
                },
              }}
            />
          </YoutubeVideoWrap>
        ) : null}
        <PressTitle>{pressData ? pressData.title : null}</PressTitle>
        <PressTitle>
          {pressData.translatedTitle ? pressData.translatedTitle : null}
        </PressTitle>

        {pressData.category === "NEWS" ? (
          <PressDescription>
            This{" "}
            <a
              style={{
                textDecoration: "none",
              }}
              href={pressData.originalUrl}
              target="_blank"
              rel="noreferrer"
            >
              story
            </a>{" "}
            by {pressData.author ? pressData.author : "anonymous user"}{" "}
            originally appeared on Global Voices on{" "}
            {new Date(pressData.publishedAt).toLocaleString("en-US", options)}.
          </PressDescription>
        ) : (
          <PressDescription>
            by {pressData.author ? pressData.author : "anonymous user"}{" "}
          </PressDescription>
        )}

        <TranslateSection
          pressData={pressData}
          isMobile={isMobile}
          handlePlayFrom={handlePlayFrom}
        />
      </section>
    </>
  );
};

export default PressSection;
