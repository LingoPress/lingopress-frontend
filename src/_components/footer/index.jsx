import styled from "@emotion/styled";
import React from "react";

const FooterContainer = styled.footer`
  background-color: #333;
  color: #fff;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  & a {
    color: #fff;
    margin-right: 10px;
  }
`;

const FooterText = styled.p`
  font-size: 16px;
  margin-bottom: 0;
`;

export const Footer = () => {
  return (
    <FooterContainer>
      <FooterText>© 2024 LingoPress. All rights reserved.</FooterText>
      <div>
        <a
          target={"_blank"}
          href={
            "https://sharechang.notion.site/a89f0fcaad1646c5ae1cd7ea603bf3db?pvs=4"
          }
        >
          서비스 이용약관
        </a>
        <br />
        <a
          target={"_blank"}
          href={
            "https://sharechang.notion.site/51d90f40ad10426992bea12a000da578?pvs=4"
          }
        >
          개인정보 처리방침
        </a>
      </div>
    </FooterContainer>
  );
};
