import styled from "styled-components";
import { HiArrowSmallLeft, HiArrowSmallRight } from "react-icons/hi2";
import { useSearchParams } from "react-router-dom";

const StyledPagination = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const P = styled.p`
    font-size: 1.4rem;
    margin-left: 0.8rem;
    color: var(--color-grey-700);

    & span {
        font-weight: 600;
    }
`;

const Buttons = styled.div`
    display: flex;
    gap: 0.6rem;
    color: var(--color-grey-700);
`;

const PaginationButton = styled.button`
    background-color: ${(props) =>
        props.active ? " var(--color-brand-600)" : "var(--color-grey-50)"};
    color: ${(props) => (props.active ? " var(--color-brand-50)" : "")};
    border: none;
    border-radius: var(--border-radius-sm);
    font-weight: 500;
    font-size: 1.4rem;
    cursor: pointer;

    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.4rem;
    padding: 0.6rem 1.2rem;
    transition: all 0.3s;
    color: var(--color-grey-700);

    &:has(span:last-child) {
        padding-left: 0.4rem;
    }

    &:has(span:first-child) {
        padding-right: 0.4rem;
    }

    & svg {
        height: 1.8rem;
        width: 1.8rem;
    }

    &:hover:not(:disabled) {
        background-color: var(--color-brand-600);
        color: var(--color-brand-50);
    }

    &:disabled {
        color: var(--color-grey-300);
    }
`;

function Pagination({ count, pageCount, PAGE_SIZE, searchParamName }) {
    const [searchParams, setSearchParams] = useSearchParams();
    // const isModalOpen = searchParams.get("modalisopen");
    const currentPage = !searchParams.get(searchParamName)
        ? 1
        : Number(searchParams.get(searchParamName));

    function nextPage() {
        const next = currentPage === pageCount ? currentPage : currentPage + 1;
        searchParams.set(searchParamName, next);
        setSearchParams(searchParams);
    }
    function previousPage() {
        const prev = currentPage === 1 ? currentPage : currentPage - 1;
        searchParams.set(searchParamName, prev);
        setSearchParams(searchParams);
    }

    return (
        <StyledPagination>
            <P>
                Showing <span>{(currentPage - 1) * PAGE_SIZE + 1}</span> to{" "}
                <span>{currentPage === pageCount ? count : currentPage * PAGE_SIZE}</span> of{" "}
                <span>{count}</span> results
            </P>

            {pageCount > 1 && (
                <Buttons>
                    <PaginationButton onClick={previousPage} disabled={currentPage === 1}>
                        <HiArrowSmallLeft />
                        <span>Previous</span>
                    </PaginationButton>
                    <PaginationButton onClick={nextPage} disabled={currentPage === pageCount}>
                        <span>Next</span>
                        <HiArrowSmallRight />
                    </PaginationButton>
                </Buttons>
            )}
        </StyledPagination>
    );
}

export default Pagination;
