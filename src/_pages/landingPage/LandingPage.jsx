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
  background: #0f172a;
  display: flex;
  flex: none;
  flex-direction: row;
  flex-wrap: wrap;
  min-height: ${(props) => (props.isMobile ? "28rem" : "42rem")};
  justify-content: center;
  overflow: hidden;
  padding: 8rem 2rem;
  position: relative;
  width: 100%;
  color: ${customColors.text.explain["900"]};

  & p {
    font-size: ${(props) => (props.isMobile ? "3.2rem" : "6rem")};
    text-align: center;
    font-weight: 900;
    line-height: 1.2;
  }
`;

const DiveInWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 10rem;

  & p {
    color: ${customColors.text.subTitle["200"]};
    font-size: 1.7rem;
    text-align: center;
    line-height: 1.7;
  }

  #Dive {
    font-family: "Margarine", sans-serif;
    font-weight: 700;
    font-size: 4rem;
    margin-bottom: 2rem;
    color: ${customColors.text.title[900]};
  }

  & button {
    padding: 1.2rem 2.6rem;
    border-radius: 999px;
    font-size: 1.6rem;
    color: white;
    background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
    border: none;
    cursor: pointer;
    margin-top: 3rem;
    font-family: "Space Mono", sans-serif;
    font-weight: 900;
    box-shadow: 0 1rem 2.2rem rgba(37, 99, 235, 0.24);
    transition:
      box-shadow 0.2s ease,
      filter 0.2s ease,
      transform 0.2s ease;

    &:hover {
      filter: brightness(0.98);
      box-shadow: 0 1.3rem 2.8rem rgba(37, 99, 235, 0.32);
      transform: translateY(-1px);
    }
  }
`;
const ExplainWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(28rem, 1fr));
  align-items: center;
  justify-content: center;
  width: min(118rem, calc(100% - 4rem));
  margin: 7rem auto;
  gap: 2.4rem;

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
          title={"인공지능이 판단하는 번역 정확도"}
          description={
            "인공지능이 번역해준 문장과 \n내가 번역한 문장을 비교하면서 학습하기"
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
