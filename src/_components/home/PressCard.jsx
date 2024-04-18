import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import formatDate from "../../utils/formatDate";
import { customColors } from "../../styles/color";

const PressCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  border-radius: 0.5rem;
  background-color: ${customColors.background.boxBg["0"]};
  overflow: hidden;
  width: 40rem;
  // height: 45rem;
  //margin-bottom: 10rem;
  white-space: pre-line;
  line-height: 2.3rem;
  font-weight: 300;

  &:hover {
    transform: translateY(-5px);
  }
`;

const ImageContainer = styled.div`
  overflow: hidden;
  width: 40rem;
`;

const Image = styled.img`
  border-radius: 10px;
  width: 100%;
  height: 25rem;
  object-fit: cover;
`;

const Content = styled.div`
  width: 100%;
`;

const Title = styled.h2`
  margin-top: 2rem;
  font-size: 2rem;
  color: #333;
  text-overflow: ellipsis;
  color: ${customColors.text.cardTitle["100"]};
`;

const Description = styled.p`
  margin-top: 1rem;
  line-height: normal;
  color: ${customColors.text.subExplain["400"]};
  max-height: 6rem;
  white-space: normal;
  overflow: hidden;
  font-size: 1.6rem;
  display: -webkit-box;
  -webkit-line-clamp: 3; /*보여줄 줄의 수를 정함*/
  -webkit-box-orient: vertical; /*box의 배열 방향을 정함*/
`;

const PublishedTime = styled.p`
  margin-top: 1rem;
  color: #999;
  font-size: 1.4rem;
  text-align: right;
`;

const PressCard = ({ id, publishedAt, title, content, imageUrl }) => {
  const formattedDate = formatDate(publishedAt);
  const navigate = useNavigate();

  return (
    <PressCardWrapper onClick={() => navigate(`/lingopress/${id}`)}>
      {imageUrl ? (
        <ImageContainer>
          <Image src={imageUrl} alt={title} />
        </ImageContainer>
      ) : null}
      <Content>
        <Title>{title}</Title>
        <Description>{content}</Description>
        <PublishedTime>{formattedDate}</PublishedTime>
      </Content>
    </PressCardWrapper>
  );
};

export default PressCard;
