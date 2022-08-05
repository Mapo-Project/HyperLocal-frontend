import styled from 'styled-components';

const Button = styled.button`
  width: 328px;
  height: 44px;

  background-color: ${(props) => props.backgroundColor};
  border-radius: 4px;
  border: 0;

  cursor: pointer;

  color: #ffffff;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  letter-spacing: 0.25px;
`;

Button.defaultProps = {
  backgroundColor: '#424242',
};

export default Button;
