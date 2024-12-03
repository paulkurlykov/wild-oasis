import Heading from "../ui/Heading";
import SignUpForm from "../features/authentication/SignupForm";
import { styled } from "styled-components";

export const StyledWrapperPage = styled.div`
    color: var(--color-grey-700);
    display: flex;
    flex-direction: column;
    gap: 2rem;
`;

function NewUsers() {
    return (
        <StyledWrapperPage>
            <Heading as="h1">Create a new user</Heading>
            <SignUpForm />
        </StyledWrapperPage>
    );
}

export default NewUsers;

