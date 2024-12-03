import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import useGuests from "./useGuests";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import GuestRow from "./GuestRow";
import Pagination from "../../ui/Pagination";

const TableHeader = styled.header`
    display: grid;
    grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 7rem;
    column-gap: 2.4rem;
    align-items: center;
    justify-items: baseline;

    background-color: var(--color-grey-50);
    border-bottom: 1px solid var(--color-grey-100);
    text-transform: uppercase;
    letter-spacing: 0.4px;
    font-weight: 600;
    color: var(--color-grey-600);
    padding: 1.6rem 2.4rem;
`;

function GuestTable(props) {
    const { isGettingGuests, guests, count } = useGuests();

    const [searchParams] = useSearchParams();

    if (isGettingGuests) return <Spinner />;

    const pageCount = Math.ceil(count / 10);

    // console.log(guests);

    return (
        <Table columns="1.5fr 1fr 1.5fr 1fr .5fr 1fr">
            <Table.Header role="row">
                <div>Full Name</div>
                <div>ID</div>
                <div>email</div>
                <div>nationality</div>
                <div>country flag</div>
                <div></div>
            </Table.Header>
            <Table.Body
                data={guests}
                render={(guest) => <GuestRow guest={guest} key={guest.id} />}
            />
            <Table.Footer>
                <Pagination count={count} pageCount={pageCount} PAGE_SIZE={10} searchParamName="modalPage" />
            </Table.Footer>
        </Table>
    );
}

export default GuestTable;
