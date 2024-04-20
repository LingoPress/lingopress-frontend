import styled from "@emotion/styled";
import { customColors } from "../../styles/color";
import VerticalCard from "../../_components/common/VerticalCard";
import { useNavigate } from "react-router-dom";
import NewNews from "../../assets/new_news.gif";
import WordSearch from "../../assets/word_search.gif";
import NewsDetail from "../../assets/news_detail.gif";
import InsertSymbol from "../../assets/insert_symbol.gif";

const HeaderWrapper = styled.div`
  align-content: center;
  align-items: end;
  background-color: ${customColors.background.subBg["100"]};
  display: flex;
  flex: none;
  flex-direction: row;
  flex-wrap: wrap;
  height: 10rem;
  justify-content: center;
  overflow: hidden;
  padding: 10rem 0;
  position: relative;
  width: 100%;
  color: ${customColors.text.explain["900"]};

  & p {
    font-size: 6rem;
    text-align: left;
    font-family: "Margarine", sans-serif;
    line-height: 7rem;
  }
`;

const DiveInWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 10rem;

  & p {
    color: ${customColors.text.subTitle["700"]};
    font-size: 2rem;
    text-align: center;
    line-height: 3rem;
  }

  & button {
    background-color: ${customColors.background.button};
  }

  #Dive {
    font-family: "Margarine", sans-serif;
    font-weight: 700;
    font-size: 4.8rem;
    margin-bottom: 4rem;
  }

  & button {
    padding: 1.2rem 2.4rem;
    border-radius: 0.6rem;
    font-size: 1.6rem;
    color: white;
    background-color: ${customColors.background.button["300"]};
    border: none;
    cursor: pointer;
    margin-top: 6rem;
    font-family: "Space Mono", sans-serif;
  }
`;
const ExplainWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin: 10rem 7rem;
  gap: 5rem;

  & h2 {
    font-size: 3.2rem;
    font-weight: 700;
    color: ${customColors.text.title["900"]};
  }

  & p {
    font-size: 1.6rem;
    color: ${customColors.text.explain["500"]};
    text-align: center;
    margin-top: 2rem;
  }
`;

const LandingPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const OurPromiseWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 10rem;
  margin-bottom: 10rem;

  & p {
    color: ${customColors.text.title["900"]};
  }

  #promise {
    font-family: "Space Mono", sans-serif;

    font-size: 2rem;
    margin-bottom: 5rem;
    text-align: left;
  }

  #explain {
    font-family: "Margarine", sans-serif;
    font-size: 7rem;
  }
`;

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <LandingPageWrapper>
      <HeaderWrapper>
        <div>
          <p>
            Dive into the multi-language <br />
            news ocean.
          </p>
        </div>
      </HeaderWrapper>

      <ExplainWrapper>
        <VerticalCard
          title={
            "단어를 선택해서 간편하게 뜻을 확인하고\n내 단어장에 바로 넣어보세요!"
          }
          description={
            "CHAT GPT가 선택한 단어를 '문장에 적절한 뜻'으로 알려줍니다!"
          }
          image={WordSearch}
        />{" "}
        <VerticalCard
          title={
            "내가 번역한 문장과 인공지능이 번역해준 문장을\n비교하면서 학습하세요!"
          }
          description={
            "추후 인공지능이 번역 정확도도 판단해주도록 준비중이에요."
          }
          image={NewsDetail}
        />{" "}
        <VerticalCard
          title={"문장을 해석할 때 기호를 넣어\n문장을 해석해보세요!"}
          description={"필요한 곳 적재적소에 기호를 넣어보세요."}
          image={InsertSymbol}
        />{" "}
        <VerticalCard
          title={
            "다양한 언어를 학습하세요!\n여러 나라의 뉴스를 매일매일 업데이트해요!"
          }
          description={"곧 다양한 언어 서비스가 출시됩니다!!"}
          image={NewNews}
        />
      </ExplainWrapper>
      <DiveInWrapper>
        <p id={"Dive"}>Dive in</p>
        <p>
          여러 뉴스들과 함께 공부할 준비가 되셨나요?
          <br />
          아래 버튼을 눌러 여러분들을 기다리고 있는 수많은 뉴스들을 만나보세요!
        </p>
        <button onClick={() => navigate("/")}>Explore Now</button>
      </DiveInWrapper>

      <OurPromiseWrapper>
        <p id={"promise"}>Our promise</p>
        <p id={"explain"}>
          Study with news to <br />
          get more familiar with
          <br /> learning another language.
        </p>
      </OurPromiseWrapper>
    </LandingPageWrapper>
  );
};

export default LandingPage;
