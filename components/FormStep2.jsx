import React from 'react';
import FormInput from './FormInput';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';

const schema = yup.object({
  duration: yup.string().required("Please enter track time length"),
  genre: yup.string().required("Please select a music genre")
}).required();

const FormStep2 = ({ handleNext }) => {

  const { register, handleSubmit, formState: { errors } } = useForm({resolver : yupResolver(schema)});

  return (
    <form
    id={1}
    onSubmit={handleSubmit(handleNext)}
    className="flex flex-col gap-4"
  >
    <FormInput 
      inputLabel="Duration"
      inputName="duration"
      register={register}
      type="time"
      placeholderText="Enter track time...format e.g. 03:33"
      errors={errors}
    />
    <div className='flex justify-between'>
      <label htmlFor="genre" className="text-lg">Genre</label>
      <span className='text-red-700'>{errors.genre && errors.genre.message}</span>
    </div>
    <select
      id="genre"
      className="border-brownShade border
      focus:ring-offset-brownHover focus:border-brownHover focus:ring-brownHover bg-brownShadeAlt rounded-lg placeholder-gray-400 text-sm"
      {...register("genre")}
    >
      <option value="">-- Please select an option --</option>
      <option value="ukg">UKG</option>
      <option value="house">HOUSE</option>
      <option value="garge">GARAGE</option>
      <option value="indie">INDIE</option>
      <option value="r&b">R&B</option>
      <option value="pop">POP</option>
    </select>
    <button
      type="submit"
      className="font-medium font-bioRhyme rounded-lg text-md px-5 py-2.5 w-1/2 mt-8 self-center hover:text-black bg-primaryRed hover:bg-redHover hover:cursor-pointer"
    >
      Next
    </button>  
  </form>
  )
}

export default FormStep2