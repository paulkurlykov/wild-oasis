import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { signUp } from "../../services/apiAuth";
import { toast } from "react-hot-toast";

export function useSignUp() {
    const { mutate: signUpMutation, isPending: isSigningUp } = useMutation({
        mutationFn: ({fullName, email, password}) => signUp({fullName, email, password}),
        onSuccess: (user) => {
            console.log(user);
            toast.success("Account successfully created! Please, check your email")
        },
        onError: (err) => {
            console.log("ERROR", err);
            toast.error("Could not sign you up! Sorry...");
        }
    });

    return { signUpMutation, isSigningUp };
}
 

