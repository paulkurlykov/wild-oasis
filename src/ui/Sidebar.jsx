import { styled, css } from "styled-components"
import Logo from "./Logo";
import MainNav from "./MainNav";
import Uploader from "../data/Uploader"
import { useState } from "react";
import Button from "./Button";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi2";
import { useHideSidebar } from "./AppLayout";


const StyledSidebar = styled.aside`



    background-color: var(--color-grey-0);
    padding: 0.5rem;
    border-right: 1px solid var(--color-primary-300);
    grid-row: 1 / -1;

    display: flex;
    flex-direction: column;
    gap: 3.2rem;

    ${(props) =>
        props.ismenuopen === "true" &&
        css`
            padding: 3.5rem;
        `}
`

function Sidebar() {

const { isMenuOpen, setIsMenuOpen, revealSideMenuHandler } = useHideSidebar();


    return (
        <StyledSidebar ismenuopen={isMenuOpen.toString()} >
            <Logo/>
            <MainNav/>
            {/* <Button onClick={revealSideMenuHandler} >
                {isMenuOpen ? <HiChevronDoubleRight/> : <HiChevronDoubleLeft/>}
            </Button> */}
            {/* <Uploader/> */}
        </StyledSidebar>
    )
}

export default Sidebar
