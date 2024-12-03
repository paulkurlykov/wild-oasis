import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getBookings } from "../../services/apiBookings";
import { PAGE_SIZE } from "../../utils/constans";

export default function useBookings() {
    const [searchParams] = useSearchParams();
    const queryClient = useQueryClient();

    const filterValue = searchParams.get("status");
    const filter =
        !filterValue || filterValue === "all"
            ? null
            : { field: "status", value: filterValue, method: "eq" };

    const page = Number(searchParams.get("page") || 1);

    // fetching

    const { status, data: dataObject } = useQuery({
        queryKey: ["bookings", filter, page],
        queryFn: () => getBookings({ filter, page }),
    });


    // prefetching

    if (status === "success") {
        const { data: bookings, count } = dataObject;

        const pageCount = Math.ceil(count / PAGE_SIZE);

        if (page < pageCount) {
            queryClient.prefetchQuery({
                queryKey: ["bookings", filter, +page + 1],
                queryFn: () => getBookings({ filter, page: +page + 1 }),
            });
        }

        if (page > 1) {
            queryClient.prefetchQuery({
                queryKey: ["bookings", filter, +page - 1],
                queryFn: () => getBookings({ filter, page: +page - 1 }),
            });
        }

        return { bookings, count, status };
    }

    return { status };
}
