import Heading from "../ui/Heading";
import UpdateSettingsForm from "../features/settings/UpdateSettingsForm";
import { StyledWrapperPage } from "./Users";

function Settings() {
    return (
        <StyledWrapperPage>
            <Heading as="h1">Update hotel settings</Heading>
            <UpdateSettingsForm />
        </StyledWrapperPage>
    );
}

export default Settings;
