import styled, { css } from "styled-components";
import { NavLink } from "react-router-dom";
import {
    HiOutlineHome,
    HiOutlineCalendarDays,
    HiOutlineHomeModern,
    HiOutlineUsers,
    HiOutlineCog6Tooth,
    HiChevronDoubleLeft,
    HiChevronDoubleRight,
} from "react-icons/hi2";
import { useHideSidebar } from "./AppLayout";

const NavList = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
`;

const StyledNavLink = styled(NavLink)`
    &:link,
    &:visited {
        display: flex;
        align-items: center;
        gap: 1.2rem;

        color: var(--color-grey-600);
        font-size: 1.6rem;
        font-weight: 500;
        padding: 1.2rem 2.4rem;
        transition: all 0.3s;

        ${(props) =>
            props.ismenuopen === "false" &&
            css`
                justify-content: center;
            `}
    }

    /* This works because react-router places the active class on the active NavLink */
    &:hover,
    &:active,
    &.active:link,
    &.active:visited {
        color: var(--color-grey-800);
        background-color: var(--color-grey-50);
        border-radius: var(--border-radius-sm);
    }

    & svg {
        width: 2.4rem;
        height: 2.4rem;
        color: var(--color-grey-400);
        transition: all 0.3s;
    }

    &:hover svg,
    &:active svg,
    &.active:link svg,
    &.active:visited svg {
        color: var(--color-brand-600);
    }
`;

const StyledNavNonLinkItem = styled.a`
    &,
    &:link,
    &:visited {
        display: flex;
        align-items: center;
        gap: 1.2rem;

        color: var(--color-grey-600);
        font-size: 1.6rem;
        font-weight: 500;
        padding: 1.2rem 2.4rem;
        transition: all 0.3s;
        cursor: pointer;

        ${(props) =>
            props.ismenuopen === "false" &&
            css`
                justify-content: center;
            `}
    }

    &:hover,
    &:active,
    &.active:link,
    &.active:visited {
        color: var(--color-grey-800);
        background-color: var(--color-grey-50);
        border-radius: var(--border-radius-sm);
    }

    & svg {
        width: 2.4rem;
        height: 2.4rem;
        color: var(--color-grey-400);
        transition: all 0.3s;
    }

    &:hover svg,
    &:active svg,
    &.active:link svg,
    &.active:visited svg {
        color: var(--color-brand-600);
    }
`;

function MainNav() {
    const { isMenuOpen, revealSideMenuHandler } = useHideSidebar();
    return (
        <nav>
            <NavList>
                <li>
                    <StyledNavLink ismenuopen={isMenuOpen.toString()} to="dashboard">
                        <HiOutlineHome />
                        {isMenuOpen && <span>Home</span>}
                    </StyledNavLink>
                </li>
                <li>
                    <StyledNavLink ismenuopen={isMenuOpen.toString()} to="bookings">
                        <HiOutlineCalendarDays />
                        {isMenuOpen && <span>Bookings</span>}
                    </StyledNavLink>
                </li>
                <li>
                    <StyledNavLink ismenuopen={isMenuOpen.toString()} to="cabins">
                        <HiOutlineHomeModern />
                        {isMenuOpen && <span>Cabins</span>}
                    </StyledNavLink>
                </li>
                <li>
                    <StyledNavLink ismenuopen={isMenuOpen.toString()} to="users">
                        <HiOutlineUsers />
                        {isMenuOpen && <span>Users</span>}
                    </StyledNavLink>
                </li>
                <li>
                    <StyledNavLink ismenuopen={isMenuOpen.toString()} to="settings">
                        <HiOutlineCog6Tooth />
                        {isMenuOpen && <span>Settings</span>}
                    </StyledNavLink>
                </li>
                <li>
                    <StyledNavNonLinkItem 
                        ismenuopen={isMenuOpen.toString()}
                        onClick={revealSideMenuHandler}>
                        {isMenuOpen ? <HiChevronDoubleLeft /> : <HiChevronDoubleRight />}
                        {isMenuOpen && <span>Hide menu</span>}
                    </StyledNavNonLinkItem>
                </li>
            </NavList>
        </nav>
    );
}

export default MainNav;
