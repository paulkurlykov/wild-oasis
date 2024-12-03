import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useForm } from "react-hook-form";
import useSettings from "./useSettings";
import Spinner from "../../ui/Spinner";
import useEditSettings from "./useEditSettings";
import { useEffect } from "react";

function UpdateSettingsForm() {
    const { isPending: isLoading, error, data } = useSettings();
    const { isPending: isUpdating, mutate: mutateEditSettings, status } = useEditSettings();

    function handleUpdate(e, field) {
        if (!e) return;
        const newValue = Number(e.target.value);
        const oldValue = data[field] ? Number(data[field]) : null;
        if (newValue === oldValue) return;
        console.log(newValue);
        console.log(data[field]);

        mutateEditSettings({ [field]: newValue });
    }

    useEffect(()=>{
      const widgetLinks = document.querySelectorAll("a[href*='widget.yourgood']");
      console.log(widgetLinks);
      widgetLinks.forEach(link=> link.style.cursor = "pointer");
    },[isLoading])

    return (
        <>
            {isLoading ? (
                <Spinner />
            ) : (
                <Form>
                    <FormRow label="Minimum nights/booking">
                        <Input
                            type="number"
                            id="min-nights"
                            defaultValue={data.minBookingLength}
                            onBlur={(e) => {
                                handleUpdate(e, "minBookingLength");
                            }}
                            disabled={isUpdating}
                        />
                        {isUpdating && <Spinner />}
                    </FormRow>
                    <FormRow label="Maximum nights/booking">
                        <Input
                            type="number"
                            id="max-nights"
                            defaultValue={data.maxBookingLength}
                            onBlur={(e) => {
                                handleUpdate(e, "maxBookingLength");
                            }}
                            disabled={isUpdating}
                        />
                    </FormRow>
                    <FormRow label="Maximum guests/booking">
                        <Input
                            type="number"
                            id="max-guests"
                            defaultValue={data.maxGuestsPerBooking}
                            onBlur={(e) => {
                                handleUpdate(e, "maxGuestsPerBooking");
                            }}
                            disabled={isUpdating}
                        />
                    </FormRow>
                    <FormRow label="Breakfast price">
                        <Input
                            type="number"
                            id="breakfast-price"
                            defaultValue={data.breakfastPrice}
                            onBlur={(e) => {
                                handleUpdate(e, "breakfastPrice");
                            }}
                            disabled={isUpdating}
                        />
                    </FormRow>
                </Form>
            )}
        </>
    );
}

export default UpdateSettingsForm;


