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
  background-color: rgba(248, 250, 252, 0.88);
  backdrop-filter: blur(18px);
  border-bottom: 1px solid ${customColors.border[100]};
  padding: 1.4rem clamp(1.6rem, 4vw, 5rem);
  display: flex;
  position: sticky;
  top: 0;
  z-index: 10;

  .title {
    font-size: 2.7rem;
    font-family: "Margarine", sans-serif;
    color: ${customColors.text.title[900]};
    cursor: pointer;
    letter-spacing: 0;
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
    border: 1px solid ${customColors.border[100]};
    border-radius: 0.8rem;
    padding: 0.6rem 0.8rem;
  }

  @media (max-width: 991px) {
    .navbar-collapse {
      padding-top: 1.6rem;
    }
  }
`;

const StyledLink = styled(NavLink)`
  font-size: 1.45rem;
  text-decoration: none;
  font-weight: 700;
  transition:
    color 0.2s ease,
    background-color 0.2s ease,
    transform 0.2s ease;
  margin: 0 0 0 0.8rem;
  padding: 0.9rem 1.2rem;
  border-radius: 999px;
  color: ${customColors.text.subTitle[200]};
  cursor: pointer;

  &:hover {
    color: ${customColors.text.title[900]};
    background-color: #eef2ff;
    transform: translateY(-1px);
  }

  &:focus {
    color: ${customColors.text.title[900]};
  }

  svg {
    display: block;
  }
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
    if (localStorage.getItem("userLanguage") !== null) {
      i18n.changeLanguage(localStorage.getItem("userLanguage"));
    } else {
      const userLanguage = navigator.language || navigator.userLanguage;
      i18n.changeLanguage(userLanguage);
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
              <StyledLink onClick={() => navigate("/my-page/my-lingopress")}>
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
