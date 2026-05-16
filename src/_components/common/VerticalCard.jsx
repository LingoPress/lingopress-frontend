import styled from "@emotion/styled";
import { customColors } from "../../styles/color";
import { useNavigate } from "react-router-dom";

const VerticalCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 1rem;
  border-radius: 0.8rem;
  background-color: ${customColors.background.boxBg["0"]};
  overflow: hidden;
  width: min(100%, 34rem);
  min-height: 38rem;
  margin-bottom: 2rem;
  white-space: pre-line;
  line-height: 2.3rem;
  font-weight: 300;
  border: 1px solid ${customColors.border[100]};
  box-shadow: 0 1.6rem 4rem rgba(15, 23, 42, 0.08);
  cursor: pointer;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    border-color 0.2s ease;

  &:hover {
    border-color: rgba(37, 99, 235, 0.35);
    box-shadow: 0 2rem 5rem rgba(15, 23, 42, 0.12);
    transform: translateY(-0.4rem);
  }

  img {
    width: 100%;
    height: 20rem;
    object-fit: cover;
    border-radius: 0.6rem;
    margin-bottom: 2.2rem;
  }

  div {
    padding: 0 1rem 1.2rem;
    text-align: left;
  }

  h3 {
    font-size: 2.1rem;
    color: ${customColors.text.title["200"]};
    margin-bottom: 1.4rem;
    font-weight: 800;
    line-height: 1.35;
  }

  p {
    font-size: 1.45rem;
    color: ${customColors.text.subTitle["200"]};
    font-weight: 500;
    line-height: 1.65;
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
