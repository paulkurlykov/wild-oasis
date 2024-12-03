import { useQueryClient } from "@tanstack/react-query";
import { updateSetting } from "../../services/apiSettings";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

function useEditSettings() {
    const queryClient = useQueryClient();

    const { isPending, mutate, status } = useMutation({
        mutationFn: updateSetting,
        onSuccess: () => {
            console.log("Success function of the Update API Settings Mutation");
            toast.success("API Settings have been successfully updated!");
            queryClient.invalidateQueries({
                queryKey: ["settings"],
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

export default useEditSettings
