import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { authAtom } from "../../atom/user";
import { useEffect } from "react";
import { customColors } from "../../styles/color";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { MdLanguage } from "react-icons/md";
import i18n from "i18next";

const ContainerComponent = styled(Navbar)`
  background-color: ${customColors.background.subBg[
    "100"
  ]}; /* 헤더 배경색 변경 */
  padding: 3rem 0 2rem 3rem;
  display: flex;
  z-index: 10;

  .title {
    font-size: 3rem;
    font-family: "Margarine", sans-serif;
    color: #fff;
    cursor: pointer;
  }

  .link-group {
    display: flex;
    justify-content: right;
  }

  .custom-navbar-collapse {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  .toggle {
    margin-right: 3rem;
  }
`;

const StyledLink = styled(NavLink)`
  font-size: 2rem;
  text-decoration: none;
  font-weight: bold;
  transition: color 0.3s ease; /* 링크 색상 변화 효과 */
  margin-right: 3rem;
  margin-left: 1rem;

  &:hover {
    color: ${customColors.text.subTitle["700"]};
  }

  &:focus {
    color: white;
  }

  color: #fff;
`;

export const Header = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const [authStatus, setAuthStatus] = useAtom(authAtom);
  // 첫 접속시 로컬스토리지 값으로 로그인 여부 확인

  useEffect(() => {
    if (
      localStorage.getItem("token") !== null &&
      localStorage.getItem("token") !== undefined
    ) {
      setAuthStatus({ is_logged_in: true });
    } else {
      setAuthStatus({ is_logged_in: false });
    }

    // 언어 설정
    if (localStorage.getItem("menuLanguage") !== null) {
      i18n.changeLanguage(localStorage.getItem("menuLanguage"));
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setAuthStatus({ is_logged_in: false });
    navigate("/");
  };

  return (
    <ContainerComponent expand="lg">
      <Navbar.Brand className={"title"} onClick={() => navigate("/")}>
        LingoPress
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" className={"toggle"} />
      <Navbar.Collapse className="justify-content-end">
        <Nav>
          <StyledLink onClick={() => navigate("/")}>
            {t(`header.go_to_translate`)}
          </StyledLink>

          {authStatus.is_logged_in ? (
            <>
              <StyledLink onClick={() => navigate("/vocabulary")}>
                {t(`header.vocabulary`)}
              </StyledLink>
              <StyledLink onClick={() => navigate("/my-page")}>
                {t(`header.mypage`)}
              </StyledLink>
              <StyledLink onClick={() => handleLogout()}>
                {t(`header.logout`)}
              </StyledLink>
              <StyledLink onClick={() => navigate("/my-page/language")}>
                <MdLanguage size={30} />
              </StyledLink>
            </>
          ) : (
            <StyledLink onClick={() => navigate("/login")}>
              {t(`header.login`)}
            </StyledLink>
          )}
        </Nav>
      </Navbar.Collapse>
    </ContainerComponent>
  );
};
