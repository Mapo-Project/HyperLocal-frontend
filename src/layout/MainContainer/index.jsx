import styled from 'styled-components';

const MainContainer = styled.main`
  margin: auto;
  margin-top: 50px;
  width: 360px;
  height: 800px;
  background-color: ${(props) => props.theme};
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  border: 1px solid #ececec;
  font-family: 'Pretendard';
`;

MainContainer.defaultProps = {
  theme: '#E8F5E9;',
};

export default MainContainer;
