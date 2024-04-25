import PressSection from "../../_components/home/PressSection";
import styled from "@emotion/styled";
import { customColors } from "../../styles/color";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAtomValue } from "jotai/index";
import { authAtom } from "../../atom/user";
import { axiosPrivate } from "../../utils/axiosMethod";

const SubTitle = styled.h2`
  font-size: 2rem;
  margin-left: 2rem;
  text-align: center;
  font-weight: 400;
`;

const LandingPageMark = styled.p`
  position: fixed;
  right: 2rem;
  bottom: 2rem;
  font-size: 3rem;
  z-index: 1000;
  background-color: ${customColors.background.button["100"]};
  border-radius: 30%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  padding: 0.4rem 1.6rem;
  text-align: center;
  font-family: "Space Mono", sans-serif;
  cursor: pointer;
  transition: box-shadow 0.3s ease-in-out;
  color: white;

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
  }
`;
export default function Home() {
  const authStatus = useAtomValue(authAtom);

  const [todayLearningRecord, setTodayLearningRecord] = useState(0);

  useEffect(() => {
    if (authStatus.is_logged_in === true) {
      // 오늘 학습한 문장 수 불러오기
      axiosPrivate
        .get("/api/v1/learning-record/today")
        .then((res) => {
          setTodayLearningRecord(res.data.data.count);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [authStatus]);

  const navigate = useNavigate();
  return (
    <div>
      {/* 랜딩 모달 */}
      {/* 유저가 비 로그인 상태일 때, 그리고 오늘하루 보지않기 클릭시 로컬스토리지에 해당 값 저장 */}
      {/*  <LandingModal /> */}
      <br />
      {todayLearningRecord ? (
        <SubTitle>🔥벌써 오늘 {todayLearningRecord}문장 도전 중🔥</SubTitle>
      ) : (
        <SubTitle>
          오늘은 한문장도 번역하지 않았군요..! <br />
          🔥원하는 뉴스를 클릭해 번역을 시작해보세요🔥
        </SubTitle>
      )}
      <br />
      <br />
      <br />
      <LandingPageMark onClick={() => navigate("/whatis")}>?</LandingPageMark>
      <PressSection />
    </div>
  );
}
