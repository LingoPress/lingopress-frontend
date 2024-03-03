import styled from "@emotion/styled";
import translateText from "../../utils/translateText";
import { useState } from "react";

const LineWrapper = styled.div`
  width: 85%;
`;

const OriginalLine = styled.p`
  line-height: normal;
`;

const ConvertLine = styled.textarea`
  border-radius: 1rem;
  padding: 0.1rem 1rem;
  margin-top: 1rem;
  width: 100%;
  border: 1px solid #000;
  height: 2.6rem;
  resize: none;

  &:focus {
    outline: none;
    border: 1px solid #000;
  }
`;

const LineOuterWrapper = styled.div`
  min-height: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: end;
`;

const CheckButton = styled.button`
  width: 3rem;
  height: 3rem;
  border-radius: 30%;
  background-color: #fff;
  border: 0.2rem solid #000;
`;

const VerifyBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
`;

const VerifyButton = styled.button`
  margin-top: 0.5rem;
  border: 0.2rem solid #000;
  border-radius: 30%;
  margin-right: 0.5rem;
`;

const PerLineComponent = ({ line }) => {
  const [isTranslated, setIsTranslated] = useState(false);
  const handleTranslate = () => {
    // 1. 번역
    const translatedText = translateText(line);
    // 2. db에 번역한 기록 등록 - 추후 인공지능 이용시.

    // 3. 번역 확인 문구 출력
    setIsTranslated(true);
  };

  return (
    <LineOuterWrapper>
      {line ? (
        <>
          <LineWrapper>
            <OriginalLine>{line}</OriginalLine>
            <ConvertLine></ConvertLine>
          </LineWrapper>
          <VerifyBox>
            {isTranslated ? (
              <div>
                올바르게 번역했나요?
                <div>
                  <VerifyButton>O</VerifyButton>
                  <VerifyButton>X</VerifyButton>
                </div>
              </div>
            ) : null}

            <CheckButton onClick={() => handleTranslate()}>
              확인하기
            </CheckButton>
          </VerifyBox>
        </>
      ) : null}
    </LineOuterWrapper>
  );
};
export default PerLineComponent;
