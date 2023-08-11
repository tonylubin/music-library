import React, { useContext, useState } from "react";
import CloudUpload from "@/components/CloudUpload";
import { useForm } from "react-hook-form";
import { GlobalContext } from "@/pages/_app";
import { useRouter } from "next/router";
import { ImCheckmark } from 'react-icons/im';
import { MdErrorOutline } from 'react-icons/md';
import { FaUpload } from 'react-icons/fa';
import { CldImage } from "next-cloudinary";
import { defaultTrackImgUrl } from "@/utils/utils";

function Step1() {

  const { formData, setFormData } = useContext(GlobalContext);

  const [uploadSatus, setUploadStatus] = useState({
    status: null,
    text: null,
    color: null,
    imageUrl: defaultTrackImgUrl,
  });

  const { register, handleSubmit, reset, setValue } = useForm({
    defaultValues: { imageUrl: uploadSatus.imageUrl },
  });

  const router = useRouter();

  const formSubmit = async (data, e) => {
    e.preventDefault();
   
    await setFormData({ ...formData, imageUrl: data.imageUrl });
    router.push("/addMusic/result");
    reset();
  };

  return (
    <main className="col-start-3 col-end-13 row-start-1 row-end-7 flex flex-col items-center justify-center bg-primaryBgAlt">
      <h2 className="text-2xl font-semibold text-primaryRed py-4">
        Cover picture
      </h2>
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
        className="flex flex-col gap-8 mt-4 items-center"
        onSubmit={handleSubmit(formSubmit)}
      >
        <div className="flex items-center justify-evenly gap-5">
          <div className="flex gap-5 items-center border-[0.5px] border-slate-400 px-6 py-4 rounded-full font-kanit">
            <p className="text-2xl">Upload image</p>
            <FaUpload className="text-2xl" />
            <CloudUpload
              setUploadStatus={setUploadStatus}
              setFormData={setFormData}
              setValue={setValue}
            />
          </div>
        </div>
        <div className="w-300 h-300 border-2 border-dotted border-slate-400 flex gap-6 relative">
          <CldImage
            width={300}
            height={300}
            src={uploadSatus.imageUrl}
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
          className="px-8 py-2 bg-primaryRed rounded-full text-md font-semibold hover:bg-redHover hover:text-black hover:ring-2 hover:ring-redHover"
          type="submit"
        >
          Next
        </button>
        <input type="hidden" {...register("imageUrl")} />
      </form>
    </main>
  );
}

export default Step1;
