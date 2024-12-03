import useCabin from "./useCabin";
import Spinner from "../../ui/Spinner";
import { styled } from "styled-components";
import { Img } from "../guests/GuestRow";
import { useEffect } from "react";
import {
    StyledBadgeTable,
    StyledBadgeItem,
    StyledBadgeImg,
    StyledImgWrapper,
} from "../guests/GuestBadge";

function CabinBadge() {
    // console.log("it is cabinBadge!");
    const { cabin, isGettingCabin } = useCabin();
    if (isGettingCabin) return <Spinner />;

    if (!cabin) return <Spinner />;

    const { name, id, regularPrice, image, maxCapacity } = cabin;

    return (
        <StyledBadgeTable rows="4">
            <StyledBadgeItem type="label" gridrow="1/2" gridcol="1/2">
                ID
            </StyledBadgeItem>
            <StyledBadgeItem type="label" gridrow="2/3" gridcol="1/2">
                Name
            </StyledBadgeItem>
            <StyledBadgeItem type="label" gridrow="3/4" gridcol="1/2">
                Price
            </StyledBadgeItem>
            <StyledBadgeItem type="label" gridrow="4/-1" gridcol="1/2">
                Max Capacity
            </StyledBadgeItem>
            <StyledBadgeItem gridrow="1/2" gridcol="2/3">
                {id}
            </StyledBadgeItem>
            <StyledBadgeItem gridrow="2/3" gridcol="2/3">
                {name}
            </StyledBadgeItem>
            <StyledBadgeItem gridrow="3/4" gridcol="2/3">
                {regularPrice}
            </StyledBadgeItem>
            <StyledBadgeItem gridrow="4/-1" gridcol="2/3">
                {maxCapacity}
            </StyledBadgeItem>
            <StyledBadgeItem  gridrow="1/-1" gridcol="4/-1" >
                <StyledImgWrapper>
                    <StyledBadgeImg src={image} />
                </StyledImgWrapper>
            </StyledBadgeItem>
        </StyledBadgeTable>
    );
}

export default CabinBadge;
