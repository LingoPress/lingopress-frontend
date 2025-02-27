import styled from "@emotion/styled";
import { axiosPrivate } from "../../utils/axiosMethod";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAtom } from "jotai/index";
import { needToRefreshWordAtom } from "../../atom/needToRefresh";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const VocabularyCard = styled.div`
  position: relative;
  padding: 0.8rem 1.2rem;
  background-color: #fff;
  border: 0.1rem solid #ccc;
  border-radius: 0.3rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-size: 1.6rem;
  color: black;
  display: flex;
  justify-content: space-between;

  .text {
    width: 80%;

    & > div {
      font-weight: bold;
      margin-bottom: 0.5rem;
    }

    & > input {
      font-size: 1.5rem;
      color: #666;
      width: 80%;
    }

    & > input:focus {
      outline: none;
    }
  }

  & > .editBox {
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: center;

    & svg {
      cursor: pointer;
      margin: 0.2rem;
    }
  }

  margin-top: 1rem;
`;

const VocabularyOuterWrapper = styled.section`
  display: ${(props) => (props.isMobile ? "none" : "block")};
  margin-top: 3rem;
  position: fixed;
  right: ${(props) => (props.isMobile ? null : "0.5rem")};
  bottom: ${(props) => (props.isMobile ? "2rem" : null)};
  width: ${(props) => (props.isMobile ? "95vw" : "18vw")};
  left: ${(props) => (props.isMobile ? "50%" : null)};
  transform: ${(props) => (props.isMobile ? "translate(-50%, 0)" : null)};
  padding: 1.4rem;
  border: 1px solid #ccc;
  border-radius: 1rem;
  box-shadow: 0 5px 8px rgba(0, 0, 0, 0.3);
  background-color: #fff;
  overflow-y: scroll;
  max-height: ${(props) => (props.isMobile ? "35vh" : "80vh")};
  z-index: 100;

  & > h2 {
    font-size: 2rem;
  }

  & > p {
    font-size: 1.6rem;
  }

  & > p.warning {
    margin-top: 0.4rem;
    color: red;
    font-size: 1.3rem;
  }
`;

const Vocabulary = ({ isMobile }) => {
  const props = useParams();
  const [wordToLearnList, setWordToLearnList] = useState([]);
  const [needToRefreshWord, setNeedToRefreshWord] = useAtom(
    needToRefreshWordAtom,
  );

  const { t } = useTranslation();

  useEffect(() => {
    axiosPrivate({
      method: "get",
      url: `/v1/words/need-to-learn/${props.press_id}`,
    }).then((response) => {
      setWordToLearnList(response.data.data);
      setNeedToRefreshWord(false);
    });
  }, [props.press_id]);

  useEffect(() => {
    if (needToRefreshWord) {
      axiosPrivate({
        method: "get",
        url: `/v1/words/need-to-learn/${props.press_id}`,
      }).then((response) => {
        setWordToLearnList(response.data.data);
        setNeedToRefreshWord(false);
      });
    }
  }, [needToRefreshWord]);

  const handleEdit = (wordId, word) => {
    if (word) {
      axiosPrivate({
        method: "put",
        url: `/v1/words/${wordId}`,
        data: {
          word,
        },
      }).then(() => {
        setNeedToRefreshWord(true);
      });
    }
  };

  const handleDelete = (wordId) => {
    axiosPrivate({
      method: "delete",
      url: `/v1/words/${wordId}`,
    }).then(() => {
      setNeedToRefreshWord(true);
    });
  };

  return (
    <VocabularyOuterWrapper isMobile={isMobile}>
      <h2>Vocabulary</h2>
      <br />
      <p>Drag the words to add them to the vocabulary.</p>
      <p className={"warning"}>{t("press.vocabulary_warning")}</p>

      {wordToLearnList.map((word) => (
        <VocabularyCard key={word.id}>
          <div className={"text"}>
            <div>{word.word}</div>
            <input
              type="text"
              value={word.translatedWord}
              onChange={(e) => {
                const newWordToLearnList = wordToLearnList.map((item) => {
                  if (item.id === word.id) {
                    return {
                      ...item,
                      translatedWord: e.target.value,
                    };
                  }
                  return item;
                });
                setWordToLearnList(newWordToLearnList);
              }}
            />
          </div>
          <div className="editBox">
            <FaEdit onClick={() => handleEdit(word.id, word.translatedWord)} />
            <FaTrashAlt onClick={() => handleDelete(word.id)} />
          </div>
        </VocabularyCard>
      ))}
    </VocabularyOuterWrapper>
  );
};

export default Vocabulary;
