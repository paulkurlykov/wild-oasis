import styled from "styled-components";

import { useMoveBack } from "../hooks/useMoveBack";
import Heading from "../ui/Heading";
import { Cat404 } from "@404pagez/react";
import { useNavigate } from "react-router-dom";

const StyledPageNotFound = styled.main`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4.8rem;
`;

const Box = styled.div`
  /* box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 4.8rem;
  flex: 0 1 96rem;
  text-align: center;

  & h1 {
    margin-bottom: 3.2rem;
  }
`;

function PageNotFound() {
  const moveBack = useMoveBack();
  const navigate = useNavigate();

  return (
    <Cat404 size={40} isButton={true} buttonLabel="Go back" buttonColor="#312e81" onButtonClick={()=> navigate("/")} />
  )

  // return (
  //   <StyledPageNotFound>
  //     <Box>
  //       <Heading as="h1">
  //         The page you are looking for could not be found 😢
  //       </Heading>
  //       <button onClick={moveBack} size="large">
  //         &larr; Go back
  //       </button>
  //     </Box>
  //   </StyledPageNotFound>
  // );
}

export default PageNotFound;
