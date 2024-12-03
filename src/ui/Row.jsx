import { styled,css } from "styled-components";

const Row = styled.div`
${(props) =>
        props.type === "horizontal" &&
        css`
            justify-content: space-between;
            align-items: center;
        `}
${(props) =>
        props.type === "vertical" &&
        css`
            flex-direction: column;
        `}
    display: flex;
    gap: 1.5rem;
`

Row.defaultProps = {
    type: "horizontal",
}

export default Row;