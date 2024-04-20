import PressSection from "../../_components/home/PressSection";
import styled from "@emotion/styled";
import { customColors } from "../../styles/color";
import { useNavigate } from "react-router-dom";

const SubTitle = styled.h2`
  font-size: 1.6rem;
  margin-left: 2rem;
  text-align: center;
  display: flex;
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
  padding: 1rem 1.6rem;
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
  const navigate = useNavigate();
  return (
    <div>
      {/* 랜딩 모달 */}
      {/* 유저가 비 로그인 상태일 때, 그리고 오늘하루 보지않기 클릭시 로컬스토리지에 해당 값 저장 */}
      {/*  <LandingModal /> */}
      <br />
      <SubTitle>원하는 뉴스를 클릭해 번역을 시작해보세요!</SubTitle>
      <br />
      <br />
      <br />
      <LandingPageMark onClick={() => navigate("/whatis")}>?</LandingPageMark>
      <PressSection />
    </div>
  );
}
