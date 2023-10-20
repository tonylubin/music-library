import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaUpload } from "react-icons/fa";
import { CldImage } from "next-cloudinary";
import { ImCheckmark } from "react-icons/im";
import { MdErrorOutline } from "react-icons/md";
import { defaultTrackImgUrl } from "@/utils/utils";

const FormStep3 = ({ handleNext }) => {
  const [uploadSatus, setUploadStatus] = useState({
    status: null,
    text: null,
    color: null,
    uploadUrl: defaultTrackImgUrl,
  });

  const { register, handleSubmit } = useForm({
    defaultValues: { image_url: uploadSatus.uploadUrl },
  });

  return (
    <div>
      <p className="text-center pt-4 font-kanit">
        To add an image press the{" "}
        <span className="underline underline-offset-2 text-teal-500 font-semibold">
          UPLOAD
        </span>{" "}
        button or hit the{" "}
        <span className="underline underline-offset-2 text-primaryRed font-semibold">
          NEXT
        </span>{" "}
        button to skip
      </p>
      <p className="text-gray-500 pb-4">
        ( the default image shown below will be added if no image is uploaded )
      </p>
      <form
        id={2}
        className="flex flex-col gap-8 mt-4 items-center"
        onSubmit={handleSubmit(handleNext)}
      >
        <div className="flex items-center justify-evenly gap-5">
          <div className="flex gap-5 items-center border-[0.5px] border-slate-400 px-6 py-4 rounded-full font-kanit">
            <p className="text-xl">Upload image</p>
            <FaUpload className="text-xl" />
            <button
              className="px-5 py-[6px] rounded-full bg-teal-500 text-sm font-semibold hover:bg-teal-400 hover:text-black ring-2 ring-teal-500 cursor-not-allowed"
              disabled
            >
              Upload
            </button>
          </div>
        </div>
        <div className="w-300 h-300 border-2 border-dotted border-slate-400 flex gap-6 relative">
          <CldImage
            width={250}
            height={250}
            src={uploadSatus.uploadUrl}
            sizes="100vw"
            alt="vinyl cover"
          />
          {uploadSatus.status === "success" && (
            <div className="flex items-center justify-center gap-4 border-[0.5px] border-teal-500 px-5 py-3 absolute w-full bg-black text-teal-500">
              <p className="font-semibold">{uploadSatus.text}</p>
              <ImCheckmark />
            </div>
          )}
          {uploadSatus.status === "error" && (
            <div className="flex items-center justify-center gap-4 border-[0.5px] border-red-600 px-5 py-3 absolute w-full bg-black text-red-600">
              <p className="font-semibold">{uploadSatus.text}</p>
              <MdErrorOutline />
            </div>
          )}
        </div>
        <button
          type="submit"
          className="font-medium font-bioRhyme rounded-lg text-md px-5 py-2.5 w-64 mt-6 self-center hover:text-black bg-primaryRed hover:bg-redHover hover:cursor-pointer"
        >
          Next
        </button>
        <input type="hidden" {...register("image_url")} />
      </form>
    </div>
  );
};

export default FormStep3;
