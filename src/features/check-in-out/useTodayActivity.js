import { getStaysTodayActivity } from "../../services/apiBookings"
import { useQuery } from "@tanstack/react-query";

function useTodayActivity() {

const {data: activities, isPending} = useQuery({
    queryFn: getStaysTodayActivity,
    queryKey: ['today-activity']
});



    return {activities, isPending};
}

export default useTodayActivity
