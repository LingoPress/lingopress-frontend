import styled from "@emotion/styled";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { useState } from "react";
import { axiosPrivate } from "../utils/axiosMethod";
import { useNavigate } from "react-router-dom";
import { isValidYouTubeUrl } from "../utils/validation";
import { useAtomValue } from "jotai/index";
import { authAtom } from "../atom/user";
import { t } from "i18next";
import { Trans } from "react-i18next";
import { LuListVideo } from "react-icons/lu";

const VideoUrlBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: min(72rem, 100%);
  padding: 1rem 1rem 1rem 1.6rem;
  border: 1px solid #e2e8f0;
  box-shadow: 0 1.6rem 4rem rgba(15, 23, 42, 0.08);
  background: #ffffff;
  border-radius: 0.8rem;
  margin-bottom: 1rem;
  font-size: 2rem;
  cursor: pointer;
`;

const UrlInputBox = styled.input`
  width: 100%;
  height: 5rem;
  padding: 0 1rem;
  border: 0 solid black;
  border-radius: 0.5rem;
  font-size: 1.8rem;
  color: #0f172a;

  :focus {
    outline: none;
  }
`;

const Title = styled.h1`
  font-size: clamp(2.8rem, 5vw, 4.4rem);
  font-weight: 900;
  margin-bottom: 4rem;
  color: #0f172a;
  text-align: center;
`;

const EnrollVideoWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 6rem 2rem;
`;

const Description = styled.p`
  font-size: 1.5rem;
  text-align: center;
  color: #64748b;
  line-height: 1.7;
`;

const VideoListBox = styled.div`
  position: relative;
  display: flex;
  margin: 3rem auto 0;
  width: min(72rem, calc(100% - 4rem));
  justify-content: space-between;
`;

const EnrollVideo = () => {
  const navigate = useNavigate();
  const [videoUrl, setVideoUrl] = useState("");
  const authStatus = useAtomValue(authAtom);

  const sendVideoRequest = async () => {
    // login 상태 확인
    if (authStatus.is_logged_in === false) {
      alert(t("alert.login_first"));
      navigate("/login");
      return;
    }
    if (videoUrl === "") {
      alert(t("URL을 입력해주세요."));
      return;
    }
    if (isValidYouTubeUrl(videoUrl) === false) {
      alert(t("유효한 유튜브 링크를 입력해주세요."));
      return;
    }
    let result = await axiosPrivate({
      method: "post",
      url: "/v1/video-transcriptions",
      data: {
        videoUrl: videoUrl,
      },
    });

    if (result.status === 200) {
      alert(t("EnrollVideo.요청성공"));
      navigate("/youtube");
    }
  };
  return (
    <>
      <VideoListBox>
        <LuListVideo
          style={{ cursor: "pointer" }}
          size={60}
          onClick={() => navigate("/youtube")}
        />
      </VideoListBox>
      <EnrollVideoWrap style={{ minHeight: "75vh" }}>
        <Title>
          <Trans i18nKey={"EnrollVideo.제목"} />
        </Title>
        <VideoUrlBox>
          <UrlInputBox
            placeholder={t("EnrollVideo.placeholder")}
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
          />
          <FaArrowAltCircleRight
            style={{ marginRight: "1rem" }}
            size={30}
            onClick={() => sendVideoRequest()}
          />
        </VideoUrlBox>
        <Description>
          <Trans i18nKey={"EnrollVideo.설명"} />
          <br />
        </Description>
        <div style={{ height: "20vh" }} />
      </EnrollVideoWrap>
    </>
  );
};

export default EnrollVideo;
