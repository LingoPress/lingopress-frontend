import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import formatDate from "../../utils/formatDate";
import { customColors } from "../../styles/color";
import { useTranslation } from "react-i18next";

const PressCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 0;
  position: relative;

  border-radius: 0.8rem;
  background-color: ${customColors.background.boxBg["100"]};
  overflow: hidden;
  min-height: 43rem;
  white-space: pre-line;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    border-color 0.2s ease;
  line-height: 2.3rem;
  font-weight: 300;
  cursor: pointer;
  border: 1px solid ${customColors.border[100]};
  box-shadow: 0 1.2rem 3rem rgba(15, 23, 42, 0.07);

  &:hover {
    border-color: rgba(37, 99, 235, 0.32);
    box-shadow: 0 1.8rem 4rem rgba(15, 23, 42, 0.12);
    transform: translateY(-0.4rem);
  }
`;

const ImageContainer = styled.div`
  overflow: hidden;
  width: 100%;
`;

const Image = styled.img`
  width: 100%;
  height: 21rem;
  object-fit: cover;
`;

const Content = styled.div`
  width: 100%;
  padding: 2rem 2rem 4.8rem;
`;

const Title = styled.h2`
  font-size: 1.85rem;
  text-overflow: ellipsis;
  color: ${customColors.text.title["900"]};
  font-weight: 800;
  line-height: 1.35;
`;

const SubTitle = styled.h3`
  margin-top: 1rem;
  font-size: 1.45rem;
  color: ${customColors.text.subTitle["200"]};
  font-weight: 700;
  line-height: 1.5;
`;

const Description = styled.p`
  margin-top: 1.2rem;
  line-height: 1.7;
  color: ${customColors.text.explain["500"]};
  max-height: 7.5rem;
  white-space: normal;
  overflow: hidden;
  font-size: 1.4rem;
  display: -webkit-box;
  -webkit-line-clamp: 3; /*보여줄 줄의 수를 정함*/
  -webkit-box-orient: vertical; /*box의 배열 방향을 정함*/
`;

const PressInfo = styled.p`
  margin-top: 1rem;
  color: ${customColors.text.subTitle[200]};
  font-size: 1.25rem;
  font-weight: 700;
  position: absolute;
  bottom: 1.8rem;
`;

const PressCard = ({
  id,
  publishedAt,
  title,
  content,
  imageUrl,
  translatedTitle,
  totalContentLine,
}) => {
  const formattedDate = formatDate(publishedAt);
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <PressCardWrapper onClick={() => navigate(`/lingopress/${id}`)}>
      {imageUrl ? (
        <ImageContainer>
          <Image src={imageUrl} alt={title} />
        </ImageContainer>
      ) : null}
      <Content>
        <Title>{title}</Title>
        <SubTitle>{translatedTitle ?? translatedTitle}</SubTitle>
        <Description>{content}</Description>
        <PressInfo style={{ left: "2rem" }}>
          {totalContentLine} {t(`press.line`)}
        </PressInfo>

        <PressInfo
          style={{
            right: "2rem",
          }}
        >
          {formattedDate ? formattedDate : ""}
        </PressInfo>
      </Content>
    </PressCardWrapper>
  );
};

export default PressCard;
