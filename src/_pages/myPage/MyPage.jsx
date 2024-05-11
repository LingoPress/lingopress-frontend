import styled from "@emotion/styled";
import MyLingopress from "../../_components/myPage/MyLingopress";
import { customColors } from "../../styles/color";
import { useMediaQuery } from "react-responsive";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import MyMemo from "../../_components/myPage/MyMemo";
import LanguageSetting from "../../_components/myPage/LanguageSetting";
import { axiosPrivate } from "../../utils/axiosMethod";

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
const NavItem = styled.a`
  font-size: 1.5rem;
  font-weight: 600;
  cursor: pointer;
  color: black;
  text-decoration: none;
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

  const deleteUser = () => {
    if (window.confirm("정말로 탈퇴하시겠습니까?")) {
      axiosPrivate({
        method: "patch",
        url: "/v1/users/delete",
      }).then(
        (res) => {
          console.log(res.data);
        },
        (err) => {
          console.log(err.data);
        },
      );
      ///      localStorage.removeItem("token");
      // navigate("/");
    }
  };
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
        <NavItem href="mailto: dev.lingopress@gmail.com">의견 제시하기</NavItem>
        <NavItem onClick={() => deleteUser()}>탈퇴하기</NavItem>
      </MyNav>
      <MyPageContentWrapper>
        {option === "my-lingopress" && <MyLingopress isMobile={isMobile} />}
        {option === "my-memo" && <MyMemo isMobile={isMobile} />}
        {option === "language" && <LanguageSetting />}
      </MyPageContentWrapper>
    </MyPageWrapper>
  );
};

export default MyPage;
