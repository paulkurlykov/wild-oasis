import { useQueryClient } from "@tanstack/react-query";
import { updateCurrentUser } from "../../services/apiAuth";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

function useUpdateUser() {
    const queryClient = useQueryClient();

    const { isPending: isUpdatingUser, mutate: updateUserMutation } = useMutation({
        mutationFn: updateCurrentUser,
        onSuccess: ({ user }) => {
            toast.success("User has been successfully updated!");
            queryClient.setQueryData(["user"], user);
            queryClient.invalidateQueries({
                queryKey: ["user"],
            });
            
        },
        onError: (err) => console.error(err),
    });

    return {
        isUpdatingUser,
        updateUserMutation,
    };
}

export default useUpdateUser;
