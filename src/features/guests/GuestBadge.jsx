import useGuest from "./useGuest";
import Spinner from "../../ui/Spinner";
import { styled, css } from "styled-components";
import { Img } from "./GuestRow";

export const StyledBadgeTable = styled.div`
    width: max-content;
    display: grid;
    grid-template-columns: max-content max-content min-content;
    grid-template-rows: repeat(${(props) => props.rows}, 1fr);
    column-gap: 2rem;
    row-gap: 0.25rem;
    margin: 1rem 0 3rem 0;
    padding: 1rem;
    border: 2px solid var(--color-grey-600);
    border-radius: 5px;
`;

export const StyledBadgeItem = styled.div`
    ${(props) =>
        props.type === "label" &&
        css`
            font-size: 1.1rem;
            font-weight: 700;
        `}

    ${(props) =>
        props.type === "value" &&
        css`
            font-size: 1rem;
            font-weight: 400;
        `}


    grid-column: ${(props) => props.gridcol};
    grid-row: ${(props) => props.gridrow};
`;

export const StyledBadgeImg = styled.img`
    width: 100%;
`;

export const StyledImgWrapper = styled.div`
    width: 10rem;
`;

function GuestBadge() {
    // console.log("it is guestBadge!");
    const { guest, isGettingGuest } = useGuest();
    if (isGettingGuest) return <Spinner />;

    if (!guest) return <Spinner />;

    const { fullName, email, nationality, countryFlag } = guest;

    // useEffect(() => {
    //     setCabin(guest);
    // }, [guest]);

    return (
        <StyledBadgeTable rows="3">
            <StyledBadgeItem type="label" gridrow="1/2" gridcol="1/2">
                Full Name
            </StyledBadgeItem>
            <StyledBadgeItem type="label" gridrow="2/3" gridcol="1/2">
                Email
            </StyledBadgeItem>
            <StyledBadgeItem type="label" gridrow="3/-1" gridcol="1/2">
                nationality
            </StyledBadgeItem>
            <StyledBadgeItem gridrow="1/2" gridcol="2/3">
                {fullName}
            </StyledBadgeItem>
            <StyledBadgeItem gridrow="2/3" gridcol="2/3">
                {email}
            </StyledBadgeItem>
            <StyledBadgeItem gridrow="3/-1" gridcol="2/3">
                {nationality}
            </StyledBadgeItem>
            <StyledBadgeItem gridrow="1/-1" gridcol="3/-1">
                <StyledImgWrapper>
                    <StyledBadgeImg src={countryFlag} />
                </StyledImgWrapper>
            </StyledBadgeItem>
        </StyledBadgeTable>
    );
}

export default GuestBadge;
