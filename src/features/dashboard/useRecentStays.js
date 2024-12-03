import { useSearchParams } from "react-router-dom";
import { getStaysAfterDate } from "../../services/apiBookings";
import { subDays } from "date-fns";
import { useQuery } from "@tanstack/react-query";

function useRecentStays() {

    const [searchParams] = useSearchParams();

    const numDays = !searchParams.get('last') ? 7 : Number(searchParams.get('last')); 

    const queryDate = subDays(new Date(), numDays).toISOString();

    const {isPending, data: stays} = useQuery({
        queryFn: () => getStaysAfterDate(queryDate),
        queryKey: ['stays', `last-${numDays}`],
    })

    // console.log(stays);

    const confirmedStays = stays?.filter(stay=>stay.status === 'checked-out' ||stay.status === 'checked-in' );

    // console.log(confirmedStays);

return {isPending, confirmedStays, numDays};
}

export default useRecentStays
 