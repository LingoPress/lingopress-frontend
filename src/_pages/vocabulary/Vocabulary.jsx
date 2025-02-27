import { useEffect, useState } from "react";
import { axiosPrivate } from "../../utils/axiosMethod";
import { useAtomValue } from "jotai/index";
import { authAtom } from "../../atom/user";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import { useTranslation } from "react-i18next";

const MyWordBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  margin: 2rem;
  padding: 2rem;
  border-radius: 1.5rem;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  background-color: #fafafa;
  position: relative;

  .영단어:hover + .뜻 {
    opacity: 1;
    transition: opacity 0.5s ease-in-out;
    font-size: 2rem;
    color: #666;
  }

  .영단어 {
    font-size: 2.4rem;
    color: #333;
    margin-bottom: 0.5rem;
  }

  .뜻 {
    opacity: 0;
    font-size: 2rem;
    margin-bottom: 10px;
  }

  .원문 {
    font-size: 1.8rem;
    color: #666;
    line-height: 1.3;
  }

  .학습유무 {
    font-size: 1.6rem;
    color: #999;
    margin-top: 2rem;
  }

  .뉴스보러가기 {
    font-size: 1.4rem;
    color: #999;
    cursor: pointer;
    position: absolute;
    right: 20px;
    top: 20px;
  }
`;

const VocabularyWrapper = styled.div`
  .desc {
    font-size: 1.6rem;
    color: #666;
    text-align: right;
  }
`;

const MyWordsWrapper = styled.div`
  position: relative;
  //display: grid;
  //grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
  display: flex;
  flex-direction: column;
`;

const Vocabulary = () => {
  const authStatus = useAtomValue(authAtom);
  const navigate = useNavigate();
  const [myWords, setMyWords] = useState([]);
  const { t } = useTranslation();
  useEffect(() => {
    document.title = "단어장";
    return () => {
      document.title = "Lingopress";
    };
  }, []);

  useEffect(() => {
    if (!authStatus.is_logged_in) {
      alert("로그인이 필요합니다.");
      navigate("/login");
      return;
    }
    fetchData();
  }, []);

  const fetchData = async () => {
    const result = await axiosPrivate.get(`/v1/words/need-to-learn`);
    setMyWords(result.data.data);
  };

  return (
    <VocabularyWrapper>
      <br />
      <br />
      <p className={"desc"}>
        영단어 위에 커서를 올리면 뜻을 확인하세요.
        <br />뜻 수정은 미니 단어장에서 할 수 있어요.
      </p>

      <MyWordsWrapper>
        {myWords.map((word) => (
          <MyWordBox key={word.id}>
            <h1 className={"영단어"}>{word.word}</h1>
            <p className={"뜻"}>{word.translatedWord}</p>
            <p className={"원문"}>
              {t("vocabulary.original sentence")}: {word.originalLineText}
            </p>
            {/* <p className={"학습유무"}>
              학습 유무: {word.isLearned ? "O" : "X"}{" "}
            </p> */}
            <p
              className={"뉴스보러가기"}
              onClick={() => navigate(`/lingopress/${word.pressId}`)}
            >
              {t("vocabulary.Go to the news")}
            </p>
          </MyWordBox>
        ))}
      </MyWordsWrapper>
    </VocabularyWrapper>
  );
};

export default Vocabulary;
