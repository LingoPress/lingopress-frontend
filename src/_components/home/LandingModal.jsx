import ModalOuterLayer from "../ModalOuterLayer";
import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import LandingImage from "../../assets/landingImage.png";
import { useAtomValue } from "jotai/index";
import { authAtom } from "../../atom/user";

const LandingModalBox = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  text-align: center;
  width: 50rem;

  h1 {
    font-size: 1.5rem;
  }

  button {
    margin-top: 1rem;
    padding: 0.3rem 0.5rem;
    border: none;
    border-radius: 4px;
    background-color: #007bff;
    color: white;
    cursor: pointer;
    margin-right: 2rem;
  }

  #landingImage {
    width: 40rem;
    margin-top: 1rem;
  }
`;

const LandingModal = () => {
  const authStatus = useAtomValue(authAtom);

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    console.log(authStatus.is_logged_in);
    if (
      authStatus.is_logged_in === true ||
      localStorage.getItem("token") !== null
    ) {
      setShowModal(false);
      return;
    }

    const showModal = localStorage.getItem("showModal");

    const today = new Date();

    if (showModal !== today.toLocaleDateString()) {
      setShowModal(true);
    }
  }, [authStatus]);
  const handleCloseModal = (notToday) => {
    setShowModal(false);
    if (notToday) {
      const today = new Date();
      localStorage.setItem("showModal", today.toLocaleDateString());
    }
  };
  return (
    <>
      {showModal && (
        <>
          <LandingModalBox>
            <h1>링고프레스로 번역, 독해, 어휘, 시사까지 한번에 공부하세요!</h1>
            <br />
            링고프레스는 뉴스를 기반으로한 영어학습 플랫폼입니다.
            <br />
            <br />
            문장을 한 줄 씩 번역하고, <strong>DEEPL이 번역한 문장</strong>과
            비교하며 학습하세요.
            <br />
            모르는 문장은 <strong>CHAT GPT와 연동된 단어검색</strong>을 통해{" "}
            <strong>문맥에 맞는 단어 뜻</strong>을 확인할 수 있어요!
            <br />
            <br />
            <br />
            하지만 비 로그인 상태에서는 읽는거 밖에 못해요...
            <br />
            <br />
            로그인하면 문장 번역 후 번역본과의 비교, 문맥에 맞는 단어검색,
            나만의 단어장, 내 학습관리를 할 수 있습니다!
            <br />
            <img id={"landingImage"} src={LandingImage} alt={"랜딩이미지"} />
            <br />
            <button
              style={{ backgroundColor: "red" }}
              onClick={() => handleCloseModal(true)}
            >
              오늘 하루 보지 않기
            </button>
            <button onClick={() => handleCloseModal(false)}>닫기</button>
          </LandingModalBox>
          <ModalOuterLayer
            background={"rgba(0, 0, 0, 0.8)"}
            handleCloseModal={() => handleCloseModal(false)}
          />
        </>
      )}
    </>
  );
};

export default LandingModal;
