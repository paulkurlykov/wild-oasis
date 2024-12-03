import { cloneElement, createContext, useContext, useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import styled from "styled-components";
import CreateCabinForm from "../features/cabins/CreateCabinForm";
import useOutsideClick from "../features/cabins/useOutsideClick";
import { useSearchParams } from "react-router-dom";

const StyledModal = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: var(--color-grey-0);
    border-radius: var(--border-radius-lg);
    box-shadow: var(--shadow-lg);
    padding: 3.2rem 4rem;
    transition: all 0.5s;
    width: 75vw;
    height: 90vh;
    overflow: scroll;
`;

const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: var(--backdrop-color);
    backdrop-filter: blur(4px);
    z-index: 1000;
    transition: all 0.5s;
`;

const Button = styled.button`
    background: none;
    border: none;
    padding: 0.4rem;
    border-radius: var(--border-radius-sm);
    transform: translateX(0.8rem);
    transition: all 0.2s;
    position: absolute;
    top: 1.2rem;
    right: 1.9rem;
    cursor: pointer;

    &:hover {
        background-color: var(--color-grey-100);
    }

    & svg {
        width: 2.4rem;
        height: 2.4rem;
        /* Sometimes we need both */
        /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
        color: var(--color-grey-500);
    }
`;

const ModalContext = createContext();

function Modal({ children }) {
    const [openName, setOpenName] = useState("");
    const [searchParams, setSearchParams] = useSearchParams();

    const close = () => {
        setOpenName("");
        console.log("closing modal...");
        searchParams.delete("modalPage");
        searchParams.delete("guestId");
        searchParams.delete("cabinId");
        setSearchParams(searchParams);
    };
    const open = setOpenName;

    return (
        <ModalContext.Provider value={{ close, open, openName, searchParams, setSearchParams }}>
            {children}
        </ModalContext.Provider>
    );
}

function Open({ children, opens: openWindowName }) {
    const { open, searchParams, setSearchParams } = useContext(ModalContext);

    return cloneElement(children, {
        onClick: () => {
            open(openWindowName);
            searchParams.delete("page");
            searchParams.set("modalPage", "1");
            setSearchParams(searchParams);
        },
    });
}

function Window({ children, name }) {
    const { close, openName, searchParams, setSearchParams } = useContext(ModalContext);

    const ref = useOutsideClick(close);

    // console.log('this');
    // console.log(name);
    // console.log(openName);

    if (name !== openName) return null;
    return createPortal(
        <Overlay>
            <StyledModal ref={ref}>
                <Button onClick={close}>
                    <HiXMark />
                </Button>
                <div>{cloneElement(children, { closeModal: close })}</div>
            </StyledModal>
        </Overlay>,
        document.body
    );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
