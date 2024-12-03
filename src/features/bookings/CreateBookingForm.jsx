import styled from "styled-components";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";
import Spinner from "../../ui/Spinner";
import { useForm, Controller, useWatch } from "react-hook-form";
import { mailValidationPattern } from "../../utils/constans";
import useCreatingBooking from "./useCreatingBooking";
import Select from "../../ui/Select";
import { bookingStatuses as fullBookingStatuses } from "../../utils/constans";
import Checkbox from "../../ui/Checkbox";
import { useState, useEffect } from "react";
import Heading from "../../ui/Heading";
import FormWrapper from "../../ui/FormWrapper";
import ButtonGroup from "../../ui/ButtonGroup";
import useGuest from "../guests/useGuest";
import useCabin from "../cabins/useCabin";
import { useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { addDays } from "date-fns";

const StyledFormBodyBox = styled.div`
    display: flex;
    flex-direction: column;
    gap: 3rem;
`;

function CreateBookingForm({ closeModal }) {
    const bookingStatuses = fullBookingStatuses.filter((status) => status.value !== "all");

    const [searchParams, setSearchParams] = useSearchParams();
    const [isPaid, setIsPaid] = useState(false);
    const [hasBreakfast, setHasBreakfast] = useState(false);
    const [bookingStatus, setBookingStatus] = useState(bookingStatuses[0].value);
    // const [totalPriceValue, setTotalPriceValue] = useState(0);
    // const [extrasPrice, setExtrasPrice] = useState("");

    const statusInputHandler = (e) => {
        console.log("change");
        return setBookingStatus(e.target.value);
    };

    
    const {
        register,
        handleSubmit,
        reset,
        resetField,
        getValues,
        control,
        setValue,
        watch,
        formState: { errors },
    } = useForm();
    
    const { isCreatingBooking, createBookingMutate } = useCreatingBooking();
    const { guest, isGettingGuest } = useGuest();
    const { isGettingCabin, cabin } = useCabin();
    const extrasPrice = watch("extrasPrice");
    
    useEffect(() => {
        if(!cabin) return;
        const { regularPrice } = cabin;
        const totalPrice = Number(extrasPrice) + regularPrice;
        resetField("totalPrice", {defaultValue: totalPrice});
    }, [resetField, extrasPrice, cabin]);
    
    if (isCreatingBooking || isGettingCabin || isGettingGuest) return <Spinner />;
    // console.log(guest);
    // console.log(cabin);

    function onSubmit(data) {
        console.log("BOOKING IS SENT!");
        // console.log(data);

        const {startDate, numNights, regularPrice} = data;

        const finalData = {...data, cabinId: cabin.id, guestId: guest.id, endDate: addDays(startDate, numNights), cabinPrice: cabin.regularPrice };

        const endDate = addDays(startDate, numNights);
        console.log(endDate);

        console.log(finalData);



        createBookingMutate(
            finalData,
            {
                onSuccess: () => {
                    closeModal();
                    reset();
                },
            }
        );
    }

    function onError(error) {
        console.log(error);
    }

    // console.log(cabin.regularPrice);

    return (
        <FormWrapper>
            <Form
                onSubmit={handleSubmit(onSubmit, onError)}
                type={closeModal ? "modal" : "regular"}>
                <FormRow label="Extra Price" error={errors?.extrasPrice?.message}>
                    <Input type="number" id="extrasPrice" {...register("extrasPrice")} />
                </FormRow>

                <FormRow label={`Number of guests (up to ${cabin.maxCapacity})`} error={errors?.numGuests?.message}>
                    <Input
                        type="number"
                        id="numGuests"
                        {...register("numGuests", {
                            required: "please, specify number of guests",
                            max: {
                                value: cabin.maxCapacity,
                                message: `A max capacity of choosen cabin is the ${cabin.maxCapacity}. Please, input a correct number`,
                            },
                        })}
                    />
                </FormRow>

                <FormRow label="Number of nights" error={errors?.numNights?.message}>
                    <Input
                        type="number"
                        id="numNights"
                        {...register("numNights", { required: true })}
                    />
                </FormRow>

                <FormRow label="Starting date" error={errors?.startDate?.message}>
                    <Input
                        type="date"
                        id="startDate"
                        {...register("startDate", { required: true })}
                    />
                </FormRow>

                <FormRow label="Total Price" error={errors?.totalPrice?.message}>
                    <Input
                        type="number"
                        id="totalPrice"
                        readOnly
                        {...register("totalPrice", {
                            required: false,
                        })}
                    />
                </FormRow>

                <FormRow label="Status" error={errors?.status?.message}>
                    <Controller
                        name="status" // Имя поля, соответствующее вашему `register`
                        control={control} // Контроль из useForm()
                        defaultValue="" // Установите начальное значение
                        render={({ field }) => (
                            <Select
                                options={bookingStatuses}
                                value={field.value} // Значение контролируется react-hook-form
                                onChange={(e) => {
                                    field.onChange(e.target.value); // Передаем значение в react-hook-form
                                    setBookingStatus(e.target.value); // Обновляем локальное состояние, если нужно
                                }}
                            />
                        )}
                    />
                </FormRow>

                <FormRow label="Observations" error={errors?.observation?.message}>
                    <Input
                        type="text"
                        id="observations"
                        {...register("observations", {
                            required: "please, leave a short comment.",
                        })}
                    />
                </FormRow>

                <FormRow error={errors?.hasBreakfast?.message}>
                    <Controller
                        control={control}
                        name="hasBreakfast"
                        defaultValue={false}
                        render={({ field }) => (
                            <Checkbox
                                id="hasBreakfast"
                                checked={field.value}
                                disabled={field.disabled}
                                onChange={(e) => {
                                    field.onChange(e.target.checked);
                                    setHasBreakfast((state) => !state);
                                }}
                                // ref={null}
                            >
                                Breakfast is included
                            </Checkbox>
                        )}
                    />
                </FormRow>

                <FormRow error={errors?.isPaid?.message}>
                    <Controller
                        name="isPaid"
                        control={control}
                        defaultValue={false}
                        render={({ field }) => (
                            <Checkbox
                                id="isPaid"
                                checked={field.value}
                                disabled={field.disabled}
                                onChange={(e) => {
                                    field.onChange(e.target.checked);
                                    setIsPaid((state) => !state);
                                }}
                                // ref={null}
                            >
                                Booking is paid
                            </Checkbox>
                        )}
                    />
                </FormRow>
                <FormRow>
                    <ButtonGroup>
                        <Button onClick={closeModal} variation="secondary" type="reset">
                            Cancel
                        </Button>
                        <Button>Send booking</Button>
                    </ButtonGroup>
                </FormRow>
            </Form>
        </FormWrapper>
    );
}

export default CreateBookingForm;
