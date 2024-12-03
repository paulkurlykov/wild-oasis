import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Checkbox from "../../ui/Checkbox";
import { formatCurrency } from "../../utils/helpers";

import { useMoveBack } from "../../hooks/useMoveBack";
import useBooking from "../bookings/useBooking";
import Spinner from "../../ui/Spinner";
import { useState, useEffect } from "react";
import useCheckIn from "./useCHeckIn";
import useSettings from "../settings/useSettings";

const Box = styled.div`
    /* Box */
    background-color: var(--color-grey-0);
    border: 1px solid var(--color-grey-100);
    border-radius: var(--border-radius-md);
    padding: 2.4rem 4rem;
`;

function CheckinBooking() {
    const [confirmPaid, setConfirmPaid] = useState();
    const [addBreakfast, setAddBreakfast] = useState(false);

    const { booking, isLoading } = useBooking();
    const { isPending, error, data: settings } = useSettings();

    useEffect(() => setConfirmPaid(booking?.isPaid ?? false), [booking]);

    const moveBack = useMoveBack();
    const { checkinMutation, isCheckingIn } = useCheckIn();

    if (isLoading || isPending) return <Spinner />;

    const optionalBreakfastPrice = settings.breakfastPrice * 1;
    const { id: bookingId, guests, totalPrice, numGuests, hasBreakfast, numNights } = booking;

    function handleCheckin() {
        if (!confirmPaid) return;

        if (addBreakfast) {
            checkinMutation({
                bookingId,
                breakfast: {
                    hasBreakfast: true,
                    extrasPrice: optionalBreakfastPrice,
                    totalPrice: totalPrice + optionalBreakfastPrice,
                },
            });
        } else {
            checkinMutation({ bookingId, breakfast: {} });
        }
    }

    return (
        <>
            <Row type="horizontal">
                <Heading as="h1">Check in booking #{bookingId}</Heading>
                <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
            </Row>

            <BookingDataBox booking={booking} />

            {!hasBreakfast && (
                <Box>
                    <Checkbox
                        checked={addBreakfast}
                        onChange={() => {
                            setAddBreakfast((added) => !added);
                            setConfirmPaid(false);
                        }}
                        id="breakfast">
                        Want to add breakfast for {formatCurrency(optionalBreakfastPrice)} ?
                    </Checkbox>
                </Box>
            )}

            <Box>
                <Checkbox
                    checked={confirmPaid}
                    onChange={() => setConfirmPaid((confirm) => !confirm)}
                    id="confirm"
                    disabled={confirmPaid}>
                    I confirm that {guests.fullName} has paid the total amount of{" "}
                    {!addBreakfast
                        ? formatCurrency(totalPrice)
                        : `${formatCurrency(
                              totalPrice + optionalBreakfastPrice
                          )} (room cost ${formatCurrency(
                              totalPrice
                          )} plus breakfast cost is ${formatCurrency(optionalBreakfastPrice)})`}
                </Checkbox>
            </Box>

            <ButtonGroup>
                <Button onClick={handleCheckin} disabled={!confirmPaid || isCheckingIn}>
                    Check in booking #{bookingId}
                </Button>
                <Button variation="secondary" onClick={moveBack}>
                    Back
                </Button>
            </ButtonGroup>
        </>
    );
}

export default CheckinBooking;
