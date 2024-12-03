import styled from "styled-components";
import { useState } from "react";
import Table from "../../ui/Table";
import Button from "../../ui/Button";
import { useSearchParams } from "react-router-dom";

const TableRow = styled.div`
    display: grid;
    grid-template-columns: 1.5fr 1fr 1.5fr 1fr 0.5fr 7rem;
    column-gap: 0.4rem;
    align-items: center;
    justify-items: baseline;
    padding: 1.4rem 2.4rem;

    &:not(:last-child) {
        border-bottom: 1px solid var(--color-grey-100);
    }
`;

export const Img = styled.img`
    display: block;
    width: 2.4rem;
    aspect-ratio: 3 / 2;
    object-fit: cover;
    object-position: center;
    transform: scale(1.5) translateX(-7px);
`;

const FullName = styled.div`
    font-size: 1.2rem;
    font-weight: 600;
    color: var(--color-grey-600);
    font-family: "Sono";
`;

const StyledID = styled.div`
    font-size: 1.2rem;
    color: var(--color-grey-700);
`;

const Nationality = styled.div`
    font-size: 1.2rem;
    font-family: "Sono";
    font-weight: 600;
    color: var(--color-grey-700);
`;

const Discount = styled.div`
    font-family: "Sono";
    font-weight: 500;
    color: var(--color-green-700);
`;

const Email = styled.div`
    font-size: 1.2rem;
    color: var(--color-grey-700);
`;

const Icon = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    cursor: pointer;
    color: var(--color-grey-900);
    transition: all 0.1s;

    & svg {
        width: 2rem;
        height: 2rem;
        color: inherit;
    }

    &:hover {
        background-color: var(--color-brand-500);
        color: var(--color-grey-50);
        border-radius: var(--border-radius-sm);
    }

    &:active {
        transform: translateY(-1px);
        box-shadow: 0.5rem 0.5rem 2rem rgba(color-black, 0.2);
    }
`;

const ModalButtons = styled.div`
    display: flex;
    justify-content: space-between;
    padding-inline: 2rem;
    align-items: center;
    margin-top: 3rem;
`;

function GuestRow({ guest }) {
    // console.log(guest);

    const [searchParams, setSearchParams] = useSearchParams();
    const { fullName, email, countryFlag, id, nationality } = guest;
    const [showForm, setShowForm] = useState(false);

    if (!guest) return <h1>There no data</h1>;

    return (
        <>
            <TableRow>
                <FullName>{fullName}</FullName>
                <StyledID>{id}</StyledID>
                <Email>{email}</Email>
                <Nationality>{nationality}</Nationality>
                <Img src={countryFlag} />
                <Button
                    onClick={() => {
                        searchParams.set("guestId", id);
                        setSearchParams(searchParams);
                    }}
                    size="small"
                    variation="row"
                    >
                    Pick
                </Button>
            </TableRow>

            {/* {showForm && <CreateCabinForm cabinToEdit={cabin} onEditSuccess={toggleForm} />} */}
        </>
    );
}

export default GuestRow;
