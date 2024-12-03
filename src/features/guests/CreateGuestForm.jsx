import styled from "styled-components";
import countries from "../../data/countries.json";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";
import Spinner from "../../ui/Spinner";
import { useForm, Controller } from "react-hook-form";
import { mailValidationPattern } from "../../utils/constans";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { getFlagUrl } from "../../utils/helpers";
import FormWrapper from "../../ui/FormWrapper";
import ButtonGroup from "../../ui/ButtonGroup";
import { useState } from "react";

import useCreatingGuest from "./useCreatingGuest";

function CreateGuestForm({ closeModal }) {

const [query, setQuery] = useState("");

    const {
        register,
        handleSubmit,
        reset,
        getValues,
        control,
        formState: { errors },
    } = useForm();

    const { isGuestUploading, createGuestMutation } = useCreatingGuest();

    function onSubmit(data) {
        console.log("submitted!! ");
        // console.log(data);
        const nationality = data.nationality.slice(0, -5).trim();
        const countryCode = data.nationality.slice(data.nationality.length - 3).trim();

        createGuestMutation(
            {
                fullName: data.fullName,
                email: data.email,
                nationality,
                nationalID: Math.random() * 10000000,
                countryFlag: getFlagUrl(countryCode),
            },
            {
                onSuccess: () => {
                    closeModal();
                },
            }
        );
    }

    function onError(error) {
        console.log(error);
    }

    // console.log(countries);

    // const countries = [];

    const filteredCountries = countries
        .filter((country) => {
            return country.en_short_name.includes(query);
        })
        .map((country) => `${country.nationality}, ${country.alpha_2_code}`);

    // console.log(filteredCountries);
    // console.log(closeModal);

    return (
        <FormWrapper header="Add guest">
            <Form
                onSubmit={handleSubmit(onSubmit, onError)}
                type={closeModal ? "modal" : "regular"}>
                <FormRow label="fullName" error={errors?.fullName?.message}>
                    <Input
                        type="text"
                        id="fullName"
                        {...register("fullName", { required: "This filed is required!" })}
                    />
                </FormRow>

                <FormRow label="email" error={errors?.email?.message}>
                    <Input
                        type="text"
                        id="email"
                        {...register("email", {
                            required: "This field is required!",
                            pattern: {
                                value: mailValidationPattern,
                                message: "Please, provide a valid email adress!",
                            },
                        })}
                    />
                </FormRow>

                <FormRow label="nationality" error={errors?.nationality?.message}>
                    <Controller
                        name="nationality"
                        control={control}
                        defaultValue=""
                        rules={{ required: "This field is required!" }}
                        render={({ field }) => (
                            <Autocomplete
                                {...field}
                                options={filteredCountries}
                                value={field.value || null} // Значение из формы
                                onChange={(event, newValue) => {
                                    field.onChange(newValue); // Обновляем значение в форме
                                    setQuery(newValue || ""); // Обновляем локальное состояние
                                }}
                                inputValue={query} // Значение, отображаемое в поле
                                onInputChange={(event, newInputValue) => setQuery(newInputValue)} // Для обработки ввода
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label=""
                                        error={!!errors?.nationality}
                                        helperText={errors?.nationality?.message}
                                    />
                                )}
                                disablePortal
                                clearOnBlur={false}
                                sx={{ width: "100%" }}
                            />
                        )}
                    />
                </FormRow>

                <FormRow label="Description for website" error={errors?.description?.message}>
                    <Textarea
                        type="number"
                        id="description"
                        defaultValue=""
                        {...register("description", { required: "This filed is required!" })}
                    />
                </FormRow>

                <FormRow>
                    <ButtonGroup>
                        <Button onClick={() => closeModal(false)} variation="secondary" type="reset">
                            Cancel
                        </Button>
                        <Button>Add Guest</Button>
                    </ButtonGroup>
                </FormRow>
            </Form>
        </FormWrapper>
    );
}

export default CreateGuestForm;
