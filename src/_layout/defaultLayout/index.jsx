import styled from "@emotion/styled";
import { Header } from "../../_components/header";
import { Footer } from "../../_components/footer";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100vw;
  background-color: black;
`;

const Content = styled.div``;

const Main = styled.main``;

export const Layout = (props) => {
  return (
    <Container>
      <Header />
      <Content>
        <Main>{props.children}</Main>
      </Content>
      <Footer />
    </Container>
  );
};
