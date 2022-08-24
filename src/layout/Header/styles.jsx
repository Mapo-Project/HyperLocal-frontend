import styled from 'styled-components';

const HeaderContainer = styled.div`
  width: 100%;
  height: 24px;
  background: rgba(33, 33, 33, 0.08);
  position: relative;

  .header_button {
    position: absolute;
    top: 7px;
    right: 8px;
    display: flex;
    gap: 8px;
  }
  .square {
    width: 10px;
    height: 10px;
    background: rgba(0, 0, 0, 0.38);
  }
  .circle {
    width: 10px;
    height: 10px;
    background: rgba(0, 0, 0, 0.38);
    border-radius: 50%;
  }
  .triangle-down {
    width: 0;
    height: 0;
    border-left: calc(10px / 1.732) solid transparent;
    border-right: calc(10px / 1.732) solid transparent;
    border-top: 10px solid rgba(0, 0, 0, 0.38);
  }
`;

export default HeaderContainer;
