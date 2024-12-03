import Stat from "./Stat";
import { HiOutlineBanknotes, HiOutlineBriefcase, HiOutlineCalendarDays, HiOutlineChartBar } from "react-icons/hi2";
import { formatCurrency } from "../../utils/helpers";


function Stats({bookings, confirmedStays = [], numDays, cabinCount}) {

    // console.log(confirmedStays);

// 1. Number of bookings

const numBookings = bookings.length;

// 2. 

const sales = formatCurrency(bookings.reduce((acc, cur) => acc + cur.totalPrice, 0));

// 3.

const checkins = confirmedStays.length;

// 4.

const occupations = confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) / (numDays * cabinCount);

return (

    <>
            <Stat title="Bookings" color="blue" icon={<HiOutlineBriefcase/>} value={numBookings} />
            <Stat title="Sales" color="green" icon={<HiOutlineBanknotes/>} value={sales} />
            <Stat title="Check ins" color="indigo" icon={<HiOutlineCalendarDays/>} value={checkins} />
            <Stat title="Occupancy rate" color="yellow" icon={<HiOutlineChartBar/>} value={Math.round(occupations * 100) + "%"} />
        </>
    )
    
}

export default Stats
