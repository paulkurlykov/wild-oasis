import { HiMiniMoon, HiSun } from "react-icons/hi2";
import ButtonIcon from "./ButtonIcon";
import { useDarkMode } from "../context/DarkModeContext";
function DarkModeToggle() {

    const {isDarkMode, toggleDarkMode} = useDarkMode()
    return (
        <ButtonIcon onClick={toggleDarkMode} >
            {isDarkMode ? <HiSun/> :  <HiMiniMoon />}
        </ButtonIcon>
    )
}

export default DarkModeToggle
 