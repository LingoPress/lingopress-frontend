import styled from "@emotion/styled";
import {useState} from "react";
import {useAtomValue} from "jotai";
import {authAtom} from "../../atom/user";
import {useNavigate, useParams} from "react-router-dom";
import {axiosPrivate} from "../../utils/axiosMethod";
import countWords from "../../utils/wordCount";
import ModalOuterLayer from "../ModalOuterLayer";

const LineWrapper = styled.div`
  width: 90%;
`;

const OriginalLine = styled.p`
  line-height: normal;
`;

const ConvertLine = styled.textarea`
  border-radius: 0.5rem;
  padding: 0.7rem 1rem;
  margin-top: 1rem;
  width: 90%;
  border: 1px solid #ccc;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-size: 1rem;
  resize: none;
  height: 2.4rem;
  transition: border-color 0.3s ease,
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
  margin-bottom: 5rem;
`;

const CheckButton = styled.button`
  // width: 3rem;
  // height: 3rem;
  padding: 0.4rem 0.8rem;

  background-color: #fff;
  border: 0.1rem solid #ccc;
  border-radius: 0.3rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-size: 1rem;
  color: black;
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
  margin-top: 0.5rem;
  width: 90%;
`;

const VerifyZone = styled.div`
  display: flex;
  margin-bottom: 1rem;
`;

const WordSearchModal = styled.div`
  position: fixed;
  top: ${({coords}) => coords.y - 110}px;
  left: ${({coords}) => coords.x}px;
  padding: .6rem;
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;

  p {
    margin: .4rem 0 0;
    color: #333333;
    font-size: 16px;
  }

  button {
    margin-top: .5rem;
    padding: .3rem .5rem;
    border: none;
    border-radius: 4px;
    background-color: #007bff;
    color: white;
    cursor: pointer;

    &:first-of-type {
      margin-right: 8px;
      background-color: #ff0000;

      &:hover {
        background-color: #8d0000;
      }
    }


  }
`;
const PerLineComponent = ({
                            originalContent,
                            translatedContent,
                            lineNumber,
                            userTranslatedContent,
                            isCorrect,
                          }) => {
  const navigate = useNavigate();
  const props = useParams();
  const [machineTranslatedText, setMachineTranslatedText] = useState("");
  const [userTranslatedText, setUserTranslatedText] = useState(
    userTranslatedContent,
  );
  const [choiceOne, setChoiceOne] = useState(false);
  const [isUserTranslatedText, setIsUserTranslatedText] = useState(isCorrect);
  const authStatus = useAtomValue(authAtom);
  const handleTranslate = () => {
    if (authStatus.is_logged_in === false) {
      alert("로그인 후 이용해주세요");
      navigate("/login");
    }
    // 텍스트 입력 여부 확인
    else if (userTranslatedText === "") {
      alert("텍스트를 입력해주세요.");
      return;
    }
    // 번역 확인 문구 출력
    setMachineTranslatedText(translatedContent);
  };

  /**
   * 번역 확인.
   * 추후에 인공지능 이용시 유저가 직접 체크하지 않음.
   * @param isCorrect : boolean - 번역이 맞았는지 여부
   */
  const handleVerifyText = (isCorrect) => {
    if (isCorrect) {
      // TODO: 번역 확인 기록 등록 (맞음)
      setIsUserTranslatedText(true);
    } else {
      // TODO: 번역 확인 기록 등록(틀림)
      setIsUserTranslatedText(false);
    }
    setChoiceOne(true);

    const requestData = {
      pressId: props.press_id,
      isCorrect: isCorrect,
      contentLineNumber: lineNumber,
      translateText: userTranslatedText,
    };

    axiosPrivate({
      method: "post",
      url: "/api/v1/press/translate",
      data: requestData,
    }).catch((err) => {
      console.log("@@@ error: ", err.response);
    });
  };

  // 단어 검색 모달
  const [showModal, setShowModal] = useState(false);
  const [selectedText, setSelectedText] = useState('');
  const [coords, setCoords] = useState({x: 0, y: 0});
  const [wordMeaning, setWordMeaning] = useState('단어장에 등록하고 뜻 보기');

  const handleMouseUp = (e) => {
    const text = window.getSelection().toString().trim();
    if (text.length > 0) {
      if (selectedText !== text) {
        setWordMeaning('단어장에 등록하고 뜻 보기');
      }
      if (countWords(text) > 4) {
        alert("4단어 이상 선택할 수 없습니다.");
        handleCloseModal();
        return;
      }

      setSelectedText(text);
      setShowModal(true);
      setCoords({x: e.clientX, y: e.clientY});

    } else {
      handleCloseModal();
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setWordMeaning('단어장에 등록하고 뜻 보기')
  };

  // edge의 미니 메뉴 기능 끄기.
  window.addEventListener('mouseup', function (event) {
    // if (window.navigator.userAgent.includes('Edg/')) {
    event.preventDefault();
    // }
  });


  const handleMyWord = () => {
    if (authStatus.is_logged_in === false) {
      alert("로그인 후 이용해주세요");
      navigate("/login");
    }
    // 텍스트 입력 여부 확인
    else if (selectedText === "" || selectedText === " ") {
      alert("텍스트를 입력해주세요.");
      return;
    }
    // 모르는 단어 등록. 이때 단어,문장, 문장 라인 번호, 뉴스 번호 등이 기록되어야함.

    axiosPrivate({
      method: "post",
      url: "/api/v1/words/need-to-learn",
      data: {
        word: selectedText,
        originalText: originalContent,
        lineNumber: lineNumber,
        pressId: props.press_id,
      },
    }).then((res) => {
      setWordMeaning(res.data.data.translatedWord);
    }).catch((err) => {
    })


  }
  return (
    <LineOuterWrapper>
      {originalContent ? (
        <>
          <LineWrapper>
            {showModal && (
              <>
                <ModalOuterLayer handleCloseModal={handleCloseModal}/>
                <WordSearchModal coords={coords}>
                  <h1>{selectedText}</h1>
                  <p>{wordMeaning}</p>
                  <button onClick={handleMyWord}>O</button>
                  <button onClick={handleCloseModal}>X</button>
                </WordSearchModal>
              </>
            )}
            <OriginalLine onMouseUp={handleMouseUp}>{originalContent}</OriginalLine>
            <ConvertLine
              value={userTranslatedText}
              onChange={(e) => setUserTranslatedText(e.target.value)}
              disabled={machineTranslatedText}
              style={{
                backgroundColor: isUserTranslatedText
                  ? "lightgreen"
                  : isUserTranslatedText === false
                    ? "lightcoral"
                    : "white",
              }}
            ></ConvertLine>
            <MachineTranslatedLine>
              {machineTranslatedText}
            </MachineTranslatedLine>
          </LineWrapper>
          <VerifyBox>
            {machineTranslatedText && !choiceOne ? (
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

            <CheckButton type={"button"} onClick={() => handleTranslate()}>
              확인<br/>하기
            </CheckButton>
          </VerifyBox>
        </>
      ) : null}
    </LineOuterWrapper>
  );
};
export default PerLineComponent;
