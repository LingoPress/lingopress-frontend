import styled from "@emotion/styled";
import { useState } from "react";
import { useAtom, useAtomValue } from "jotai";
import { authAtom } from "../../atom/user";
import { useNavigate, useParams } from "react-router-dom";
import { axiosPrivate } from "../../utils/axiosMethod";
import countWords from "../../utils/wordCount";
import ModalOuterLayer from "../ModalOuterLayer";
import { needToRefreshWordAtom } from "../../atom/needToRefresh";
import { customColors } from "../../styles/color";
import { FaComment } from "react-icons/fa";

const LineWrapper = styled.div`
  //  width: 93%;
  position: relative;
`;

const OriginalLine = styled.p`
  line-height: normal;
  font-size: 2rem;

  &:focus {
    outline: none;
  }
`;

const ConvertLine = styled.textarea`
  border-radius: 1rem;
  padding: 1rem 1.6rem;
  margin-top: 1rem;
  width: ${({ isMobile }) => (isMobile ? "100%" : "95%")};
  box-shadow: 0 0.5rem 0.8rem rgba(0, 0, 0, 0.1);
  font-size: 2rem;
  resize: vertical;
  height: 10rem;
  transition:
    border-color 0.3s ease,
    box-shadow 0.3s ease,
    background-color 0.8s ease;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgb(226, 113, 29);
  }
`;

const LineOuterWrapper = styled.div`
  min-height: 8rem;
  display: flex;
  justify-content: space-between;
  align-items: ${({ isMobile }) => (isMobile ? null : "end")};
  flex-direction: ${({ isMobile }) => (isMobile ? "column" : "row")};
`;

const CheckButton = styled.button`
  width: 7rem;
  margin-top: 0.8rem;
  // width: 3rem;
  // height: 3rem;
  padding: 1rem 1.6rem;

  background-color: ${({ choiceOne }) =>
    choiceOne
      ? customColors.background.button[800]
      : customColors.background.button[100]};

  border-radius: 0.3rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-size: 1.6rem;
  color: white;
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
  box-shadow: 0 0.2rem 0.4rem rgba(0, 0, 0, 0.1);
  font-size: 1.6rem;
`;

const MachineTranslatedLine = styled.p`
  line-height: normal;
  position: relative;
  margin-left: 1rem;
  margin-top: 0.5rem;
  width: 90%;
  font-size: 1.8rem;
`;

const VerifyZone = styled.div`
  display: flex;
`;

const WordSearchModal = styled.div`
  position: fixed;
  top: ${({ coords }) => coords.y - 110}px;
  left: ${({ coords }) => coords.x}px;
  padding: 0.6rem;
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;

  h1 {
    font-size: 1.8rem;
    font-weight: bold;
    margin-bottom: 0.8rem;
  }

  p {
    margin: 0.4rem 0 0;
    color: #333333;
    font-size: 16px;
  }

  button {
    margin-top: 0.8rem;
    padding: 0.6rem 1rem;
    border: none;
    border-radius: 4px;
    background-color: ${customColors.background.button[100]};
    cursor: pointer;
    color: #ffffff;

    &:first-of-type {
      margin-right: 0;
      background-color: #ff0000;

      &:hover {
        background-color: #8d0000;
      }
    }

    margin-left: 0.3rem;
  }

  .close {
    background-color: #007bff;
  }
`;

const VerifyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1.2rem;
  font-size: 1.4rem;
`;

const MemoLineWrapper = styled.div`
  display: flex;
  visibility: ${({ usingMemo }) => (usingMemo ? "visible" : "hidden")};
  opacity: ${({ usingMemo }) => (usingMemo ? 1 : 0)};
  transform: ${({ usingMemo }) =>
    usingMemo ? "translateY(0)" : "translateY(-3rem)"};
  transition:
    visibility 0.3s,
    transform 0.3s,
    opacity 0.3s;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;

  & textarea {
    width: 88%;
    height: 5rem;
    margin-right: 1rem;
    padding: 1rem 1.6rem;
    box-shadow: 0 0.5rem 0.8rem rgba(0, 0, 0, 0.1);
    border-radius: 1rem;
    font-size: 2rem;
    resize: vertical;
    transition:
      border-color 0.3s ease,
      box-shadow 0.3s ease;

    &:focus {
      outline: none;
      box-shadow: 0 0.5rem 0.8rem rgba(0, 0, 0, 0.6);
    }
  }

  .memo_button {
    width: 10rem;
    padding: 1rem 1.6rem;
    background-color: ${customColors.background.button[0]};
    border-radius: 0.3rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    font-size: 1.6rem;
    color: black;
  }
`;

const PerLineComponentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 8rem;
`;

const PerLineComponent = ({
  originalContent,
  translatedContent,
  lineNumber,
  userTranslatedContent,
  isCorrect,
  memo,
  isMobile,
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

  // 구분자가 제거된 원문
  const originalContentWithoutSeparator = originalContent.replace("\n", "");

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
      url: "/v1/press/translate",
      data: requestData,
    }).catch((err) => {
      console.log("@@@ error: ", err.response);
    });
  };

  // 단어 검색 모달
  const [showModal, setShowModal] = useState(false);
  const [selectedText, setSelectedText] = useState("");
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [wordMeaning, setWordMeaning] = useState("단어장에 등록하고 뜻 보기");
  const [needToRefreshWord, setNeedToRefreshWord] = useAtom(
    needToRefreshWordAtom,
  );
  const handleMouseUp = (e) => {
    const text = window.getSelection().toString().trim();
    if (text.length > 0) {
      if (selectedText !== text) {
        setWordMeaning("단어장에 등록하고 뜻 보기");
      }

      setSelectedText(text);
      setShowModal(true);
      setCoords({ x: e.clientX, y: e.clientY });
    } else {
      handleCloseModal();
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setWordMeaning("단어장에 등록하고 뜻 보기");
  };

  // edge의 미니 메뉴 기능 끄기.
  window.addEventListener("mouseup", function (event) {
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

    if (countWords(selectedText) > 4) {
      alert("4단어 이상 선택할 수 없습니다.");
      handleCloseModal();
      return;
    }
    // 모르는 단어 등록. 이때 단어,문장, 문장 라인 번호, 뉴스 번호 등이 기록되어야함.
    axiosPrivate({
      method: "post",
      url: "/v1/words/need-to-learn",
      data: {
        word: selectedText,
        originalText: originalContentWithoutSeparator,
        translatedText: translatedContent,
        lineNumber: lineNumber,
        pressId: props.press_id,
      },
    })
      .then((res) => {
        setWordMeaning(res.data.data.translatedWord);
        setNeedToRefreshWord(true);
      })
      .catch((err) => {});
  };

  // 원문 편집 기능

  const addBracketsToSelection = () => {
    if (!window.getSelection) return;

    const selection = window.getSelection();
    // 사용자가 텍스트를 실제로 선택했는지 확인
    if (!selection.rangeCount || selection.isCollapsed) return;

    const range = selection.getRangeAt(0);
    const selectedText = range.toString();
    const trimmedText = selectedText.trim(); // 선택한 텍스트에서 양쪽 공백 제거

    // 원래 선택된 텍스트의 시작과 끝에 있는 공백을 계산
    const leadingSpaces = selectedText.match(/^\s*/)[0];
    const trailingSpaces = selectedText.match(/\s*$/)[0];

    // 괄호를 추가한 텍스트 생성
    const bracketedText = `${leadingSpaces}(${trimmedText})${trailingSpaces}`;

    range.deleteContents();

    const textNode = document.createTextNode(bracketedText);
    range.insertNode(textNode);

    // Move the cursor after the inserted text
    range.setStartAfter(textNode);
    range.collapse(true);

    // Deselect the text
    window.getSelection().removeAllRanges();
    setShowModal(false);
  };

  const addSquareBracketsToSelection = () => {
    if (!window.getSelection) return;

    const selection = window.getSelection();
    // 사용자가 텍스트를 실제로 선택했는지 확인
    if (!selection.rangeCount || selection.isCollapsed) return;

    const range = selection.getRangeAt(0);
    const selectedText = range.toString();
    const trimmedText = selectedText.trim(); // 선택한 텍스트에서 양쪽 공백 제거

    // 원래 선택된 텍스트의 시작과 끝에 있는 공백을 계산
    const leadingSpaces = selectedText.match(/^\s*/)[0];
    const trailingSpaces = selectedText.match(/\s*$/)[0];

    // 괄호를 추가한 텍스트 생성
    const bracketedText = `${leadingSpaces}[${trimmedText}]${trailingSpaces}`;

    range.deleteContents();

    const textNode = document.createTextNode(bracketedText);
    range.insertNode(textNode);

    // Move the cursor after the inserted text
    range.setStartAfter(textNode);
    range.collapse(true);

    // Deselect the text
    window.getSelection().removeAllRanges();
    setShowModal(false);
  };

  function insertSlashAtSelection() {
    if (!window.getSelection) return;

    const selection = window.getSelection();
    // 사용자가 텍스트를 실제로 선택했는지 확인
    if (!selection.rangeCount || selection.isCollapsed) return;

    const range = selection.getRangeAt(0);
    const selectedText = range.toString();
    const trimmedText = selectedText.trim(); // 선택한 텍스트에서 양쪽 공백 제거

    // 원래 선택된 텍스트의 시작과 끝에 있는 공백을 계산
    const leadingSpaces = selectedText.match(/^\s*/)[0];
    const trailingSpaces = selectedText.match(/\s*$/)[0];

    // 괄호를 추가한 텍스트 생성
    const bracketedText = `${leadingSpaces}${trimmedText} /${trailingSpaces}`;

    range.deleteContents();

    const textNode = document.createTextNode(bracketedText);
    range.insertNode(textNode);

    // Move the cursor after the inserted text
    range.setStartAfter(textNode);
    range.collapse(true);

    // Deselect the text
    window.getSelection().removeAllRanges();
    setShowModal(false);
  }

  // 메모 기능
  const [usingMemo, setUsingMemo] = useState(memo);
  const [memoText, setMemoText] = useState(memo);
  const handleMemo = () => {
    axiosPrivate({
      method: "post",
      url: "/v1/press/memo",
      data: {
        pressId: props.press_id,
        contentLineNumber: lineNumber,
        memo: memoText,
      },
    })
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
  };

  // 단어 선택 모달 기능

  // 문장을 단어 단위로 파싱하는 함수
  const parseSentence = (sentence) => {
    return sentence.split(" ");
  };

  // 단어를 클릭했을 때 호출되는 이벤트 핸들러
  const handleWordClick = (e, text) => {
    e.stopPropagation(); // 이벤트 전파 중지
    if (text.length > 0) {
      if (selectedText !== text) {
        setWordMeaning("단어장에 등록하고 뜻 보기");
      }
      setSelectedText(text);
      setShowModal(true);
      setCoords({ x: e.clientX, y: e.clientY });
    } else {
      handleCloseModal();
    }
  };

  return (
    <PerLineComponentWrapper>
      <LineOuterWrapper isMobile={isMobile}>
        {originalContent ? (
          <>
            <LineWrapper>
              {showModal && (
                <>
                  <ModalOuterLayer handleCloseModal={handleCloseModal} />
                  <WordSearchModal coords={coords}>
                    <h1>{selectedText}</h1>
                    <p>{wordMeaning}</p>
                    <button onClick={handleMyWord}>O</button>
                    <button onClick={handleCloseModal} className={"close"}>
                      X
                    </button>
                    {!isMobile ? (
                      <>
                        <button onClick={addBracketsToSelection}>()</button>
                        <button onClick={addSquareBracketsToSelection}>
                          []
                        </button>
                        <button onClick={insertSlashAtSelection}>/</button>
                      </>
                    ) : null}
                  </WordSearchModal>
                </>
              )}
              <OriginalLine id={"editableText"}>
                {parseSentence(originalContentWithoutSeparator).map(
                  (word, index) => (
                    <span
                      key={index}
                      onMouseUp={handleMouseUp}
                      onClickCapture={(e) => {
                        isMobile && handleWordClick(e, word);
                      }}
                    >
                      {word}{" "}
                    </span>
                  ),
                )}
                <FaComment
                  style={{
                    marginLeft: "1rem",
                    cursor: "pointer",
                    transition: "color 0.3s ease-in-out",
                  }}
                  size={25}
                  color={
                    usingMemo
                      ? customColors.background.button["100"]
                      : customColors.background.button["800"]
                  }
                  onClick={() => setUsingMemo(!usingMemo)}
                />
              </OriginalLine>
              <ConvertLine
                isMobile={isMobile}
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
            </LineWrapper>
            <VerifyBox>
              {machineTranslatedText && !choiceOne ? (
                <VerifyWrapper>
                  올바르게 <br />
                  번역했나요?
                  <VerifyZone>
                    <VerifyButton onClick={() => handleVerifyText(true)}>
                      O
                    </VerifyButton>
                    <VerifyButton onClick={() => handleVerifyText(false)}>
                      X
                    </VerifyButton>
                  </VerifyZone>
                </VerifyWrapper>
              ) : (
                <CheckButton
                  choiceOne={choiceOne}
                  type={"button"}
                  onClick={() => handleTranslate()}
                >
                  확인
                  <br />
                  하기
                </CheckButton>
              )}
            </VerifyBox>
          </>
        ) : null}
      </LineOuterWrapper>
      <MachineTranslatedLine>{machineTranslatedText}</MachineTranslatedLine>

      <MemoLineWrapper usingMemo={usingMemo}>
        <textarea
          value={memoText}
          onChange={(e) => setMemoText(e.target.value)}
          placeholder={"메모장"}
        />
        <button className={"memo_button"} onClick={() => handleMemo()}>
          메모하기
        </button>
      </MemoLineWrapper>

      {originalContent.indexOf("\n") !== -1 ? (
        <>
          <br />
          <br />
          <hr />
        </>
      ) : null}
    </PerLineComponentWrapper>
  );
};
export default PerLineComponent;
