import React, { useState } from "react";
import CloudUpload from "./CloudUpload";
import { useForm } from "react-hook-form";
import FormInput from "./FormInput";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ImCheckmark, ImFileMusic } from "react-icons/im";
import { MdErrorOutline } from "react-icons/md";
import { successNotification, toastClose } from "@/utils/utils";
import { useRouter } from "next/router";

// form validation - yup
const schema = yup
  .object({
    audioUrl: yup.string().required("Please upload an audio track sample!"),
  })
  .required();

const FormStep4 = ({ formData }) => {
  const [uploadSatus, setUploadStatus] = useState({
    status: null,
    text: null,
    color: null,
    uploadUrl: null,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({ resolver: yupResolver(schema) });

  const router = useRouter();

  const submitTrack = async (data,e) => {
    e.preventDefault();
    
    const postTrack = await fetch("/api/addTrack", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({...formData, ...data}),
    });

    const response = await postTrack.json();
    
    let msg = (
      <p>
        The track{" "}
        <span className="underline underline-offset-2 decoration-2 decoration-green-600">
          {response.title.toUpperCase()}
        </span>{" "}
        by{" "}
        <span className="underline underline-offset-2 decoration-2 decoration-green-600">
          {response.artist.toUpperCase()}
        </span>{" "}
        was added!
      </p>
    );

    const callbackFunc = () => router.push("/library");
    successNotification(msg);
    toastClose(callbackFunc);
  };

  return (
    <div className="flex flex-col gap-16">
      <div className="flex gap-5 items-center justify-evenly border-dashed border-[0.5px] border-slate-400 py-6 rounded-full font-kanit text-xl">
        <div className="flex gap-4">
        <ImFileMusic className="text-2xl" />
        <p>Upload <span className="text-teal-500">audio</span> sample</p>
        </div>
        <CloudUpload
          setUploadStatus={setUploadStatus}
          setValue={setValue}
          uploadOption="audio"
        />
      </div>
      {uploadSatus.status === "success" && (
            <div className="flex items-center justify-center gap-4 border-[0.5px] border-teal-500 px-5 py-3 bg-black text-teal-500">
              <p className="font-semibold">{uploadSatus.text}</p>
              <ImCheckmark />
            </div>
          )}
          {uploadSatus.status === "error" && (
            <div className="flex items-center justify-center gap-4 border-[0.5px] border-red-600 px-5 py-3 bg-black text-red-600">
              <p className="font-semibold">{uploadSatus.text}</p>
              <MdErrorOutline />
            </div>
          )}
      <form
        id={3}
        className="flex flex-col gap-4"
        onSubmit={handleSubmit(submitTrack)}
      >
        <FormInput
          inputLabel="Audio Track"
          inputName="audioUrl"
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
