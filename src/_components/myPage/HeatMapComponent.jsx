import HeatMap from "@uiw/react-heat-map";
import Tooltip from "@uiw/react-tooltip";
import { axiosPrivate } from "../../utils/axiosMethod";
import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useTranslation } from "react-i18next";

const HeatMapWrapper = styled.div`
  margin: 5rem 2rem;
  overflow-x: scroll;
`;

const HeatMapComponent = () => {
  const [learningCountList, setLearningCountList] = useState([]);
  const { t } = useTranslation();
  useEffect(() => {
    axiosPrivate({
      method: "get",
      url: `/v1/learning-record/between?startDate=2024-01-01&endDate=2024-12-31`,
    })
      .then((res) => {
        setLearningCountList(res.data.data);
      })
      .catch((err) => {
        console.log("@@@ error: ", err.response);
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
              content={`${data.date}. ${t("common.Interpreted sentences")}: ${data.count || 0}`}
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
