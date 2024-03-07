import { useEffect, useState } from "react";
import axios from "axios";
import PressCard from "./PressCard";

const PressSection = () => {
  const [pressData, setPressData] = useState([]);
  useEffect(() => {
    // 뉴스정보 가져오기
    const responseData = async () => {
      const result = await axios.get(
        `${process.env.REACT_APP_BACKEND_API_URL}/api/v1/press`,
      );
      console.log(result.data.data.content);
      setPressData(result.data.data.content);
    };
    responseData();
  }, []);

  return (
    <div>
      <ul>
        {pressData.length > 0
          ? pressData.map((news) => <PressCard key={news.id} {...news} />)
          : null}
      </ul>
    </div>
  );
};

export default PressSection;
