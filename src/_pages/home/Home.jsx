import PressSection from "../../_components/home/PressSection";
import styled from "@emotion/styled";
import { customColors } from "../../styles/color";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAtomValue } from "jotai/index";
import { authAtom } from "../../atom/user";
import { axiosPrivate } from "../../utils/axiosMethod";
import { useTranslation } from "react-i18next";
import VerticalCard from "../../_components/common/VerticalCard";
import CoverNovelImage from "../../assets/cover_novel.png";
import CoverNewsImage from "../../assets/cover_news.png";
import YoutubeImage from "../../assets/youtube.png";

const SubTitle = styled.h2`
  font-size: clamp(2.1rem, 3vw, 3.4rem);
  margin: 0 auto;
  text-align: center;
  font-weight: 800;
  line-height: 1.35;
  color: ${customColors.text.title[900]};
  max-width: 78rem;
`;

export const LandingPageMark = styled.p`
  position: fixed;
  right: 2.4rem;
  bottom: 2.4rem;
  font-size: 2.1rem;
  z-index: 1000;
  background-color: ${customColors.background.button["100"]};
  border-radius: 999px;
  box-shadow: 0 1rem 2rem rgba(37, 99, 235, 0.28);
  width: 4.8rem;
  height: 4.8rem;
  display: grid;
  place-items: center;
  text-align: center;
  font-family: "Space Mono", sans-serif;
  cursor: pointer;
  transition:
    box-shadow 0.2s ease,
    transform 0.2s ease;
  color: white;

  &:hover {
    box-shadow: 0 1.4rem 2.6rem rgba(37, 99, 235, 0.36);
    transform: translateY(-2px);
  }
`;

const CategoryWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(24rem, 1fr));
  justify-content: center;
  margin: 4rem auto 8rem;
  max-width: 112rem;
  gap: 2.4rem;
  padding: 0 2rem;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    max-width: 44rem;
  }
`;

const HomeWrapper = styled.div`
  min-height: 85vh;
  padding: clamp(4rem, 8vw, 8rem) 0 2rem;
`;

const IntroText = styled.p`
  color: ${customColors.text.subTitle[200]};
  font-size: 1.55rem;
  font-weight: 700;
  letter-spacing: 0;
  margin-bottom: 1.4rem;
  text-align: center;
`;

export default function Home() {
  const props = useParams();

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
    <HomeWrapper>
      {/* 랜딩 모달 */}
      {/* 유저가 비 로그인 상태일 때, 그리고 오늘하루 보지않기 클릭시 로컬스토리지에 해당 값 저장 */}
      {/*  <LandingModal /> */}
      <IntroText>LingoPress Learning Desk</IntroText>
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
      <LandingPageMark onClick={() => navigate("/whatis")}>?</LandingPageMark>
      {/* 뉴스 or 소설 고르기 */}
      {props.category ? (
        <PressSection authStatus={authStatus} category={props.category} />
      ) : (
        <CategoryWrap>
          <VerticalCard
            title={t("home.뉴스")}
            description={t("home.뉴스_설명")}
            goto={"/news"}
            image={CoverNewsImage}
          />
          <VerticalCard
            title={t("home.소설")}
            description={t("home.소설_설명")}
            goto={"/novel"}
            image={CoverNovelImage}
          />
          <VerticalCard
            title={t("home.영상")}
            description={t("home.영상_설명")}
            goto={"/enroll_video"}
            image={YoutubeImage}
          />
        </CategoryWrap>
      )}
    </HomeWrapper>
  );
}
