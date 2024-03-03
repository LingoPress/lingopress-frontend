import styled from "@emotion/styled";
import { Link } from "react-router-dom";

const PressCardWrapper = styled.div`
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  display: flex;
  min-height: 10rem;
  background-color: whitesmoke;

  &:hover {
    transform: translateY(-5px);
  }
`;

const ImageContainer = styled.div`
  overflow: hidden;
  width: 10rem;
`;

const Image = styled.img`
  border-radius: 10px;
  width: 10rem;
  height: 10rem;
  object-fit: fill;
`;

const Content = styled.div`
  padding: 20px;
  width: 80%;
`;

const Title = styled.h2`
  margin-top: 15px;
  font-size: 1.5rem;
  color: #333;
  text-overflow: ellipsis;
`;

const Description = styled.p`
  margin: 10px 0 0;
  font-size: 1rem;
  color: #666;
  text-overflow: ellipsis;
`;

const PressCard = ({ id, news_url, title, desc, img }) => {
  return (
    <Link to={news_url}>
      <PressCardWrapper>
        {img ? (
          <ImageContainer>
            <Image src={img} alt={title} />
          </ImageContainer>
        ) : null}
        <Content>
          <Title>{title}</Title>
          <Description>{desc}</Description>
        </Content>
      </PressCardWrapper>
    </Link>
  );
};

export default PressCard;
