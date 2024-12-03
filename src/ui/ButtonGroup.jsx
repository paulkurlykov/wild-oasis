import styled from 'styled-components';

const ButtonGroup = styled.div.attrs({
  className: "btns",
})`
  display: flex;
  gap: 1.2rem;
  justify-content: flex-end;
  margin-top: 2rem;
`;

export default ButtonGroup;
