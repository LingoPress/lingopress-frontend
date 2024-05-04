import { useEffect, useState } from "react";
import axios from "axios";
import PressCard from "./PressCard";
import styled from "@emotion/styled";
import { Dropdown } from "react-bootstrap";

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

const PressSection = () => {
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

    const result = await axios.get(
      `${process.env.REACT_APP_BACKEND_API_URL}/v1/press`,
      {
        params: {
          page: pageValue,
          sort: sortCriteria[0],
          order: sortType[0],
        },
      },
    );
    setPressData((pressData) => [...pressData, ...result.data.data.content]);
    setIsLast(result.data.data.last);
    setIsLoading(false);
  };

  useEffect(() => {
    console.log(page);
    fetchData(page, sortCriteria, sortType);
  }, [page]);

  const searchParamChange = (type, value) => {
    setPage(() => 0);
    setPressData([]);
    setIsLast(false);
    if (type === "SortCriteriaType") {
      console.log(value);
      setSortCriteria(value);
    }
    if (type === "SortOrderType") {
      setSortType(value);
      console.log(value);
    }
  };

  return (
    <>
      <OrderOptionWrapper>
        <Dropdown>
          <Dropdown.Toggle
            size="lg"
            variant="Secondary"
            id="dropdown-basic"
            style={{ marginRight: "1rem" }}
          >
            {sortCriteria[1]}
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
              날짜
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() =>
                searchParamChange("SortCriteriaType", SortCriteriaType[1])
              }
            >
              뉴스 문장 수
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown>
          <Dropdown.Toggle size="lg" variant="Secondary" id="dropdown-basic">
            {sortType[1]}
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
              내림차순
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() =>
                searchParamChange("SortOrderType", SortOrderType[1])
              }
            >
              오름차순
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
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
