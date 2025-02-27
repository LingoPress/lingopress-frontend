import styled from "@emotion/styled";
import { customColors } from "../../styles/color";
import { useNavigate } from "react-router-dom";

const VerticalCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem 1rem 3rem;
  border-radius: 0.5rem;
  background-color: ${customColors.background.boxBg["0"]};
  overflow: hidden;
  // width: 40rem;
  height: 40rem;
  margin-bottom: 3rem;
  white-space: pre-line;
  line-height: 2.3rem;
  font-weight: 300;

  img {
    width: 40rem;
    height: 20rem;
    object-fit: cover;
    border-radius: 0.5rem;
    margin-bottom: 3rem;
  }

  div {
    padding: 1rem;
    text-align: center;
  }

  h3 {
    font-size: 2rem;
    color: ${customColors.text.title["200"]};
    margin-bottom: 3rem;
    font-weight: 600;
    line-height: 1.5;
  }

  p {
    font-size: 1.6rem;
    color: ${customColors.text.subTitle["200"]};
    font-weight: 600;
    line-height: 1.5;
  }
`;

const VerticalCard = ({ title, description, image, goto }) => {
  const navigate = useNavigate();
  return (
    <VerticalCardWrapper onClick={() => navigate(goto)}>
      <img src={image} alt={title} />
      <div>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </VerticalCardWrapper>
  );
};

export default VerticalCard;
