import styled from "@emotion/styled";
import React from "react";

const FooterContainer = styled.footer`
  background-color: #0f172a;
  color: #cbd5e1;
  padding: 2.4rem clamp(1.6rem, 4vw, 5rem);
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;

  & a {
    color: #e2e8f0;
    margin-right: 0;
    font-size: 1.35rem;
    line-height: 1.8;

    &:hover {
      color: #ffffff;
    }
  }

  @media (max-width: 640px) {
    align-items: flex-start;
    flex-direction: column;
  }
`;

const FooterText = styled.p`
  font-size: 1.35rem;
  margin-bottom: 0;
`;

export const Footer = () => {
  return (
    <FooterContainer>
      <FooterText>© 2024 LingoPress. All rights reserved.</FooterText>
      <div>
        <a
          target={"_blank"}
          rel="noreferrer"
          href={
            "https://sharechang.notion.site/a89f0fcaad1646c5ae1cd7ea603bf3db?pvs=4"
          }
        >
          서비스 이용약관
        </a>
        <br />
        <a
          target={"_blank"}
          rel="noreferrer"
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
