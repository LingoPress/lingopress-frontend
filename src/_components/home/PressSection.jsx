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
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 5rem;
`;

const OrderOptionWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-right: 2rem;
  margin-bottom: 2rem;
`;

const EnrollVideoButton = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-right: 2rem;
  margin-bottom: 2rem;
  cursor: pointer;
  font-size: 1.6rem;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  background-color: #f8f9fa;
  color: #495057;
  border: 1px solid #ced4da;

  &:hover {
    background-color: #e9ecef;
  }

  &:active {
    background-color: #dee2e6;
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
