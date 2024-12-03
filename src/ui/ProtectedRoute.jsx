import { useUser } from "../features/authentication/useUser";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Spinner from "./Spinner";

const FullPage = styled.div`
    height: 100vh;
    background-color: var(--color-grey-50);
    display: flex;
    align-items: center;
    justify-content: center;
`;

function ProtectedRoute({ children }) {
    // console.log('protectedRoute is run...');
    const navigate = useNavigate();
    const { isLoading, user, isAuthenticated } = useUser();

    useEffect(() => {
        // console.log('useEffect');
        if (!isAuthenticated && !isLoading) {
            navigate("/login");
        };
    }, [isAuthenticated, isLoading, navigate]);

    
    if (isLoading) return <Spinner />;
    
    
    if (isAuthenticated) return children;
}

export default ProtectedRoute;
