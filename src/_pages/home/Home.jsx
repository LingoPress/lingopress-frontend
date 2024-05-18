import PressSection from "../../_components/home/PressSection";
import styled from "@emotion/styled";
import { customColors } from "../../styles/color";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAtomValue } from "jotai/index";
import { authAtom } from "../../atom/user";
import { axiosPrivate } from "../../utils/axiosMethod";
import { useTranslation } from "react-i18next";

const SubTitle = styled.h2`
  font-size: 2rem;
  margin-left: 2rem;
  text-align: center;
  font-weight: 400;
`;

export const LandingPageMark = styled.p`
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

  const { t } = useTranslation();

  useEffect(() => {
    if (authStatus.is_logged_in === true) {
      // 오늘 학습한 문장 수 불러오기
      axiosPrivate
        .get("/v1/learning-record/today")
        .then((res) => {
          setTodayLearningRecord(res.data.data.count);
        })
        .catch((err) => {
          console.log("@@@ error: ", err.response);
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
        <SubTitle>
          {t("home.check_your_status_Y_head")}
          {todayLearningRecord}
          {t("home.check_your_status_Y_tail")}
        </SubTitle>
      ) : (
        <SubTitle>
          {t("home.check_your_status_N")}
          <br />
          <br />
          {t("home.check_your_status_fighting")}
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
