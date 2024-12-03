import { styled } from "styled-components";

const StyledImg = styled.img`
    width: 100%;
`;

function Img({ src, alt }) {
    return (
        <StyledImg src={src} alt={alt} />
    );
}

export default Img;
