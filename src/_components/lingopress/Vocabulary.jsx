import styled from "@emotion/styled";
import { axiosPrivate } from "../../utils/axiosMethod";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAtom } from "jotai/index";
import { needToRefreshWordAtom } from "../../atom/needToRefresh";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const VocabularyCard = styled.div`
  padding: 0.4rem 0.8rem;
  background-color: #fff;
  border: 0.1rem solid #ccc;
  border-radius: 0.3rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-size: 1rem;
  color: black;
  display: flex;
  justify-content: space-between;

  .text {
    & > div {
      font-weight: bold;
      margin-bottom: 0.5rem;
    }

    & > input {
      font-size: 0.9rem;
      color: #666;
    }

    & > input:focus {
      outline: none;
    }
  }

  margin-top: 1rem;
`;

const VocabularyOuterWrapper = styled.section`
  position: fixed;
  right: 0.5rem;
  width: 15vw;
  padding: 1rem;
  margin-left: 2rem;
  border: 1px solid #ccc;
  border-radius: 0.3rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  overflow-y: scroll;
  max-height: 80vh;

  & > h2 {
    font-size: 1.3rem;
  }

  & > p {
    font-size: 1rem;
  }

  & > p.warning {
    margin-top: 0.4rem;
    color: red;
    font-size: 0.7rem;
  }
`;

const Vocabulary = () => {
  const props = useParams();
  const [wordToLearnList, setWordToLearnList] = useState([]);
  const [needToRefreshWord, setNeedToRefreshWord] = useAtom(
    needToRefreshWordAtom,
  );

  useEffect(() => {
    axiosPrivate({
      method: "get",
      url: `/api/v1/words/need-to-learn/${props.press_id}`,
    }).then((response) => {
      setWordToLearnList(response.data.data);
      setNeedToRefreshWord(false);
    });
  }, [props.press_id]);

  useEffect(() => {
    if (needToRefreshWord) {
      axiosPrivate({
        method: "get",
        url: `/api/v1/words/need-to-learn/${props.press_id}`,
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
        url: `/api/v1/words/${wordId}`,
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
      url: `/api/v1/words/${wordId}`,
    }).then(() => {
      setNeedToRefreshWord(true);
    });
  };

  return (
    <VocabularyOuterWrapper>
      <h2>Vocabulary</h2>
      <br />
      <p>Drag the words to add them to the vocabulary.</p>
      <p className={"warning"}>
        단어 번역기능은 실험 중입니다! <br />
        뜻이 정확하지 않거나 번역되지 않을 수 있어요. <br />
        번역이 잘못된 경우 직접 수정해주세요.
      </p>

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
          <div>
            <FaEdit onClick={() => handleEdit(word.id, word.translatedWord)} />
            <FaTrashAlt onClick={() => handleDelete(word.id)} />
          </div>
        </VocabularyCard>
      ))}
    </VocabularyOuterWrapper>
  );
};

export default Vocabulary;
