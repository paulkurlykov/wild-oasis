import styled from "styled-components";
import { format, isToday } from "date-fns";

import Tag from "../../ui/Tag";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Spinner from "../../ui/Spinner";
import Modal from "../../ui/Modal";

import { formatCurrency } from "../../utils/helpers";
import { formatDistanceFromNow } from "../../utils/helpers";

import { HiEye, HiArrowDownOnSquare, HiArrowUpOnSquare, HiArchiveBoxXMark } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import useCheckOut from "../check-in-out/useCheckOut";
import useDeleteBooking from "./useDeleteBooking";
import ConfirmDelete from "../../ui/ConfirmDelete";

const Cabin = styled.div`
    font-size: 1.6rem;
    font-weight: 600;
    color: var(--color-grey-600);
    font-family: "Sono";
`;


const Stacked = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.2rem;

    & span:first-child {
        font-weight: 500;
        color: var(--color-grey-700);
    }

    & span:last-child {
        color: var(--color-grey-500);
        font-size: 1.2rem;
    }
`;

const Amount = styled.div`
    font-family: "Sono";
    font-weight: 500;
    color: var(--color-grey-700);
`;

function BookingRow({ booking }) {
    const {
        id: bookingId,
        created_at,
        startDate,
        endDate,
        numNights,
        numGuests,
        totalPrice,
        status,
        guests: { fullName: guestName, email },
        cabins: { name: cabinName },
    } = booking;



    const { checkOutMutation, isCheckingOut } = useCheckOut();
    const { isPending: isDeleting, mutate: mutateDeleteBooking } = useDeleteBooking();

    if (isCheckingOut) return <Spinner />;

    const statusToTagName = {
        unconfirmed: "blue",
        "checked-in": "green",
        "checked-out": "silver",
    };

    const navigate = useNavigate();

    return (
        <Table.Row>
            <Cabin>{cabinName}</Cabin>

            <Stacked>
                <span>{guestName}</span>
                <span>{email}</span>
            </Stacked>

            <Stacked>
                <span>
                    {isToday(new Date(startDate)) ? "Today" : formatDistanceFromNow(startDate)}{" "}
                    &rarr; {numNights} night stay
                </span>
                <span>
                    {format(new Date(startDate), "MMM dd yyyy")} &mdash;{" "}
                    {format(new Date(endDate), "MMM dd yyyy")}
                </span>
            </Stacked>

            <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>

            <Amount>{formatCurrency(totalPrice)}</Amount>
            <Modal>
                <Menus.Menu>
                    <Menus.Toggle id={bookingId}></Menus.Toggle>
                    <Menus.List id={bookingId}>
                        <Menus.Button onClick={() => navigate(`/booking/${bookingId}`)}>
                            <HiEye />
                            <span>See details</span>
                        </Menus.Button>
                        {status === "unconfirmed" && (
                            <Menus.Button onClick={() => navigate(`/checkin/${bookingId}`)}>
                                <HiArrowDownOnSquare />
                                <span>Check in</span>
                            </Menus.Button>
                        )}
                        {status === "checked-in" && (
                            <Menus.Button onClick={() => checkOutMutation(bookingId)}>
                                <HiArrowUpOnSquare />
                                <span>Check out</span>
                            </Menus.Button>
                        )}
                        <Modal.Open opens="delete-booking">
                            <Menus.Button onClick={() => console.log('navigate!')}>
                            <HiArchiveBoxXMark />
                                <span>Delete</span>
                            </Menus.Button>
                        </Modal.Open>
                    </Menus.List>
                    <Modal.Window name="delete-booking" >
                        <ConfirmDelete
                            resourceName="bookings"
                            disabled={isDeleting}
                            onConfirm={() => mutateDeleteBooking(bookingId)}
                            // onConfirm={() => console.log('DELETING...')}
                        />
                    </Modal.Window>
                </Menus.Menu>
            </Modal>
        </Table.Row>
    );
}

export default BookingRow;
