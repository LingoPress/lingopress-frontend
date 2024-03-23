import styled from "@emotion/styled";
import {Link} from "react-router-dom";
import formatDate from "../../utils/formatDate";

const PressCardWrapper = styled.div`
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  display: flex;
  height: 10rem;
  background-color: whitesmoke;
  overflow: hidden;
  margin-bottom: 1.2rem;

  &:hover {
    transform: translateY(-5px);
  }
`;

const ImageContainer = styled.div`
  overflow: hidden;
  width: 15rem;
`;

const Image = styled.img`
  border-radius: 10px;
  width: 100%;
  height: 10rem;
  object-fit: cover;
`;

const Content = styled.div`
  padding: 20px;
  width: 100%;
`;

const Title = styled.h2`
  margin-top: 15px;
  font-size: 1.5rem;
  color: #333;
  text-overflow: ellipsis;
`;

const Description = styled.p`
  margin-top: 10px;
  line-height: normal;
  color: #666;
  max-height: 6rem;
  white-space: normal;
  overflow: hidden;

  display: -webkit-box;
  -webkit-line-clamp: 3; /*보여줄 줄의 수를 정함*/
  -webkit-box-orient: vertical; /*box의 배열 방향을 정함*/
`;

const PublishedTime = styled.p`
  margin-top: 10px;
  color: #999;
  font-size: 0.8rem;
  text-align: right;
`;

const PressCard = ({id, publishedAt, title, content, imageUrl}) => {
  const formattedDate = formatDate(publishedAt);

  return (
    <Link to={`lingopress/${id}`}>
      <PressCardWrapper>
        {imageUrl ? (
          <ImageContainer>
            <Image src={imageUrl} alt={title}/>
          </ImageContainer>
        ) : null}
        <Content>
          <Title>{title}</Title>
          <Description>{content}</Description>
          <PublishedTime>{formattedDate}</PublishedTime>
        </Content>
      </PressCardWrapper>
    </Link>
  );
};

export default PressCard;
