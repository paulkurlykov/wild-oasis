import { useQueryClient } from "@tanstack/react-query";
import { createEditGuest } from "../../services/apiGuests";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useSearchParams } from "react-router-dom";

export default function useCreatingGuest() {
    const queryClient = useQueryClient();

    const [searchParams, setSearchParams] = useSearchParams();

    const { isPending: isGuestUploading, mutate: createGuestMutation } = useMutation({
        mutationFn: createEditGuest,
        onSuccess: (guest) => {
            console.log("Success function of the Create Guest Mutation");
            toast.success("Guest has been successfully added!");
            queryClient.setQueryData(["guest"], guest);
            queryClient.invalidateQueries({
                queryKey: ["guest"],
            });
            searchParams.set("guestId", guest.id);
            setSearchParams(searchParams);
        },
        onError: (err) => console.error(err),
    });

    return {
        isGuestUploading,
        createGuestMutation,
    };
}
