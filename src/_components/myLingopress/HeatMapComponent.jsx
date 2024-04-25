import HeatMap from "@uiw/react-heat-map";
import Tooltip from "@uiw/react-tooltip";
import { axiosPrivate } from "../../utils/axiosMethod";
import { useEffect, useState } from "react";
import styled from "@emotion/styled";

const HeatMapWrapper = styled.div`
  margin: 2rem;
  overflow-x: scroll;
`;

const HeatMapComponent = () => {
  const [learningCountList, setLearningCountList] = useState([]);
  useEffect(() => {
    axiosPrivate({
      method: "get",
      url: `/api/v1/learning-record/between?startDate=2024-01-01&endDate=2024-12-31`,
    })
      .then((res) => {
        console.log(res.data.data);
        setLearningCountList(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <HeatMapWrapper>
      <HeatMap
        value={learningCountList}
        width={1200}
        startDate={new Date("2024/01/01")}
        endDate={new Date("2024/12/31")}
        monthLabels={[
          "1월",
          "2월",
          "3월",
          "4월",
          "5월",
          "6월",
          "7월",
          "8월",
          "9월",
          "10월",
          "11월",
          "12월",
        ]}
        rectSize={20}
        rectRender={(props, data) => {
          // if (!data.count) return <rect {...props} />;
          return (
            <Tooltip
              placement="top"
              content={`${data.date}. 해석한 문장: ${data.count || 0}`}
            >
              <rect {...props} />
            </Tooltip>
          );
        }}
      />
    </HeatMapWrapper>
  );
};

export default HeatMapComponent;
