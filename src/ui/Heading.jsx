import styled, { css } from "styled-components";

const Heading = styled.h1`
    ${(props) =>
        props.type === "h1" &&
        css`
            font-size: 4rem;
            font-weight: 700;
        `}

    ${(props) =>
        props.type === "h2" &&
        css`
            font-size: 3rem;
            font-weight: 600;
        `}

${(props) =>
        props.type === "h3" &&
        css`
            font-size: 2rem;
            font-weight: 500;
        `}

color: var(--color-grey-800);
`;

export default Heading;
