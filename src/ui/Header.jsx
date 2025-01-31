import { styled } from "styled-components"
import Logout from "../features/authentication/Logout"
import HeaderMenu from "./HeaderMenu"
import UserAvatar from "../features/authentication/UserAvatar"

const StyledHeader = styled.header`
    background-color: var(--color-grey-0);
    padding: 1.5rem 3rem;
    /* border-bottom: 1px solid var(--color-grey-500); */

    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 3rem;
`

function Header() {
    return (
        <StyledHeader>
            <UserAvatar/>
            <HeaderMenu/>
        </StyledHeader>
    )
}

export default Header
