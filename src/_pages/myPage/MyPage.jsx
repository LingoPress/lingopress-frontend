import styled from "@emotion/styled";
import MyLingopress from "../myLingopress/MyLingopress";
import { customColors } from "../../styles/color";
import { useMediaQuery } from "react-responsive";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import MyMemo from "../../_components/myMemo/MyMemo";

const MyPageWrapper = styled.div`
  display: ${({ isMobile }) => (isMobile ? "block" : "flex")};
  width: 80vw;
  justify-content: center;
  margin: 0 auto;
`;

const MyNav = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  margin: 2rem auto;
  min-width: 20rem;
  height: 40rem;
  padding: 1rem;

  border-radius: 5rem;
  background-color: ${customColors.background.mainBg["0"]};
  border: 1px solid ${customColors.background.mainBg["100"]};
  border-bottom: 1px solid #e9ecef;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;
const NavItem = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  cursor: pointer;
`;

const MyPageContentWrapper = styled.div`
  width: 100%;
`;

const MyPage = () => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ query: "(max-width:768px)" });
  const { option } = useParams();
  console.log(option);
  useEffect(() => {
    if (!option) {
      navigate("/my-page/my-lingopress");
    }
  }, []);

  return (
    <MyPageWrapper isMobile={isMobile}>
      <MyNav isMobile={isMobile}>
        <NavItem onClick={() => navigate("/my-page/my-lingopress")}>
          내가 번역한 뉴스들
        </NavItem>
        <NavItem onClick={() => navigate("/my-page/my-memo")}>
          내 메모들
        </NavItem>
        <NavItem onClick={() => navigate("/my-page/language")}>
          언어 설정
        </NavItem>
        <NavItem onClick={() => navigate("/my-page/opinion")}>
          의견 제시하기
        </NavItem>
        <NavItem onClick={() => navigate("/my-page/out")}>탈퇴하기</NavItem>
      </MyNav>
      <MyPageContentWrapper>
        {option === "my-lingopress" && <MyLingopress isMobile={isMobile} />}
        {option === "my-memo" && <MyMemo isMobile={isMobile} />}
      </MyPageContentWrapper>
    </MyPageWrapper>
  );
};

export default MyPage;
