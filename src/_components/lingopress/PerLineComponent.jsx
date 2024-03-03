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
  border-radius: 0.5rem;
  padding: 0.7rem 1rem;
  margin-top: 1rem;
  width: 100%;
  border: 1px solid #ccc;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-size: 1rem;
  resize: none;
  transition:
    border-color 0.3s ease,
    box-shadow 0.3s ease;

  &:focus {
    outline: none;
    border-color: #80ff92;
    box-shadow: 0 0 0 3px rgb(187, 255, 197);
  }
`;

const LineOuterWrapper = styled.div`
  min-height: 3rem;
  display: flex;
  justify-content: space-between;
  align-items: end;
`;

const CheckButton = styled.button`
  width: 3rem;
  height: 3rem;
  background-color: #fff;
  border: 0.1rem solid #ccc;
  border-radius: 0.3rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-size: 1rem;
`;

const VerifyBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
`;

const VerifyButton = styled.button`
  margin-top: 0.5rem;
  margin-right: 0.5rem;
  background-color: #fff;
  border: 0.1rem solid #ccc;
  border-radius: 0.3rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-size: 1rem;
`;

const MachineTranslatedLine = styled.p`
  line-height: normal;
  position: absolute;
  margin-left: 1rem;
`;

const VerifyZone = styled.div`
  display: flex;
  margin-bottom: 1rem;
`;

const PerLineComponent = ({ line }) => {
  const [machineTranslatedText, setMachineTranslatedText] = useState("");
  const [userTranslatedText, setUserTranslatedText] = useState("");
  const [userTranslatedTextColor, setUserTranslatedTextColor] = useState(null);
  const handleTranslate = () => {
    // 텍스트 입력 여부 확인
    if (userTranslatedText === "") {
      alert("텍스트를 입력해주세요.");
      return;
    }
    // 1. 번역
    const translatedText = translateText(line);
    // TODO: 2. db에 번역한 기록 등록 - 추후 인공지능 이용시.
    //

    // 3. 번역 확인 문구 출력
    setMachineTranslatedText(translatedText);
  };

  /**
   * 번역 확인.
   * 추후에 인공지능 이용시 유저가 직접 체크하지 않음.
   * @param isCorrect : boolean - 번역이 맞았는지 여부
   */
  const handleVerifyText = (isCorrect) => {
    if (isCorrect) {
      // TODO: 번역 확인 기록 등록 (맞음)
      setUserTranslatedTextColor(true);
    } else {
      // TODO: 번역 확인 기록 등록(틀림)
      setUserTranslatedTextColor(false);
    }
  };

  return (
    <LineOuterWrapper>
      {line ? (
        <>
          <LineWrapper>
            <OriginalLine>{line}</OriginalLine>
            <ConvertLine
              value={userTranslatedText}
              onChange={(e) => setUserTranslatedText(e.target.value)}
              disabled={machineTranslatedText}
              style={{
                backgroundColor: userTranslatedTextColor
                  ? "lightgreen"
                  : userTranslatedTextColor === false
                    ? "lightcoral"
                    : "white",
              }}
            ></ConvertLine>
            <MachineTranslatedLine>
              {machineTranslatedText}
            </MachineTranslatedLine>
          </LineWrapper>
          <VerifyBox>
            {machineTranslatedText ? (
              <div>
                올바르게 번역했나요?
                <VerifyZone>
                  <VerifyButton onClick={() => handleVerifyText(true)}>
                    O
                  </VerifyButton>
                  <VerifyButton onClick={() => handleVerifyText(false)}>
                    X
                  </VerifyButton>
                </VerifyZone>
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
