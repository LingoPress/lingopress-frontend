import styled from "@emotion/styled";
import { Header } from "../../_components/header";
import { Footer } from "../../_components/footer";
import { customColors } from "../../styles/color";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${customColors.background.mainBg[0]};
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
