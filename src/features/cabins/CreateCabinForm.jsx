import styled from "styled-components";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";

import { useForm } from "react-hook-form";
import FormRow from "../../ui/FormRow";
import Spinner from "../../ui/Spinner";
import useCreatingCabin from "./useCreatingCabin";
import useEditingCabin from "./useEditingCabin";

function CreateCabinForm({ cabinToEdit, onEditSuccess, onCreateSuccess, closeModal }) {
    const { id: editID, ...editValues } = cabinToEdit || {}; // получаем id, только если жмем edit, а не add new
    const isEditSession = Boolean(editID); // если передали editID, значит мы редачим, а не создаем. Ключевой момент

    const {
        register,
        handleSubmit,
        reset,
        getValues,
        formState: { errors },
    } = useForm({
        defaultValues: isEditSession ? editValues : {}, // если редачим, подставляем текущие свойства как default
    });

    const {
        isPending: isCreating,
        mutate: mutateCreateCabin,
        status: creatingStatus,
    } = useCreatingCabin();

    const {
        isPending: isEditing,
        mutate: mutateEditCabin,
        status: editingStatus,
    } = useEditingCabin();

    const isLoading = isCreating || isEditing;
    console.log(isLoading);

    function onSubmit(data) {
        const image = typeof data.image === "string" ? data.image : data.image[0];
        if (isEditSession)
            mutateEditCabin(
                { newCabinData: { ...data, image: image }, id: editID },
                { onSuccess: () => {
                    closeModal();
                } }
            );
        else
            mutateCreateCabin(
                { ...data, image },
                {
                    onSuccess: () => {
                        console.log(closeModal);
                        console.log(closeModal());
                        closeModal();
                        reset();
                    },
                }
            );
    }

    function onError(error) {
        console.log(error);
    }

    return (
        <>
            {isLoading ? (
                <Spinner />
            ) : (
                <Form onSubmit={handleSubmit(onSubmit, onError)} type={closeModal ? 'modal' : 'regular'} >
                    <FormRow label="Cabin name" error={errors?.name?.message}>
                        <Input
                            disabled={isCreating || isEditing}
                            type="text"
                            id="name"
                            {...register("name", { required: "This filed is required!" })}
                        />
                    </FormRow>

                    <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
                        <Input
                            disabled={isCreating || isEditing}
                            type="number"
                            id="maxCapacity"
                            {...register("maxCapacity", {
                                required: "This filed is required!",
                                min: 1,
                                max: 12,
                            })}
                        />
                    </FormRow>

                    <FormRow label="Regular Price" error={errors?.regularPrice?.message}>
                        <Input
                            disabled={isCreating || isEditing}
                            type="number"
                            id="regularPrice"
                            {...register("regularPrice", {
                                required: "This filed is required!",
                                min: 1,
                                max: 1200,
                            })}
                        />
                    </FormRow>

                    <FormRow label="Discount" error={errors?.discount?.message}>
                        <Input
                            disabled={isCreating || isEditing}
                            type="number"
                            id="discount"
                            defaultValue={0}
                            {...register("discount", {
                                required: "This filed is required!",
                                min: 0,
                                max: 1200,
                                validate: (value) =>
                                    value < getValues().regularPrice ||
                                    "Discount should be less than the regular price",
                            })}
                        />
                    </FormRow>

                    <FormRow label="Description for website" error={errors?.description?.message}>
                        <Textarea
                            disabled={isCreating || isEditing}
                            type="number"
                            id="description"
                            defaultValue=""
                            {...register("description", { required: "This filed is required!" })}
                        />
                    </FormRow>

                    <FormRow label="Cabin photo">
                        <FileInput
                            id="image"
                            accept="image/*"
                            {...register("image", {
                                required: isEditSession ? false : "This filed is required!",
                            })}
                        />
                    </FormRow>

                    <FormRow>
                        <Button onClick={closeModal} variation="secondary" type="reset">
                            Cancel
                        </Button>
                        <Button disabled={isCreating}>
                            {isEditSession ? "Edit cabin" : "Add cabin"}
                        </Button>
                    </FormRow>
                </Form>
            )}
        </>
    );
}

export default CreateCabinForm;
