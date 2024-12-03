import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { updateBooking } from "../../services/apiBookings";

function useCheckOut() {

    const queryClient = useQueryClient();
    const navigate = useNavigate();

const {mutate: checkOutMutation, isLoading: isCheckingOut} = useMutation({
    mutationFn: (bookingId)=> updateBooking(bookingId, {
        status: "checked-out",
    }),
    onSuccess: (data) => {
        console.log("Success function of the Checking Out");
        toast.success(`The guest #${data.id} has been successfully checked out!`);
        queryClient.invalidateQueries({active: true});
        navigate('/');
    },
    onError: (err) => console.error(err),
});



    return {checkOutMutation, isCheckingOut}
}

export default useCheckOut 
