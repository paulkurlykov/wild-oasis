import { useQueryClient } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createBooking } from "../../services/apiBookings";

export default function useCreatingBooking() {
    const queryClient = useQueryClient();

    const { isPending: isCreatingBooking, mutate: createBookingMutate } = useMutation({
        mutationFn: createBooking,
        onSuccess: () => {
            console.log("Success function of the Create Booking Mutation");
            toast.success("Booking has been successfully added!");
            queryClient.invalidateQueries({
                queryKey: ["booking"],
            });
        },
        onError: (err) => console.error(err),
    });

    return {
        isCreatingBooking,
        createBookingMutate,
    };
}
