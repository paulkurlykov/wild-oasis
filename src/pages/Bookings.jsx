import Heading from "../ui/Heading";
import Row from "../ui/Row";
import BookingTable from "../features/bookings/BookingTable";
import BookingTableOperations from "../features/bookings/BookingTableOperations";
import AddBooking from "../features/bookings/AddBooking";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";



function Bookings() {

    const navigate = useNavigate();

    useEffect(() => {
      navigate(window.location.pathname, { replace: true }); // Удалить параметры при монтировании компонента
    }, [navigate]);


    return (
        <>
            <Row type="horizontal">
                <Heading as="h1">All bookings</Heading>
                <BookingTableOperations />
            </Row>
            
            <BookingTable />
            <AddBooking/>
        </>
    );
}

export default Bookings;
