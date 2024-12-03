import { useQueryClient } from "@tanstack/react-query";
import { deleteBooking } from "../../services/apiBookings";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";


export default function useDeleteBooking() {
    const queryClient = useQueryClient();
    return useMutation({
            mutationFn: deleteBooking,
            onSuccess: () => {
              toast.success('Booking successfully deleted!');
                queryClient.invalidateQueries({
                    queryKey: ["bookings"],
                });
            },
            onError: (err) => toast.error(`Booking hasn't been deleted, cause: ${err.message}`),
        });


}



 
 