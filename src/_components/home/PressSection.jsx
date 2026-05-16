import { useEffect, useState } from "react";
import PressCard from "./PressCard";
import styled from "@emotion/styled";
import { Dropdown } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { axiosPrivate, axiosPublic } from "../../utils/axiosMethod";
import { useNavigate } from "react-router-dom";

const SortCriteriaType = [
  ["publishedAt", "날짜"],
  ["totalContentLine", "뉴스 문장 수"],
];

const SortOrderType = [
  ["desc", "내림차순"],
  ["asc", "오름차순"],
];

const PressSectionWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(30rem, 1fr));
  justify-content: center;
  gap: 2.4rem;
  max-width: 118rem;
  margin: 0 auto 7rem;
  padding: 0 2rem;
`;

const OrderOptionWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 0.8rem;
  max-width: 118rem;
  margin: 0 auto 2rem;
  padding: 0 2rem;

  .dropdown-toggle {
    border: 1px solid #cbd5e1;
    border-radius: 999px;
    color: #0f172a;
    background: #ffffff;
    font-size: 1.35rem;
    font-weight: 700;
    padding: 0.8rem 1.4rem;
  }
`;

const EnrollVideoButton = styled.div`
  display: flex;
  justify-content: flex-end;
  cursor: pointer;
  font-size: 1.4rem;
  font-weight: 800;
  padding: 0.9rem 1.4rem;
  border-radius: 999px;
  background-color: #2563eb;
  color: #ffffff;
  border: 1px solid #2563eb;

  &:hover {
    background-color: #1d4ed8;
  }

  &:active {
    background-color: #1e40af;
  }

  transition: background-color 0.3s;
`;

const PressSection = ({ authStatus, category }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [pressData, setPressData] = useState([]);
  const [isLast, setIsLast] = useState(false);
  const [page, setPage] = useState(0);

  const [isLoading, setIsLoading] = useState(false);

  // 정렬 기준
  const [sortCriteria, setSortCriteria] = useState(SortCriteriaType[0]);
  const [sortType, setSortType] = useState(SortOrderType[0]);

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

  const fetchData = async (pageValue, sortCriteria, sortType) => {
    if (isLast) {
      return;
    }
    setIsLoading(true);

    let result;
    if (authStatus) {
      result = await axiosPrivate({
        method: "get",
        url: "/v1/press",
        params: {
          page: pageValue,
          sort: sortCriteria[0],
          order: sortType[0],
          category: category ? category : null,
        },
      });
    } else {
      result = await axiosPublic({
        method: "get",
        url: "/v1/press",
        params: {
          page: pageValue,
          sort: sortCriteria[0],
          order: sortType[0],
        },
      });
    }

    setPressData((pressData) => [...pressData, ...result.data.data.content]);
    setIsLast(result.data.data.last);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData(page, sortCriteria, sortType);
  }, [page]);

  const searchParamChange = (type, value) => {
    setPage(() => 0);
    setPressData([]);
    setIsLast(false);
    if (type === "SortCriteriaType") {
      setSortCriteria(value);
    }
    if (type === "SortOrderType") {
      setSortType(value);
    }
  };

  return (
    <>
      <OrderOptionWrapper>
        {category === "news" ? (
          <>
            <Dropdown>
              <Dropdown.Toggle
                size="lg"
                variant="Secondary"
                id="dropdown-basic"
                style={{ marginRight: "1rem" }}
              >
                {sortCriteria[0] === "publishedAt"
                  ? t("sort.date")
                  : t("sort.news_line_count")}
              </Dropdown.Toggle>

              <Dropdown.Menu
                style={{
                  fontSize: "1.4rem",
                }}
              >
                <Dropdown.Item
                  onClick={() =>
                    searchParamChange("SortCriteriaType", SortCriteriaType[0])
                  }
                >
                  {t("sort.date")}
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() =>
                    searchParamChange("SortCriteriaType", SortCriteriaType[1])
                  }
                >
                  {t("sort.news_line_count")}
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown>
              <Dropdown.Toggle
                size="lg"
                variant="Secondary"
                id="dropdown-basic"
              >
                {sortType[0] === "desc" ? t("sort.DESC") : t("sort.ASC")}
              </Dropdown.Toggle>

              <Dropdown.Menu
                style={{
                  fontSize: "1.4rem",
                }}
              >
                <Dropdown.Item
                  onClick={() =>
                    searchParamChange("SortOrderType", SortOrderType[0])
                  }
                >
                  {t("sort.DESC")}
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() =>
                    searchParamChange("SortOrderType", SortOrderType[1])
                  }
                >
                  {t("sort.ASC")}
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </>
        ) : null}
        {category === "youtube" ? (
          <>
            <EnrollVideoButton onClick={() => navigate("/enroll_video")}>
              동영상 등록
            </EnrollVideoButton>
          </>
        ) : null}
      </OrderOptionWrapper>
      <PressSectionWrapper>
        {pressData.length > 0
          ? pressData.map((news) => <PressCard key={news.id} {...news} />)
          : null}

        {isLoading && <p>Loading...</p>}
        <div id="observer" style={{ height: "10px" }}></div>
      </PressSectionWrapper>
    </>
  );
};

export default PressSection;
