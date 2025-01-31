import styled from "styled-components";
import useRecentBookings from "./useRecentBookings";
import Spinner from "../../ui/Spinner";
import useRecentStays from "./useRecentStays";
import Stats from "./Stats";
import useCabins from "../cabins/useCabins";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import TodayActivity from "../check-in-out/TodayActivity";

const StyledDashboardLayout = styled.div`
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    grid-template-rows: auto 34rem auto;
    gap: 2.4rem;
`;

function DashboardLayout() {
    const { bookings, isPending: isBookingsPending } = useRecentBookings();
    const { confirmedStays, isPending: isStaysPending, numDays } = useRecentStays();
    const { data: cabins, isPending: isCabinsPending } = useCabins();
    const res = useCabins();

    
    if (isBookingsPending || isStaysPending || isCabinsPending) return <Spinner />;
    
    // console.log(cabins);
    // console.log(bookings);
    // console.log(confirmedStays);
    return (
        <StyledDashboardLayout>
            <Stats
                bookings={bookings}
                confirmedStays={confirmedStays}
                numDays={numDays}
                cabinCount={cabins.length}
            />
            <TodayActivity/>
            {/* <DurationChart confirmedStays={confirmedStays} /> */}
            <DurationChart confirmedStays={confirmedStays} />
            <SalesChart bookings={bookings} numDays={numDays} />
        </StyledDashboardLayout>
    );
}

export default DashboardLayout;
