import ButtonIcon from "../../ui/ButtonIcon"
import { HiMiniArrowRightStartOnRectangle } from "react-icons/hi2";
import useLogout from "./useLogout";
import { styled } from "styled-components";

const StyledSpan = styled.span`
color: var(--color-grey-700);
`

function Logout() {
    const {logOutMutation, isLogingOut} = useLogout();
    return (
        <ButtonIcon 
        disabled={isLogingOut}
        onClick={logOutMutation}
        
        >
            {isLogingOut ? <SpinnerMini/> : <HiMiniArrowRightStartOnRectangle />}
        </ButtonIcon>
    )
}

export default Logout
