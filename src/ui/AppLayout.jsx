import { Outlet, useNavigation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import styled, { css } from "styled-components";
import { useNavigate, useRouteError } from "react-router-dom";
import Spinner from "./Spinner";
import { createContext, useContext, useState } from "react";

const AppLayoutContext = createContext();

function AppLayoutProvider({children}) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const revealSideMenuHandler = () => setIsMenuOpen((isOpen) => !isOpen);

    return (
        <AppLayoutContext.Provider value={{ isMenuOpen, setIsMenuOpen, revealSideMenuHandler }}>
            {children}
        </AppLayoutContext.Provider>
    );
}

function useHideSidebar() {
    const context = useContext(AppLayoutContext);
    if (context === undefined) {
        throw new Error("AppleLayoutContext was used outside of AppleLayoutContext");
    }

    return context;
}

export {useHideSidebar, AppLayoutProvider};




const Main = styled.main`
    background-color: var(--color-grey-50);
    padding: 4rem;
    display: flex;
    justify-content: center;
`;
const StyledLayout = styled.div`
    ${(props) =>
        props.ismenuopen === "true" &&
        css`
            grid-template-columns: 26rem 1fr;
        `}

    ${(props) =>
        props.ismenuopen === "false" &&
        css`
            grid-template-columns: 10rem 1fr;
        `}


    display: grid;
    grid-template-rows: max-content 1fr;
    height: 100vh;
`;

const Container = styled.div`
    max-width: 180rem;
    width: 100%;
    justify-self: center;
    display: flex;
    flex-direction: column;
    gap: 3.2rem;
`;

function AppLayout() {
    const navigation = useNavigation();
    const isLoading = navigation.state === "loading";
    const { isMenuOpen, setIsMenuOpen, revealSideMenuHandler } = useHideSidebar();

    return (
        <>
            {/* {isLoading && <Spinner/>} */}

                <StyledLayout ismenuopen={isMenuOpen.toString()} >
                    <Header />
                    <Sidebar />
                    <Main>
                        <Container>
                            <Outlet />
                        </Container>
                    </Main>
                </StyledLayout>
        </>
    );
}

export default AppLayout;
