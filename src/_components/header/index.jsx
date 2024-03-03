import styled from "@emotion/styled";
import { Link } from "react-router-dom";

const Container = styled.header`
  background-color: #2f2f2f; /* 헤더 배경색 변경 */
  color: #fff;
  padding: 20px;
  display: flex;
  justify-content: right;
  padding-top: 40px;

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
  return (
    <Container>
      <h1>LingoPress</h1>
      <Nav>
        <StyledLink to="/">번역하러 가기</StyledLink>
        <StyledLink to="/lingo-press-retry">틀린 문장 다시 도전하기</StyledLink>
        <StyledLink to="/lingo-words">단어장</StyledLink>
        <StyledLink to="/my-lingo-press">내가 번역한 뉴스들</StyledLink>
        <StyledLink to="/my-page">마이페이지</StyledLink>
      </Nav>
    </Container>
  );
};
