import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";


function useSettings() {
    const { isPending, error, data } = useQuery({
        queryKey: ["settings"],
        queryFn: getSettings,
    });

    return { isPending, error, data };
}

export default useSettings;
