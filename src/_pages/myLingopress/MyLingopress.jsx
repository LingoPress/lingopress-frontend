import {useEffect, useState} from "react";
import {axiosPrivate} from "../../utils/axiosMethod";
import styled from "@emotion/styled";
import formatDate from "../../utils/formatDate";
import {useNavigate} from "react-router-dom";
import {useAtomValue} from "jotai/index";
import {authAtom} from "../../atom/user";


const LearnedPressBox = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  margin: 20px;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  background-color: #fafafa;

  &:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  }

  h1 {
    font-size: 24px;
    color: #333;
    margin-bottom: 10px;
  }

  p {
    font-size: 18px;
    color: #666;
    line-height: 1.6;
  }

  .etcWrapper {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  .updatedAt {
    font-size: 0.8rem;
    color: #999;
  }

`

const MyLingopressWrapper = styled.div`
  position: relative;

  .learning-rate {
    text-align: right;
    font-size: 0.8rem;
    color: #666;
    position: absolute;
    right: 20px;
  }

  .learning-rate-desc {
    opacity: 0;
    transition: opacity 0.5s ease-in-out;
  }

  .learning-rate:hover .learning-rate-desc {
    opacity: 1;
    transition: 0.5s ease-in-out;

  }
`


const MyLingopress = () => {
  const authStatus = useAtomValue(authAtom);

  const [isLast, setIsLast] = useState(false);
  const [page, setPage] = useState(0);

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const [myPressList, setMyPressList] = useState([])

  // 페이지 타이틀 변경
  useEffect(() => {
    document.title = "내가 번역한 뉴스들";
    return () => {
      document.title = "Lingopress";
    }
  }, []);


  // 무한 스크롤
  const handleObserver = (entries) => {
    const target = entries[0];
    if (target.isIntersecting && !isLoading && !isLast) {
      setPage((currentPage) => currentPage + 1);
    }
  };


  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      threshold: 0,
    });
    const observerTarget = document.getElementById("observer");
    if (observerTarget) {
      observer.observe(observerTarget);
    }
  }, []);

  useEffect(() => {
    if (!authStatus.is_logged_in) {
      alert("로그인이 필요합니다.");
      navigate("/login");
      return;
    }
    fetchData();
  }, [page]);


  const fetchData = async () => {
    if (isLast) {
      return;
    }

    setIsLoading(true);

    const result = await axiosPrivate({
      url: "/api/v1/press/learned",
      method: "get",
      params: {
        page: page,
      }
    });
    setMyPressList((pressData) => [...pressData, ...result.data.data.content]);
    setIsLast(result.data.data.last);
    setIsLoading(false);
  }

  return (
    <MyLingopressWrapper>
      <br/>
      <h1>내가 번역한 뉴스들</h1>

      <br/>
      <p className="learning-rate">학습률?
        <p className="learning-rate-desc">학습률은 "옳게 번역한 문장 수 / 전체 문장 수" 입니다.</p>
      </p>
      {myPressList.length > 0 && myPressList.map((learnedPress) => (
        <LearnedPressBox key={learnedPress.id} onClick={() => navigate(`/lingopress/${learnedPress.press.id}`)}>
          <h1>{learnedPress.press.title}</h1>
          <p>{learnedPress.press.published_at}</p>
          <div className={"etcWrapper"}>
            <p> 학습률: {(learnedPress.learnedContentLine / learnedPress.press.totalContentLine).toFixed(2) * 100}%</p>
            <p className={"updatedAt"}>최근 학습일 {formatDate(learnedPress.updatedAt)}</p>
          </div>

        </LearnedPressBox>
      ))}
      {isLoading && <p>Loading...</p>}
      <div id="observer" style={{height: "10px"}}></div>

    </MyLingopressWrapper>
  )
}

export default MyLingopress;