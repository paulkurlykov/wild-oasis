import Heading from "../ui/Heading";
import Row from "../ui/Row";
import { getCabins } from "../services/apiCabins";
import CabinTable from "../features/cabins/CabinTable";
import AddCabin from "../features/cabins/AddCabin";
import Filter from "../ui/Filter";
import CabinTableOperations from "../features/cabins/CabinTableOperations";

function Cabins() {
    // const cabins = useLoaderData();
    // console.log(cabins);
    return (
        <>
            <Row type="horizontal">
                <Heading type="h1" as="h1">
                    All cabins
                </Heading>
               <CabinTableOperations/>

            </Row>
            <Row type="vertical">
                <CabinTable />
            </Row>
            <AddCabin />
        </>
    );
}

export default Cabins;

export async function cabinsLoader() {
    const cabins = await getCabins();
    return cabins;
}
