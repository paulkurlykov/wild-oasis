import CreateGuestForm from "../guests/CreateGuestForm";
import CreateBookingForm from "./CreateBookingForm";
import CabinTable from "../cabins/CabinTable";
import GuestTable from "../guests/GuestTable";
import { styled } from "styled-components";
import Heading from "../../ui/Heading";
import { Img } from "../guests/GuestRow";
import { useState, useEffect } from "react";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import { HiArrowSmallLeft } from "react-icons/hi2";
import useGuest from "../guests/useGuest";
import Spinner from "../../ui/Spinner";
import { useParams, useSearchParams } from "react-router-dom";
import GuestBadge from "../guests/GuestBadge";
import CabinBadge from "../cabins/CabinBadge";
import { HiMiniCheckCircle } from "react-icons/hi2";
import PulseLoader from "react-spinners/PulseLoader";

const StyledBookingCreatingWrapper = styled.div`
    display: flex;
    flex-direction: column;
    color: var(--color-grey-800);
`;

const StyledIconHeader = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
`;

const StyledBookingSection = styled.div`
    display: flex;
    flex-direction: column;
`;

const StyledTableHeader = styled.div`
    display: flex;
    justify-content: space-between;
`;

function StartBookingCreating({ closeModal }) {
    const [isGuestPicked, setIsGuestPicked] = useState(false);
    const [isCreatingGuestOpen, setIsCreatingGuestOpen] = useState(false);
    const [isPickingGuestOpen, setIsPickingGuestOpen] = useState(false);
    const [isPickingCabinOpen, setIsPickingCabinOpen] = useState(false);
    const [isCabinPicked, setIsCabinPicked] = useState(false);

    const [searchParams, setSearchParams] = useSearchParams();

    const guestpar = searchParams.get("guestId");
    const cabinpar = searchParams.get("cabinId");

    const params = useParams();

    // console.log(params);

    useEffect(() => {
        if (guestpar) {
            setIsGuestPicked(true);
            setIsPickingGuestOpen(false);
        }

        if (cabinpar) {
            setIsCabinPicked(true);
            setIsPickingCabinOpen(false);
        }
    }, [guestpar, cabinpar]);

    const root = document.documentElement;
    const color = getComputedStyle(root).getPropertyValue("--color-grey-700").trim();

    // console.log(`isCabinPicked before render: ${isCabinPicked}`);

    return (
        <StyledBookingCreatingWrapper>
            <StyledBookingSection>
                <StyledTableHeader>
                    <Heading>
                        {isGuestPicked ? (
                            <StyledIconHeader>
                                <span>Guest is picked!</span>
                                <HiMiniCheckCircle color="green" size="2.5rem" />{" "}
                            </StyledIconHeader>
                        ) : (
                            <StyledIconHeader>
                                <span>Pick a guest</span>
                                <PulseLoader size={8} color={color} />
                            </StyledIconHeader>
                        )}
                    </Heading>
                    {isPickingGuestOpen && (
                        <Button onClick={() => setIsPickingGuestOpen(false)}>
                            <HiArrowSmallLeft />
                            Back
                        </Button>
                    )}
                </StyledTableHeader>
                {isGuestPicked ? (
                    <GuestBadge />
                ) : (
                    <>
                        <h2>Guest is not picked</h2>
                        {isCreatingGuestOpen || isPickingGuestOpen ? (
                            ""
                        ) : (
                            <ButtonGroup>
                                <Button onClick={() => setIsCreatingGuestOpen((st) => !st)}>
                                    Create a guest
                                </Button>
                                <Button onClick={() => setIsPickingGuestOpen((st) => !st)}>
                                    Pick guest
                                </Button>
                            </ButtonGroup>
                        )}
                    </>
                )}
                {isCreatingGuestOpen && <CreateGuestForm closeModal={setIsCreatingGuestOpen} />}
                {isPickingGuestOpen && <GuestTable />}
            </StyledBookingSection>
            {isGuestPicked && (
                <StyledBookingSection>
                    <StyledTableHeader>
                        <Heading>
                            {isCabinPicked ? (
                                <StyledIconHeader>
                                    <span>Cabin is picked!</span>
                                    <HiMiniCheckCircle color="green" size="2.5rem" />{" "}
                                </StyledIconHeader>
                            ) : (
                                <StyledIconHeader>
                                    <span>Pick a cabin</span>
                                    <PulseLoader size={8} />
                                </StyledIconHeader>
                            )}
                        </Heading>
                    </StyledTableHeader>
                    {isCabinPicked && <CabinBadge />}
                    {!isPickingCabinOpen && !isCabinPicked ? (
                        <Button onClick={() => setIsPickingCabinOpen((st) => !st)}>
                            Pick cabin
                        </Button>
                    ) : isPickingCabinOpen ? (
                        <CabinTable mode="picking" />
                    ) : (
                        ""
                    )}
                </StyledBookingSection>
            )}

            {isCabinPicked && (
                <StyledBookingSection>
                    <StyledTableHeader>
                        <Heading>
                            {
                                <StyledIconHeader>
                                    <span>Fill the booking form</span>
                                    <PulseLoader size={8} />
                                </StyledIconHeader>
                            }
                        </Heading>
                    </StyledTableHeader>
                    <CreateBookingForm closeModal={closeModal} />
                </StyledBookingSection>
            )}
        </StyledBookingCreatingWrapper>
    );
}

export default StartBookingCreating;
