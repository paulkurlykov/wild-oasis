import styled, {css} from "styled-components";
import logoLight from "../../public/logo-light.png";
import logoDark from "../../public/logo-dark.png";
import { useDarkMode } from "../context/DarkModeContext";
import { useHideSidebar } from "./AppLayout";

const StyledLogo = styled.div`
    text-align: center;
`;

const Img = styled.img`
    ${(props) =>
        props.ismenuopen === "true" &&
        css`
            height: 9.6rem;
        `}

        ${(props) =>
        props.ismenuopen === "false" &&
        css`
            height: 3.6rem;
        `}

    width: auto;
`;

function Logo() {
    const { isDarkMode } = useDarkMode();
    const { isMenuOpen } = useHideSidebar();

    return (
        <StyledLogo>
            <Img ismenuopen={isMenuOpen.toString()} src={isDarkMode ? logoDark : logoLight} alt="Logo" />
        </StyledLogo>
    );
}

export default Logo;
