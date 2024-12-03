import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { updateBooking } from "../../services/apiBookings";

function useCheckIn() {

    const queryClient = useQueryClient();
    const navigate = useNavigate();

const {mutate: checkinMutation, isLoading: isCheckingIn} = useMutation({
    mutationFn: ({bookingId, breakfast})=> updateBooking(bookingId, {
        status: "checked-in",
        isPaid: true,
        ...breakfast,
    }),
    onSuccess: (data) => {
        console.log("Success function of the Checkin IN");
        toast.success(`The guest #${data.id} has been successfully checked IN!`);
        queryClient.invalidateQueries({active: true});
        navigate('/');
    },
    onError: (err) => console.error(err),
});



    return {checkinMutation, isCheckingIn}
}

export default useCheckIn 
