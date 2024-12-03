import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { logOut } from "../../services/apiAuth"

function useLogout() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const {mutate: logOutMutation, isPending: isLoggingOut} = useMutation({
        mutationFn: logOut,
        onSuccess: () => {
            queryClient.removeQueries();
            navigate('/login', {replace: true});
            toast.success('You have logged out!');
        },
        onError: (err) => {
            toast.error(`couldn't log out cause an error: ${err}`)
        }
    })

    return {logOutMutation, isLoggingOut};
}

export default useLogout
