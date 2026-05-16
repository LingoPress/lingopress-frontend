import styled from "@emotion/styled";
import MyLingopress from "../../_components/myPage/MyLingopress";
import { customColors } from "../../styles/color";
import { useMediaQuery } from "react-responsive";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import MyMemo from "../../_components/myPage/MyMemo";
import LanguageSetting from "../../_components/myPage/LanguageSetting";
import { axiosPrivate } from "../../utils/axiosMethod";
import { useTranslation } from "react-i18next";

const MyPageWrapper = styled.div`
  display: ${({ isMobile }) => (isMobile ? "block" : "flex")};
  width: min(112rem, calc(100% - 4rem));
  justify-content: center;
  gap: 2rem;
  margin: 4rem auto 8rem;
`;

const MyNav = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  margin: 0 auto;
  min-width: 20rem;
  height: fit-content;
  padding: 1rem;

  border-radius: 0.8rem;
  background-color: ${customColors.background.mainBg["0"]};
  border: 1px solid ${customColors.background.mainBg["100"]};
  box-shadow: 0 1.2rem 3rem rgba(15, 23, 42, 0.07);
`;
const NavItem = styled.a`
  width: 100%;
  padding: 1rem 1.2rem;
  border-radius: 0.6rem;
  font-size: 1.45rem;
  font-weight: 800;
  cursor: pointer;
  color: ${customColors.text.subTitle[200]};
  text-decoration: none;

  &:hover {
    color: ${customColors.text.title[900]};
    background: #eef2ff;
  }
`;

const MyPageContentWrapper = styled.div`
  width: 100%;
`;

const MyPage = () => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ query: "(max-width:768px)" });
  const { option } = useParams();
  const { t } = useTranslation();
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
          {t("mypage.News I've translated")}
        </NavItem>
        <NavItem onClick={() => navigate("/my-page/my-memo")}>
          {t("mypage.My memos")}
        </NavItem>
        <NavItem onClick={() => navigate("/my-page/language")}>
          {t("mypage.Language settings")}
        </NavItem>
        <NavItem href="mailto: dev.lingopress@gmail.com">
          {" "}
          {t("mypage.Giving feedback")}
        </NavItem>
        <NavItem onClick={() => deleteUser()}> {t("mypage.Withdraw")}</NavItem>
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
