import React from 'react'
import FormInput from './FormInput';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';

// form validation - yup
const schema = yup
  .object({
    title: yup.string().required("Please enter the track title!"),
    artist: yup.string().required("Please enter the artist's name!"),
    album: yup.string(),
    year: yup
      .number()
      .typeError("Please enter a year!")
      .test(
        "number-length",
        "Year must be exactly 4 digits",
        (value) => value && value.toString().length === 4
      ),
  })
  .required();

const FormStep1 = ({ handleNext }) => {

  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema)});

  return (
    <form
    id={0}
    onSubmit={handleSubmit(handleNext)}
    className="flex flex-col gap-4"
  >
    <FormInput
      inputLabel="Title"
      inputName="title"
      register={register}
      type="text"
      placeholderText="Enter title..."
      errors={errors}
    />
    <FormInput
      inputLabel="Artist"
      inputName="artist"
      register={register}
      type="text"
      placeholderText="Enter artist..."
      errors={errors}
    />
    <FormInput
      inputLabel="Album"
      inputName="album"
      register={register}
      type="text"
      placeholderText="Enter album or n/a if not applicable"
      errors={errors}
      defaultValue="n/a"
    />
    <FormInput
      inputLabel="Year"
      inputName="year"
      register={register}
      type="text"
      placeholderText="Year must be in a XXXX format...e.g.1998"
      errors={errors}
    />
    <button
      type="submit"
      className="font-medium font-bioRhyme rounded-lg text-md px-5 py-2.5 w-1/2 mt-6 self-center hover:text-black bg-primaryRed hover:bg-redHover hover:cursor-pointer"
    >
      Next
    </button>  
  </form>
  )
}

export default FormStep1;