import { useQuery } from "@tanstack/react-query";
import { getGuests } from "../../services/apiGuests";
import { useSearchParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { PAGE_SIZE } from "../../utils/constans";

export default function useGuests() {
    const [searchParams] = useSearchParams();
    const queryClient = useQueryClient();

    // console.log(searchParams);

    const modalPage = Number(searchParams.get("modalPage") || 1);



    const {
        data: dataObject,
        isPending: isGettingGuests,
    } = useQuery({
        queryKey: ["guests", modalPage],
        queryFn: () => getGuests({ modalPage }),
    });

    // prefetching

    if (!isGettingGuests) {
        const { data: guests, count } = dataObject;

        const pageCount = Math.ceil(count / PAGE_SIZE);

        if (modalPage < pageCount) {
            queryClient.prefetchQuery({
                queryKey: ["guests", +modalPage + 1],
                queryFn: () => getGuests({ modalPage: +modalPage + 1 }),
            });
        }

        if (modalPage > 1) {
            queryClient.prefetchQuery({
                queryKey: ["guests", +modalPage - 1],
                queryFn: () => getGuests({ modalPage: +modalPage - 1 }),
            });
        }

        // console.log(guests);

        return { guests, count };
    }

    return { isGettingGuests };
}
