import styled from "@emotion/styled";
import { Link, useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { authAtom } from "../../atom/user";
import { useEffect } from "react";

const Container = styled.header`
  background-color: #e2711d; /* 헤더 배경색 변경 */
  color: #000000;
  padding: 20px;
  display: flex;
  justify-content: right;
  padding-top: 40px;
  z-index: 10;

  & > h1 {
    position: absolute;
    left: 2rem;
  }
`;

const Nav = styled.nav`
  width: 60%; /* 네비게이션 너비 조정 */

  display: flex;
  justify-content: space-around; /* 간격 균등하게 조정 */
`;

const StyledLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  font-weight: bold;
  transition: color 0.3s ease; /* 링크 색상 변화 효과 */

  &:hover {
    color: #25ff99; /* 호버 시 색상 변경 */
  }
`;

export const Header = () => {
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
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setAuthStatus({ is_logged_in: false });
  };

  return (
    <Container>
      <h1
        style={{
          cursor: "pointer",
        }}
        onClick={() => navigate("/")}
      >
        LingoPress
      </h1>
      <Nav>
        <StyledLink to="/">번역하러 가기</StyledLink>
        {/* <StyledLink to="/retry-lingopress">틀린 문장 다시 도전하기</StyledLink> */}
        <StyledLink to="/vocabulary">단어장</StyledLink>
        <StyledLink to="/my-lingopress">내가 번역한 뉴스들</StyledLink>

        {authStatus.is_logged_in ? (
          <StyledLink
            onClick={() => {
              handleLogout();
            }}
            to="/"
          >
            로그아웃
          </StyledLink>
        ) : (
          <StyledLink to="/login">로그인</StyledLink>
        )}
      </Nav>
    </Container>
  );
};
