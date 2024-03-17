import styled from "@emotion/styled";

const VocabularyCard = styled.div`
  padding: 0.4rem 0.8rem;
  background-color: #fff;
  border: 0.1rem solid #ccc;
  border-radius: 0.3rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-size: 1rem;
  color: black;

  & > div:nth-of-type(1) {
    font-weight: bold;
    margin-bottom: 0.5rem;
  }

  & > div:nth-of-type(2) {
    font-size: 0.9rem;
    color: #666;
  }

  margin-top: 1rem;
`;

const VocabularyOuterWrapper = styled.section`
  position: fixed;
  right: .5rem;
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
    margin-top: .4rem;
    color: red;
    font-size: 0.7rem;
  }
`;

const Vocabulary = () => {
  return (
    <VocabularyOuterWrapper>
      <h2>Vocabulary</h2>
      <br/>
      <p>Drag the words to add them to the vocabulary.</p>
      <p className={"warning"}>단어 번역기능은 실험 중입니다! <br/>뜻이 정확하지 않거나 번역되지 않을 수 있어요.</p>

      {dummyWord.map((word) => (
        <VocabularyCard key={word.id}>
          <div>{word.word}</div>
          <div>{word.meaning}</div>
        </VocabularyCard>
      ))}
    </VocabularyOuterWrapper>
  );
}

export default Vocabulary;


const dummyWord = [
  {
    id: 1,
    word: "apple",
    meaning: "사과"
  },
  {
    id: 2,
    word: "tower",
    meaning: "솟아있다."
  },
  {
    id: 3,
    word: "computer",
    meaning: "컴퓨터"
  }
]