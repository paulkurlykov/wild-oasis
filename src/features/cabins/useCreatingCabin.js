import { useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

export default function useCreatingCabin() {
    const queryClient = useQueryClient();

    const { isPending, mutate, status } = useMutation({
        mutationFn: createEditCabin,
        onSuccess: () => {
            console.log("Success function of the Create Cabin Mutation");
            toast.success("Cabin has been successfully added!");
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
