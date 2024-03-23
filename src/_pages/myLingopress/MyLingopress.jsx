import {useEffect, useState} from "react";
import {axiosPrivate} from "../../utils/axiosMethod";
import styled from "@emotion/styled";
import formatDate from "../../utils/formatDate";
import {useNavigate} from "react-router-dom";


const LearnedPressBox = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  margin: 20px;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  background-color: #fafafa;

  &:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  }

  h1 {
    font-size: 24px;
    color: #333;
    margin-bottom: 10px;
  }

  p {
    font-size: 18px;
    color: #666;
    line-height: 1.6;
  }
`


const MyLingopress = () => {
  const navigate = useNavigate();

  const [myPressList, setMyPressList] = useState([])
  useEffect(() => {
    document.title = "내가 번역한 뉴스들";

    axiosPrivate({
        url: "/api/v1/press/learned",
        method: "get"
      }
    ).then((response) => {
      setMyPressList(response.data.data.content);
    }).catch((error) => {
      console.log(error);
    });


    return () => {
      document.title = "Lingopress";
    }
  }, []);


  return (
    <div>
      <br/>
      <h1>내가 번역한 뉴스들</h1>

      {myPressList.length > 0 && myPressList.map((learnedPress) => (
        <LearnedPressBox key={learnedPress.id} onClick={() => navigate(`/lingopress/${learnedPress.press.id}`)}>
          <h1>{learnedPress.press.title}</h1>
          <p>{learnedPress.press.published_at}</p>
          <p> 학습률: {(learnedPress.learnedContentLine / learnedPress.press.totalContentLine).toFixed(2)}</p>
          <p>최근 학습일 {formatDate(learnedPress.updatedAt)}</p>

        </LearnedPressBox>
      ))}

    </div>
  )
}

export default MyLingopress;