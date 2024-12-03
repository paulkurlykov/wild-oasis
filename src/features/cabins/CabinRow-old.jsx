import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import Row from "../../ui/Row";
import { useState } from "react";
import CreateCabinForm from "./CreateCabinForm";
import useDeleteCabin from "./useDeleteCabin";
import { HiOutlineTrash, HiOutlinePencil, HiOutlineSquare2Stack } from "react-icons/hi2";
import useCreatingCabin from "./useCreatingCabin";
import Spinner from "../../ui/Spinner";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

const TableRow = styled.div`
    display: grid;
    grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
    column-gap: 2.4rem;
    align-items: center;
    padding: 1.4rem 2.4rem;

    &:not(:last-child) {
        border-bottom: 1px solid var(--color-grey-100);
    }
`;

const Img = styled.img`
    display: block;
    width: 6.4rem;
    aspect-ratio: 3 / 2;
    object-fit: cover;
    object-position: center;
    transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
    font-size: 1.6rem;
    font-weight: 600;
    color: var(--color-grey-600);
    font-family: "Sono";
`;

const Price = styled.div`
    font-family: "Sono";
    font-weight: 600;
`;

const Discount = styled.div`
    font-family: "Sono";
    font-weight: 500;
    color: var(--color-green-700);
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

function CabinRow({ cabin }) {
    const { name, maxCapacity, regularPrice, discount, image, id: cabinID } = cabin;
    const [showForm, setShowForm] = useState(false);
    const { isPending: isCreating, mutate: mutateCreateCabin } = useCreatingCabin();

    const { isPending: isDeleting, status, mutate: mutateDeleteCabin } = useDeleteCabin();

    const toggleForm = () => setShowForm((show) => !show);

    const isLoading = isCreating || isDeleting;

    return (
        <>
            {isLoading ? (
                <Spinner />
            ) : (
                <Table.Row>
                    <Img src={image} />
                    <Cabin>{name}</Cabin>
                    <div>Fits up to {maxCapacity}</div>
                    <Price>{formatCurrency(regularPrice)}</Price>
                    <Discount>{formatCurrency(discount)}</Discount>
                    <Row>
                        <Icon
                            onClick={() =>
                                mutateCreateCabin({
                                    name: `Copy of ${name}`,
                                    maxCapacity,
                                    regularPrice,
                                    discount,
                                    image,
                                })
                            }
                            disabled={isLoading}>
                            <HiOutlineSquare2Stack />
                        </Icon>
                        <Icon onClick={toggleForm} disabled={isLoading}>
                            <HiOutlinePencil />
                        </Icon>
                        <Modal>
                            <Modal.Open opens="delete-cabin">
                                <Icon
                                >
                                    <HiOutlineTrash />
                                </Icon>
                            </Modal.Open>
                            <Modal.Window name="delete-cabin">
                                <ConfirmDelete
                                    resourceName="cabins"
                                    disabled={isLoading}
                                    onConfirm={() => mutateDeleteCabin(cabinID)}
                                />
                            </Modal.Window>
                        </Modal>
                        <Menus.Menu>
                            <Menus.Toggle id={cabinID} />
                            <Menus.List id={cabinID}>
                                <Menus.Button
                                    icon={
                                        <Icon
                                            onClick={() =>
                                                mutateCreateCabin({
                                                    name: `Copy of ${name}`,
                                                    maxCapacity,
                                                    regularPrice,
                                                    discount,
                                                    image,
                                                })
                                            }>
                                            <HiOutlineSquare2Stack />
                                        </Icon>
                                    }>
                                    Duplicate
                                </Menus.Button>
                                <Menus.Button
                                    icon={
                                        <Icon onClick={toggleForm}>
                                            <HiOutlinePencil />
                                        </Icon>
                                    }>
                                    Edit
                                </Menus.Button>
                                <Menus.Button
                                    icon={
                                        <Icon onClick={() => mutateDeleteCabin(cabinID)}>
                                            <HiOutlineTrash />
                                        </Icon>
                                    }>
                                    Delete
                                </Menus.Button>
                            </Menus.List>
                        </Menus.Menu>
                    </Row>
                </Table.Row>
            )}
            {showForm && <CreateCabinForm cabinToEdit={cabin} onEditSuccess={toggleForm} />}
        </>
    );
}

export default CabinRow;
