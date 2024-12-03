import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useState } from "react";
import styled from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";
import Button from "./ui/Button";
import Input from "./ui/Input";
import Heading from "./ui/Heading";
import Row from "./ui/Row";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Account from "./pages/Account";
import Bookings from "./pages/Bookings";
import Booking from "./pages/Booking";
import Cabins, { cabinsLoader } from "./pages/Cabins";
import Settings from "./pages/Settings";
import Users from "./pages/Users";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./ui/AppLayout";
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import Checkin from "./ui/Checkin";
import ProtectedRoute from "./ui/ProtectedRoute";
import { DarkModeProvider } from "./context/DarkModeContext";
import { AppLayoutProvider } from "./ui/AppLayout";
import ErrorFallback from "./ui/ErrorFallback";
import { ErrorBoundary } from "react-error-boundary";

const queryClient = new QueryClient();

const router = createBrowserRouter([
    {
        element: (
            <ProtectedRoute>
                <AppLayout />
            </ProtectedRoute>
        ),
        children: [
            {
                path: "/",
                element: <Dashboard />,
            },
            {
                path: "dashboard",
                element: <Dashboard />,
            },
            {
                path: "account",
                element: <Account />,
            },
            {
                path: "bookings",
                element: <Bookings />,
            },
            {
                path: "booking/:bookingId",
                element: <Booking />,
            },
            {
                path: "checkin/:bookingId",
                element: <Checkin />,
            },
            {
                path: "cabins",
                element: <Cabins />,
                // loader: cabinsLoader,
            },
            {
                path: "settings",
                element: <Settings />,
            },
            {
                path: "users",
                element: <Users />,
            },
        ],
    },

    {
        path: "*",
        element: <PageNotFound />,
    },
    {
        path: "login",
        element: <Login />,
    },
]);

const StyledApp = styled.div`
    padding: 20px;
`;

function App() {
    return (
        <>

                <AppLayoutProvider>
                    <DarkModeProvider>
                        <QueryClientProvider client={queryClient}>
                            <ReactQueryDevtools initialIsOpen={false} />
                            <GlobalStyles />
                            <RouterProvider router={router}>
                                <StyledApp></StyledApp>
                            </RouterProvider>
                            <Toaster
                                position="bottom-right"
                                gutter={12}
                                containerStyle={{ margin: "8px" }}
                                toastOptions={{
                                    success: {
                                        duration: 3000,
                                    },
                                    error: {
                                        duration: 3000,
                                    },
                                    style: {
                                        fontSize: "16px",
                                        maxWidth: "500px",
                                        padding: "16px 24px",
                                        backgroundColor: "var(--color-grey-0)",
                                        color: "var(--color-grey-700)",
                                    },
                                }}
                            />
                        </QueryClientProvider>
                    </DarkModeProvider>
                </AppLayoutProvider>
        </>
    );
}

export default App;
