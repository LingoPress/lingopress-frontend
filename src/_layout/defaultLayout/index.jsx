import styled from "@emotion/styled";
import { Header } from "../../_components/header";
import { Footer } from "../../_components/footer";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Content = styled.div`
  display: flex;
  flex: 1;
`;

const Main = styled.main`
  flex: 1;
  padding: 20px;
`;

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
