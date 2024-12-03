import BookingRow from "./BookingRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import useBookings from "./useBookings";
import Empty from "../../ui/Empty";
import Spinner from "../../ui/Spinner";
import { useSearchParams } from "react-router-dom";
import Pagination from "../../ui/Pagination";
import { HiBars4 } from "react-icons/hi2";

function BookingTable() {
    const { status, bookings, count } = useBookings();
    const [searchParams] = useSearchParams();
    
    if (status === "pending") return <Spinner />;
    
    const sortBy = searchParams.get("sortBy");
    let sortedBookings;
    
    if (sortBy) {
        const [field, direction] = sortBy.split("-");
        sortedBookings = bookings.sort((a, b) => {
            if (direction === "asc") {
                return a[field] > b[field] ? 1 : -1;
            }
            return a[field] < b[field] ? 1 : -1;
        });
    } else {
        sortedBookings = bookings;
    }
    
    // const finalBookings = sortedBookings ? sortedBookings : bookings;

    // const count = sortedBookings.length;
    const currentPage = searchParams.get("page") || 1;
    const pageCount = Math.ceil(count / 10);

    // const finalBookings = (pageCount < 2 || !currentPage) ? sortedBookings : sortedBookings.slice(10 * (currentPage - 1) + 1, currentPage * 10);

    return (
        <Menus>
            <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
                <Table.Header>
                    <div>Cabin</div>
                    <div>Guest</div>
                    <div>Dates</div>
                    <div>Status</div>
                    <div>Amount</div>
                    <div></div>
                </Table.Header>

                <Table.Body
                    data={sortedBookings}
                    render={(booking) => <BookingRow key={booking.id} booking={booking} />}
                />

                <Table.Footer>
                    <Pagination count={count} pageCount={pageCount} PAGE_SIZE={10} searchParamName="page" />
                </Table.Footer>
            </Table>
        </Menus>
    );
}

export default BookingTable;
