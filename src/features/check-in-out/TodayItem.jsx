import styled from "styled-components";
import { Flag } from "../../ui/Flag";
import Tag from "../../ui/Tag";
import Button from "../../ui/Button";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import CheckoutButton from "../check-in-out/CheckoutButton"

const StyledTodayItem = styled.li`
    display: grid;
    grid-template-columns: 9rem 2rem 1fr 7rem 9rem;
    gap: 1.2rem;
    align-items: center;

    font-size: 1.4rem;
    padding: 0.8rem 0;
    border-bottom: 1px solid var(--color-grey-100);

    &:first-child {
        border-top: 1px solid var(--color-grey-100);
    }
`;

const Guest = styled.div`
    font-weight: 500;
`;

function TodayItem({ activity }) {
    const navigate = useNavigate();

    const { id, guests, numNights, status } = activity;
    return (
        <StyledTodayItem>
            {status === "unconfirmed" && <Tag type="green">Arriving</Tag>}
            {status === "checked-in" && <Tag type="green">Departing</Tag>}
            <Flag src={guests.countryFlag} />
            <Guest>{guests.fullName}</Guest>
            <div>{numNights} nights</div>

            {status === "unconfirmed" && (
                <Button
                 size="small" 
                 variation="primary" 
                //  as={Link} 
                //  to={`/checkin/${id}`}
                 onClick={() => navigate(`/checkin/${id}`)}
                 >
                    Check in
                </Button>
            )}

            {status === "checked-in" && <CheckoutButton bookingId={id} />}
        </StyledTodayItem>
    );
}

export default TodayItem;
