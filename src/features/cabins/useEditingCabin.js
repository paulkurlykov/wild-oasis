import { useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

function useEditingCabin() {
    const queryClient = useQueryClient();

    const { isPending, mutate, status } = useMutation({
        mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
        onSuccess: () => {
            console.log("Success function of the Edit Cabin Mutation");
            toast.success("Cabin has been successfully updated!");
            queryClient.invalidateQueries({
                queryKey: ["cabin"],
            });
        },
        onError: (err) => console.error(err),
    });

    return {
        isPending,
        mutate,
        status,
    };
}

export default useEditingCabin;
