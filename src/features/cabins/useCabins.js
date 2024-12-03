import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";



export default function useCabins() {
    return useQuery({
        queryKey: ["cabins"],
        queryFn: getCabins,
    });

}


