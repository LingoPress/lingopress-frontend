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

const VideoUrlBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 70%;
  padding: 1rem;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 0.4rem 1.2rem rgba(0, 0, 0, 0.1);

  border-radius: 2rem;
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
  font-size: 2rem;

  :focus {
    outline: none;
  }
`;

const Title = styled.h1`
  font-size: 4rem;
  font-weight: 700;
  margin-bottom: 8rem;
`;

const EnrollVideoWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

const Description = styled.p`
  font-size: 1.6rem;
  text-align: center;
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
    <EnrollVideoWrap style={{ minHeight: "85vh" }}>
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
    </EnrollVideoWrap>
  );
};

export default EnrollVideo;
