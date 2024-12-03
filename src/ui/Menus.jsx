import styled from "styled-components";
import { createContext, useContext, useState, useRef, useEffect } from "react";
import { HiEllipsisVertical } from "react-icons/hi2";
import { createPortal } from "react-dom";
import Row from "./Row";
import useOutsideClick from "../features/cabins/useOutsideClick";

const Menu = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
`;

const StyledToggle = styled.button`
    background: none;
    border: none;
    padding: 0.4rem;
    border-radius: var(--border-radius-sm);
    transform: translateX(0.8rem);
    transition: all 0.2s;
    cursor: pointer;

    &:hover {
        background-color: var(--color-grey-100);
    }

    &:active {
        border: 2px solid var(--color-grey-700);
    }

    & svg {
        width: 2.4rem;
        height: 2.4rem;
        color: var(--color-grey-700);
    }
`;

const StyledList = styled.ul`
    position: fixed;

    background-color: var(--color-grey-0);
    box-shadow: var(--shadow-md);
    border-radius: var(--border-radius-md);

    right: ${(props) => props.position.x}px;
    top: ${(props) => props.position.y}px;
`;

const StyledButton = styled.button`
    width: 100%;
    text-align: left;
    background: none;
    border: none;
    padding: 1.2rem 2.4rem;
    font-size: 1.4rem;
    transition: all 0.2s;
    cursor: pointer;
    color: var(--color-grey-700);

    display: flex;
    align-items: center;
    gap: 1.6rem;

    &:hover {
        background-color: var(--color-grey-50);
    }

    & svg {
        width: 1.6rem;
        height: 1.6rem;
        color: var(--color-grey-700);
        transition: all 0.3s;
    }
`;

const MenusContext = createContext();

function Menus({ children }) {
    const [openID, setOpenID] = useState("");
    const [position, setPosition] = useState(null);
    const [iconEl, setIconEl] = useState(null);
    function close() {
        // console.log("closing menu...");
        setOpenID("");
    }
    function open(id) {
        // console.log("opening menu...");
        setOpenID(id);
    }

    return (
        <MenusContext.Provider
            value={{ openID, open, close, setPosition, position, iconEl, setIconEl }}>
            {children}
        </MenusContext.Provider>
    );
}

function Toggle({ id }) {

  
    const { open, close, openID, setPosition, setIconEl } = useContext(MenusContext);

    const toggleRef = useRef();

    useEffect(() => {
        if (toggleRef.current) {
            setIconEl(toggleRef.current);
        }
    }, [toggleRef.current]);

    function handleClick(e) {
        console.log("THIS IS HANDLECLICK");

        const rect = e.target.closest("button").getBoundingClientRect();
        setPosition({
            x: window.innerWidth - rect.width - rect.x,
            y: rect.y + rect.height + 8,
        });

        openID === null || openID === undefined || openID !== id ? open(id) : close();
    }

    return (
        <StyledToggle ref={toggleRef} onClick={handleClick}>
            <HiEllipsisVertical />
        </StyledToggle>
    );
}

function List({ id, children }) {
    const { openID, position, close, iconEl } = useContext(MenusContext);
    const ref = useOutsideClick(close, true, iconEl);

    if (openID !== id) return null;

    return createPortal(
        <StyledList ref={ref} position={position}>
            {children}
        </StyledList>,
        document.body
    );
}

function Button({ children, icon, onClick }) {
    const { close } = useContext(MenusContext);
    function handleClick() {
        onClick?.();
        // console.log('this handle');
        close();
    }

    return (
        
            <StyledButton onClick={handleClick}>
                {icon}
                {children}
            </StyledButton>
        
    );
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
