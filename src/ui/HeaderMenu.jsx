import { styled } from "styled-components"
import ButtonIcon from "./ButtonIcon";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import Logout from "../features/authentication/Logout";
import DarkModeToggle from "./DarkModeToggle";

const StyledHeaderMenu = styled.ul`
    display: flex;
    gap: .5rem;
`;



function HeaderMenu() {
    const navigate = useNavigate();


    return (
        <StyledHeaderMenu>
            <li>
                <ButtonIcon onClick={() => navigate("/account")} >
                <HiOutlineUserCircle />
                </ButtonIcon>
            </li>
            <li>
                <DarkModeToggle/>
            </li>
            <li>
                <Logout/>
            </li>
        </StyledHeaderMenu>
    )
}

export default HeaderMenu
