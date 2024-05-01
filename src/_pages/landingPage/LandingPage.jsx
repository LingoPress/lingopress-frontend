import styled from "@emotion/styled";
import { customColors } from "../../styles/color";
import VerticalCard from "../../_components/common/VerticalCard";
import { useNavigate } from "react-router-dom";
import NewNews from "../../assets/new_news.gif";
import WordSearch from "../../assets/word_search.gif";
import NewsDetail from "../../assets/news_detail.gif";
import InsertSymbol from "../../assets/insert_symbol.gif";
import Memo from "../../assets/memo.gif";
import { useMediaQuery } from "react-responsive";

const HeaderWrapper = styled.div`
  align-content: center;
  align-items: end;
  background-color: ${customColors.background.subBg["100"]};
  display: flex;
  flex: none;
  flex-direction: row;
  flex-wrap: wrap;
  height: ${(props) => (props.isMobile ? "20rem" : "35rem")};
  justify-content: center;
  overflow: hidden;
  padding: 10rem 0;
  position: relative;
  width: 100%;
  color: ${customColors.text.explain["900"]};

  & p {
    font-size: ${(props) => (props.isMobile ? "3rem" : "6.4rem")};
    text-align: center;
    font-weight: 700;
    // font-family: "Margarine", sans-serif;
    line-height: 1.4;
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

const LandingPage = () => {
  const isMobile = useMediaQuery({ query: "(max-width:768px)" });

  const navigate = useNavigate();
  return (
    <LandingPageWrapper>
      <HeaderWrapper isMobile={isMobile}>
        <div>
          <p>
            <span
              style={{
                fontFamily: "Margarine",
              }}
            >
              LingoPress
            </span>
            와 함께
            <br />
            <span
              style={{
                fontFamily: "Margarine",
              }}
            >
              news
            </span>
            로 재밌게
          </p>
        </div>
      </HeaderWrapper>

      <ExplainWrapper>
        <VerticalCard
          title={"선택해서 뜻을 확인하고 바로 내 단어장에"}
          description={
            "CHAT GPT가 선택한 단어를\n'문장에 적절한 뜻'으로 알려줍니다."
          }
          image={WordSearch}
        />{" "}
        <VerticalCard
          title={
            "인공지능이 번역해준 문장과 \n내가 번역한 문장을 비교하면서 학습하기"
          }
          description={
            "추후 인공지능이 번역 정확도도\n판단해주도록 준비중이에요."
          }
          image={NewsDetail}
        />{" "}
        <VerticalCard
          title={"해석할 때 기호 넣기"}
          description={"필요한 곳 어디든 기호를 넣어보세요."}
          image={InsertSymbol}
        />{" "}
        <VerticalCard
          title={"문장별 메모장과 함께"}
          description={
            "모르는 문법이나 기억할 만한 것들을 \n바로바로 메모하세요."
          }
          image={Memo}
        />
        <VerticalCard
          title={"여러 나라의 수많은 뉴스가 \n매일매일 업데이트!"}
          description={"곧 다양한 언어 서비스가 출시됩니다."}
          image={NewNews}
        />
      </ExplainWrapper>
      <DiveInWrapper>
        <p id={"Dive"}>Dive in</p>
        <p>
          여러 뉴스들과 함께 공부할 준비가 되셨나요?
          <br />
          아래 버튼을 눌러 여러분들을 기다리고 있는 <br />
          수많은 뉴스들을 만나보세요!
        </p>
        <button onClick={() => navigate("/")}>Explore Now</button>
      </DiveInWrapper>
    </LandingPageWrapper>
  );
};

export default LandingPage;
