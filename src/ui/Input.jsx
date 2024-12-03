import  styled  from "styled-components";

const Input = styled.input`
  border: 1px solid var(--color-grey-300);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-sm);
  padding: 0.8rem 1.2rem;
  color: var(--color-grey-600);
  

  &:focus {
    border: 2px solid var(--color-brand-500);
    box-shadow: 0px 0px 10px 0px rgba(99,102,241,0.82);
  }
  
`

export default Input;