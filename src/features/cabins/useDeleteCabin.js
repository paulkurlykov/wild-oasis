import { useQueryClient } from "@tanstack/react-query";
import { deleteCabin } from "../../services/apiCabins";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";


export default function useDeleteCabin() {
    const queryClient = useQueryClient();
    return useMutation({
            mutationFn: deleteCabin,
            onSuccess: () => {
              toast.success('Cabin successfully deleted!');
                queryClient.invalidateQueries({
                    queryKey: ["cabin"],
                });
            },
            onError: (err) => toast.error(`Cabin hasn't been deleted, cause: ${err.message}`),
        });

}



 
