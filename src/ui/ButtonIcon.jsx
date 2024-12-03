import styled from "styled-components";


const ButtonIcon = styled.button`
  background: none;
  padding: 0.6rem;
  border-radius: var(--border-radius-lg);
  transition: all 0.2s;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: .75rem;
  float: right;
  

  &:hover {
    background-color: var(--color-grey-300);
  }

  & svg {
    width: 2.5rem;
    height: 2.5rem;
    color: var(--color-brand-500);
  }

  span {
    font-weight: bold;
  }
`;

export default ButtonIcon;
