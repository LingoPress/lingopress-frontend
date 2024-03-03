import { useEffect, useState } from "react";
import dummydata from "../../mock/dummydata";
import PressCard from "./PressCard";

const PressSection = () => {
  const [pressData, setPressData] = useState([]);

  useEffect(() => {
    // 뉴스 fetch
    console.log(dummydata);
    setPressData(dummydata);
  }, []);

  return (
    <div>
      <h1>Press</h1>
      <ul>
        {pressData.map((news) => (
          <PressCard key={news.id} {...news} />
        ))}
      </ul>
    </div>
  );
};

export default PressSection;
