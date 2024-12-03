import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { login as apiLogin } from "../../services/apiAuth";
import { toast } from "react-hot-toast";

export function useLogin() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    // console.log('useLogin is workin...');
    const { mutate: loginMutation, isPending: isLogining } = useMutation({
        mutationFn: ({ email, password }) => apiLogin({ email, password }),
        onSuccess: (user) => {
            navigate("/");
            queryClient.setQueryData(['user'], user.user);
            console.log(user);
            console.log('useLogin has been succeed');
        },
        onError: (err) => {
            console.log("ERROR", err);
            toast.error("login or password is incorrect");
        }
    });

    return { loginMutation, isLogining };
}
 
