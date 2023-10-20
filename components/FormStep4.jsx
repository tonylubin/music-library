import React from "react";
import { useForm } from "react-hook-form";
import FormInput from "./FormInput";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ImFileMusic } from "react-icons/im";
import { toast } from "react-toastify";


// form validation - yup
const schema = yup
  .object({
    audio_url: yup.string().required("Please upload an audio track sample!"),
  })
  .required();

const FormStep4 = ({ formData }) => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const submitTrack = async (data, e) => {
    e.preventDefault();

    const submittedData = {...formData, ...data}; 

    const msg = (
      <>
        <p className="font-bold underline text-toastRed">Form data sent to database</p>
        <ul>
          <li><span className="text-toastRed mr-4">Artist:</span>{`${submittedData.artist}`}</li>
          <li><span className="text-toastRed mr-4">Title:</span>{` ${submittedData.title}`}</li>        
          <li><span className="text-toastRed mr-4">Album:</span>{` ${submittedData.album}`}</li>
          <li><span className="text-toastRed mr-4">Year:</span>{`${submittedData.year}`}</li>
          <li><span className="text-toastRed mr-4">Duartion:</span>{`${submittedData.duration}`}</li>
          <li><span className="text-toastRed mr-4">Genre:</span>{` ${submittedData.genre}`}</li>
          <li><span className="text-toastRed mr-4">Image Url:</span>{` ${submittedData.image_url}`}</li>
          <li><span className="text-toastRed mr-4">Audio Url: </span>{`${submittedData.audio_url}`}</li>
        </ul>      
      </>
    );

    toast.error(msg, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      className: "toast"
    },
    ); 
  };


  return (
    <div className="flex flex-col gap-16">
      <div className="flex gap-5 items-center justify-evenly border-dashed border-[0.5px] border-slate-400 py-6 rounded-full font-kanit text-xl">
        <div className="flex gap-4">
          <ImFileMusic className="text-2xl" />
          <p>
            Upload <span className="text-teal-500">audio</span> sample
          </p>
        </div>
        <button
          className="px-5 py-[6px] rounded-full bg-teal-500 text-sm font-semibold hover:bg-teal-400 hover:text-black ring-2 ring-teal-500 cursor-not-allowed"
          disabled
        >
          Upload
        </button>
      </div>
      <form
        id={3}
        className="flex flex-col gap-4"
        onSubmit={handleSubmit(submitTrack)}
      >
        <FormInput
          inputLabel="Audio Track"
          inputName="audio_url"
          register={register}
          type="text"
          placeholderText="audio src: www.music-track.example"
          errors={errors}
        />

          <button
            type="submit"
            className="font-medium font-bioRhyme rounded-lg text-md px-5 py-2.5 w-1/2 mt-6 self-center hover:text-black bg-primaryRed hover:bg-redHover hover:cursor-pointer"
          >
            Submit
          </button>
 
      </form>
    </div>
  );
};

export default FormStep4;
