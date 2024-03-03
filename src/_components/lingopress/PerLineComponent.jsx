import styled from "@emotion/styled";
import translateText from "../../utils/translateText";

const LineWrapper = styled.div`
  width: 90%;
`;

const OriginalLine = styled.p`
  line-height: normal;
`;

const ConvertLine = styled.textarea`
  border-radius: 1rem;
  padding: 0.1rem 1rem;
  margin-top: 1rem;
  width: 95%;
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
`;

const PerLineComponent = ({ line }) => {
  const handleTranslate = () => {
    // 1. 번역
    const translatedText = translateText(line);
    // 2. db에 번역한 기록 등록
    console.log(translatedText);
  };

  return (
    <LineOuterWrapper>
      {line ? (
        <>
          <LineWrapper>
            <OriginalLine>{line}</OriginalLine>
            <ConvertLine></ConvertLine>
          </LineWrapper>
          <CheckButton onClick={() => handleTranslate()}>확인하기</CheckButton>
        </>
      ) : null}
    </LineOuterWrapper>
  );
};
export default PerLineComponent;
