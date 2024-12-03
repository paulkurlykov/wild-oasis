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
    margin: 2rem 0rem;
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


    grid-column: ${(props) => props.gridCol};
    grid-row: ${(props) => props.gridRow};
`;

const StyledBadgeImg = styled.img`
    width: 100%;
`;

const StyledImgWrapper = styled.div`
    width: 10rem;
`;

function BadgeTable({options, rows}) {
    // console.log("it is BadgeTable!");
    // const { guest, isGettingGuest } = useGuest();
    // if (isGettingGuest) return <Spinner />;

    // if (!guest) return <Spinner />;

    // const { fullName, email, nationality, countryFlag } = guest;

    return (
        <StyledBadgeTable rows={rows}>
            {/* <StyledBadgeItem type="label" gridRow="1/2" gridCol="1/2">
                Full Name
            </StyledBadgeItem>
            <StyledBadgeItem type="label" gridRow="2/3" gridCol="1/2">
                Email
            </StyledBadgeItem>
            <StyledBadgeItem type="label" gridRow="3/-1" gridCol="1/2">
                nationality
            </StyledBadgeItem>
            <StyledBadgeItem gridRow="1/2" gridCol="2/3">
                {fullName}
            </StyledBadgeItem>
            <StyledBadgeItem gridRow="2/3" gridCol="2/3">
                {email}
            </StyledBadgeItem>
            <StyledBadgeItem gridRow="3/-1" gridCol="2/3">
                {nationality}
            </StyledBadgeItem>
            <StyledBadgeItem gridRow="1/-1" gridCol="3/-1">
                <StyledImgWrapper>
                    <StyledBadgeImg src={countryFlag} />
                </StyledImgWrapper>
            </StyledBadgeItem> */}

        </StyledBadgeTable>
    );
}

export default BadgeTable;
