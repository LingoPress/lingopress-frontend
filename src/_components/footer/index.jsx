import styled from "@emotion/styled";

const FooterContainer = styled.footer`
  background-color: #333;
  color: #fff;
  padding: 20px;
`;

const FooterText = styled.p`
  font-size: 16px;
  margin-bottom: 10px;
`;

export const Footer = () => {
  return (
    <FooterContainer>
      <FooterText>© 2024 LingoPress. All rights reserved.</FooterText>
    </FooterContainer>
  );
};
