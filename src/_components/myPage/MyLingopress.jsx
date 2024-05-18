import { useEffect, useState } from "react";
import { axiosPrivate } from "../../utils/axiosMethod";
import styled from "@emotion/styled";
import formatDate from "../../utils/formatDate";
import { useNavigate } from "react-router-dom";
import { useAtomValue } from "jotai/index";
import { authAtom } from "../../atom/user";
import HeatMapComponent from "./HeatMapComponent";
import { useTranslation } from "react-i18next";

const LearnedPressBox = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  margin: 2rem 0;
  padding: 2rem;
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
    font-size: 1.5rem;
    color: #999;
  }
`;

const MyLingopressWrapper = styled.div`
  position: relative;
  padding: 0 2rem;
  // width: 80rem;
  width: 100%;

  .learning-rate {
    text-align: right;
    font-size: 1.4rem;
    color: #666;
    position: absolute;
    right: 2rem;
  }

  .learning-rate-desc {
    opacity: 0;
    transition: opacity 0.5s ease-in-out;
  }

  .learning-rate:hover .learning-rate-desc {
    opacity: 1;
    transition: 0.5s ease-in-out;
  }
`;

const MyLingopress = () => {
  const authStatus = useAtomValue(authAtom);

  const [isLast, setIsLast] = useState(false);
  const [page, setPage] = useState(0);

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const [myPressList, setMyPressList] = useState([]);

  const { t } = useTranslation();

  // 페이지 타이틀 변경
  useEffect(() => {
    document.title = "내가 번역한 뉴스들";
    return () => {
      document.title = "Lingopress";
    };
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
    if (!localStorage.getItem("token")) {
      alert("로그인이 필요합니다.");
      navigate("/login");
      return;
    }
    fetchData();
  }, []);

  const fetchData = async () => {
    if (isLast) {
      return;
    }

    setIsLoading(true);

    const result = await axiosPrivate({
      url: "/v1/press/learned",
      method: "get",
      params: {
        page: page,
      },
    });
    setMyPressList((pressData) => [...pressData, ...result.data.data.content]);
    setIsLast(result.data.data.last);
    setIsLoading(false);
  };

  return (
    <MyLingopressWrapper>
      <br />
      <h1>{t("mypage.Graph of the number of sentences translated")}</h1>

      <br />
      <HeatMapComponent />
      {myPressList.length > 0 &&
        myPressList.map((learnedPress) => (
          <LearnedPressBox
            key={learnedPress.id}
            onClick={() => navigate(`/lingopress/${learnedPress.press.id}`)}
          >
            <h1>{learnedPress.press.title}</h1>
            <p>{learnedPress.press.published_at}</p>
            <div className={"etcWrapper"}>
              <p>
                {t("mypage.Well-translated sentences")}:{" "}
                {learnedPress.learnedContentLine}/
                {learnedPress.press.totalContentLine}
                {t("common.sentences")}
                <br />
                {t("mypage.Sentences that attempted to interpret")}:{" "}
                {learnedPress.translatedContentLine}/
                {learnedPress.press.totalContentLine}
                {t("common.sentences")}
              </p>
              <p className={"updatedAt"}>
                {t("mypage.Recent study days")}{" "}
                {formatDate(learnedPress.updatedAt)}
              </p>
            </div>
          </LearnedPressBox>
        ))}
      {isLoading && <p>Loading...</p>}
      <div id="observer" style={{ height: "10px" }}></div>
    </MyLingopressWrapper>
  );
};

export default MyLingopress;
