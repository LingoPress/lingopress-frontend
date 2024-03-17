import styled from "@emotion/styled";

const FullOuter = styled.div`
  z-index: 100;
  display: block;
  //background: rgba(0, 0, 0, 0.2);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const ModalOuterLayer = ({handleCloseModal}) => {
  return (
    <FullOuter onClick={handleCloseModal}/>
  );
}

export default ModalOuterLayer;