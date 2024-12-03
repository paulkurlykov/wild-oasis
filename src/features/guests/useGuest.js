import { useQuery } from "@tanstack/react-query";
import { useParams, useSearchParams } from "react-router-dom";
import { getGuest } from "../../services/apiGuests";



export default function useGuest() {

    // console.log("useGuest is run");

    const [searchParams, setSearchParams] = useSearchParams();


    const guestId = searchParams.get('guestId');
    if(!guestId) return;

    // console.log(guestId);

    // const guestId = 12;

    // console.log(bookingId);

    const {isPending: isGettingGuest, data: guest } =  useQuery({
        queryKey: ["guest", guestId],
        queryFn: () => getGuest(guestId),
        retry: false,
    });

    return {isGettingGuest, guest}
}


