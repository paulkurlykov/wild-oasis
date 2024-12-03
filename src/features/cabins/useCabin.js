import { useQuery } from "@tanstack/react-query";
import { useParams, useSearchParams } from "react-router-dom";
import { getCabin } from "../../services/apiCabins";



export default function useCabin() {

    // console.log("useCabin is run");

    const [searchParams, setSearchParams] = useSearchParams();


    const cabinId = searchParams.get('cabinId');
    if(!cabinId) return;

    // console.log(cabinId);

    // const guestId = 12;

    // console.log(bookingId);

    const {isPending: isGettingCabin, data: cabin } =  useQuery({
        queryKey: ["cabin", cabinId],
        queryFn: () => getCabin(cabinId),
        retry: false,
    });

    return {isGettingCabin, cabin}
}


