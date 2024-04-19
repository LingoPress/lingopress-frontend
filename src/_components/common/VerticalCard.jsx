import styled from "@emotion/styled";
import { customColors } from "../../styles/color";

const VerticalCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4rem;
  border-radius: 0.5rem;
  background-color: ${customColors.background.boxBg["0"]};
  overflow: hidden;
  //  width: 40rem;
  height: 41rem;
  margin-bottom: 10rem;
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
    color: ${customColors.text.cardTitle["100"]};
    margin-bottom: 3rem;
  }

  p {
    font-size: 1.6rem;
    font-weight: bold;
    color: ${customColors.text.cardTitle["200"]};
  }
`;

const VerticalCard = ({ title, description, image }) => {
  return (
    <VerticalCardWrapper>
      <img src={image} alt={title} />
      <div>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </VerticalCardWrapper>
  );
};

export default VerticalCard;
