import Select from "./Select"
import { useSearchParams } from "react-router-dom"

function SortBy({ options }) {
    const [searchParams, setSearchParams] = useSearchParams();
    const sortBy = searchParams.get('sortBy') || options[0]?.value;

    // console.log(sortBy);

    function handleChange(e) {
        searchParams.set("sortBy", e.target.value);
        setSearchParams(searchParams);
    }

    return (
       <Select onChange={handleChange} options={options} value={sortBy} type="white" />
       
    )
}

export default SortBy
