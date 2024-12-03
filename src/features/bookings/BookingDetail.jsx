import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Spinner from "../../ui/Spinner";

import { useMoveBack } from "../../hooks/useMoveBack";
import useBooking from "./useBooking";
import { useNavigate } from "react-router-dom";
import { HiEye, HiArrowDownOnSquare } from "react-icons/hi2";
import useCheckOut from "../check-in-out/useCheckOut";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete"
import useDeleteBooking from "./useDeleteBooking";
import PageNotFound from "../../pages/PageNotFound";

const HeadingGroup = styled.div`
    display: flex;
    gap: 2.4rem;
    align-items: center;
`;

function BookingDetail() {
    const navigate = useNavigate();
    const { booking, isLoading } = useBooking();
    const moveBack = useMoveBack();
    const { checkOutMutation, isCheckingOut } = useCheckOut();
    const { isPending: isDeleting, mutate: mutateDeleteBooking } = useDeleteBooking();
    

    if (isLoading || isCheckingOut) return <Spinner />;
    if(!booking) return <PageNotFound/>

    const { status, id: bookingId } = booking;

    console.log(booking);

    const statusToTagName = {
        unconfirmed: "blue",
        "checked-in": "green",
        "checked-out": "silver",
    };


    return (
        <>
            <Row type="horizontal">
                <HeadingGroup>
                    <Heading as="h1">Booking #{bookingId}</Heading>
                    <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
                </HeadingGroup>
                <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
            </Row>

            <BookingDataBox booking={booking} />

            <ButtonGroup>
                <Modal>
                    <Modal.Open opens="delete-booking" >
                        <Button variation="danger" disabled={isDeleting}>
                            Delete
                        </Button>
                    </Modal.Open>
                    <Modal.Window name="delete-booking" >
                    <ConfirmDelete
                            resourceName="bookings"
                            disabled={isDeleting}
                            onConfirm={() => {
                                mutateDeleteBooking(bookingId);
                                navigate('/bookings');

                            }}
                        />
                    </Modal.Window>
                </Modal>
                {status === "unconfirmed" && (
                    <Button onClick={() => navigate(`/checkin/${bookingId}`)}>
                        <span>Check in</span>
                    </Button>
                )}
                {status === "checked-in" && (
                    <Button onClick={() => checkOutMutation(bookingId)}>
                        <span>Check out</span>
                    </Button>
                )}
                <Button variation="secondary" onClick={moveBack}>
                    Back
                </Button>
            </ButtonGroup>
        </>
    );
}

export default BookingDetail;
