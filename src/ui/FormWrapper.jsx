import { styled } from "styled-components";
import Heading from "./Heading";

const StyledFormBodyBox = styled.div`
    display: flex;
    flex-direction: column;
    gap: 3rem;
`;

function FormWrapper({ children, header }) {
    return (
        <StyledFormBodyBox>
            <Heading>{header}</Heading>
            {children}
        </StyledFormBodyBox>
    );
}

export default FormWrapper;
