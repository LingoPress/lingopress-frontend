import {useEffect, useState} from "react";
import axios from "axios";
import PressCard from "./PressCard";

const PressSection = () => {
  const [pressData, setPressData] = useState([]);
  const [isLast, setIsLast] = useState(false);
  const [page, setPage] = useState(0);

  const [isLoading, setIsLoading] = useState(false);

  const handleObserver = (entries) => {
    const target = entries[0];
    if (target.isIntersecting && !isLoading) {
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
    fetchData();
  }, [page]);

  const fetchData = async () => {
    if (isLast) {
      return;
    }

    setIsLoading(true);

    const result = await axios.get(
      `${process.env.REACT_APP_BACKEND_API_URL}/api/v1/press`,
      {
        params: {
          page: page,
        },
      },
    );
    setPressData((pressData) => [...pressData, ...result.data.data.content]);
    setIsLast(result.data.data.last);
    setIsLoading(false);

  };

  return (
    <div>
      <ul>
        {pressData.length > 0
          ? pressData.map((news) => <PressCard key={news.id} {...news} />)
          : null}
      </ul>
      {isLoading && <p>Loading...</p>}
      <div id="observer" style={{height: "10px"}}></div>
    </div>
  );
};

export default PressSection;
