import styled from "styled-components";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";

import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { createCabin } from "../../services/apiCabins";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import FormRow from "../../ui/FormRow";



function CreateCabinForm() {
  const { register, handleSubmit, reset, getValues, formState: {errors} } = useForm();

  const queryClient = useQueryClient();
  const { isLoading: isUploading, mutate, status } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      console.log('mutation function was successful');
      toast.success('Cabin has been successfully added!');
        queryClient.invalidateQueries({
            queryKey: ["cabin"],
        });
        reset();
    },
    onError: (err)=> console.error(err),
});

  function onSubmit(data) {
    console.log(data);
    mutate({...data, image: data.image[0]});
  }

  function onError(error) {
    console.log(error);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)} >
      <FormRow label="Cabin name" error={errors?.name?.message} >
        <Input disabled={isUploading} type="text" id="name" {...register("name", {required: "This filed is required!"})} />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message} >
      <Input disabled={isUploading} type="number" id="maxCapacity" {...register("maxCapacity", {required: "This filed is required!",min: 1, max: 12})}/>
      </FormRow>

      <FormRow label="Regular Price" error={errors?.regularPrice?.message} >
      <Input disabled={isUploading} type="number" id="regularPrice" {...register("regularPrice", {required: "This filed is required!", min: 1, max: 1200}, )}/>
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message} >
      <Input disabled={isUploading} type="number" id="discount" defaultValue={0} {...register("discount", {required: "This filed is required!", min: 1, max: 1200, validate: (value) => value < getValues().regularPrice || "Discount should be less than the regular price"})}/>
      </FormRow>

      <FormRow label="Description for website" error={errors?.description?.message} >
      <Textarea disabled={isUploading} type="number" id="description" defaultValue="" {...register("description", {required: "This filed is required!"})}/>
      </FormRow>

      <FormRow label="Cabin photo">
      <FileInput id="image" accept="image/*" {...register("image", {required: "This filed is required!"})}/>
      </FormRow>


      <FormRow>
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disbled={isUploading} >Add cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
