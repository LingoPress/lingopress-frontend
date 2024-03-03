import { useEffect, useState } from "react";
import dummydata from "../../mock/dummydata";
import PressCard from "./PressCard";

const PressSection = () => {
  const [pressData, setPressData] = useState([]);

  useEffect(() => {
    // 뉴스 fetch
    setPressData(dummydata);
  }, []);

  return (
    <div>
      <ul>
        {pressData.map((news) => (
          <PressCard key={news.id} {...news} />
        ))}
      </ul>
    </div>
  );
};

export default PressSection;
