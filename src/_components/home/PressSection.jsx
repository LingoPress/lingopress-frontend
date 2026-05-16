import { useEffect, useState } from "react";
import PressCard from "./PressCard";
import styled from "@emotion/styled";
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
  gap: 1rem;
  max-width: 118rem;
  margin: 0 auto 2rem;
  padding: 0 2rem;

  @media (max-width: 640px) {
    justify-content: stretch;
    flex-direction: column;
    align-items: stretch;
  }
`;

const SelectControl = styled.label`
  position: relative;
  display: inline-flex;
  align-items: center;
  min-width: 14rem;
  height: 4.2rem;
  border: 1px solid #cbd5e1;
  border-radius: 999px;
  background:
    linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
  box-shadow: 0 0.8rem 2rem rgba(15, 23, 42, 0.06);
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease,
    transform 0.2s ease;

  &:hover {
    border-color: rgba(37, 99, 235, 0.45);
    box-shadow: 0 1rem 2.4rem rgba(15, 23, 42, 0.1);
    transform: translateY(-1px);
  }

  &::after {
    content: "";
    position: absolute;
    right: 1.4rem;
    width: 0.7rem;
    height: 0.7rem;
    border-right: 2px solid #475569;
    border-bottom: 2px solid #475569;
    transform: rotate(45deg) translateY(-2px);
    pointer-events: none;
  }

  select {
    width: 100%;
    height: 100%;
    padding: 0 3.2rem 0 1.6rem;
    border: 0;
    outline: 0;
    appearance: none;
    background: transparent;
    color: #0f172a;
    cursor: pointer;
    font-size: 1.35rem;
    font-weight: 800;
  }
`;

const EnrollVideoButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 4.2rem;
  cursor: pointer;
  font-size: 1.4rem;
  font-weight: 900;
  padding: 0.9rem 1.6rem;
  border-radius: 999px;
  background:
    linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
  color: #ffffff;
  border: 0;
  box-shadow: 0 1rem 2.2rem rgba(37, 99, 235, 0.22);
  transition:
    box-shadow 0.2s ease,
    transform 0.2s ease,
    filter 0.2s ease;

  &:hover {
    filter: brightness(0.98);
    box-shadow: 0 1.2rem 2.8rem rgba(37, 99, 235, 0.3);
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
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
            <SelectControl>
              <select
                aria-label="정렬 기준"
                value={sortCriteria[0]}
                onChange={(event) => {
                  const nextValue = SortCriteriaType.find(
                    ([value]) => value === event.target.value,
                  );
                  searchParamChange("SortCriteriaType", nextValue);
                }}
              >
                <option value="publishedAt">{t("sort.date") || "날짜"}</option>
                <option value="totalContentLine">
                  {t("sort.news_line_count") || "뉴스 문장 수"}
                </option>
              </select>
            </SelectControl>
            <SelectControl>
              <select
                aria-label="정렬 방향"
                value={sortType[0]}
                onChange={(event) => {
                  const nextValue = SortOrderType.find(
                    ([value]) => value === event.target.value,
                  );
                  searchParamChange("SortOrderType", nextValue);
                }}
              >
                <option value="desc">{t("sort.DESC") || "내림차순"}</option>
                <option value="asc">{t("sort.ASC") || "오름차순"}</option>
              </select>
            </SelectControl>
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
