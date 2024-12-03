import DashboardFilter from "../features/dashboard/DashboardFilter";
import DashboardLayout from "../features/dashboard/DashboardLayout";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import { StyledWrapperPage } from "./Users";

function Dashboard() {
    return (
        <StyledWrapperPage>
            <Row type="horizontal">
                <Heading as="h1">Dashboard</Heading>
                <DashboardFilter/>
            </Row>
            <DashboardLayout />
        </StyledWrapperPage>
    );
}

export default Dashboard;
