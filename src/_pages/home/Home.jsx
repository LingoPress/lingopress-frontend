import PressSection from "../../_components/home/PressSection";
import LandingModal from "../../_components/home/LandingModal";

export default function Home() {
  return (
    <div>
      {/* 랜딩 모달 */}
      {/* 유저가 비 로그인 상태일 때, 그리고 오늘하루 보지않기 클릭시 로컬스토리지에 해당 값 저장 */}
      <LandingModal />
      <br />
      <h1>링고프레스로 번역, 독해, 어휘, 시사까지 한번에 공부하세요!</h1>
      <br />
      <br />
      <br />
      <PressSection />
    </div>
  );
}
