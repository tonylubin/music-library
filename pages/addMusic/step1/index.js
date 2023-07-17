import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CloudUpload from "@/components/CloudUpload";
import { useForm } from "react-hook-form";
import { GlobalContext } from "@/pages/_app";
import { useRouter } from "next/router";
import {
  faArrowUpFromBracket,
  faSquareCheck,
  faSquareXmark,
} from "@fortawesome/free-solid-svg-icons";
import { CldImage } from "next-cloudinary";
import { defaultTrackImgUrl } from "@/utils/utils";

function Step1() {
  const { formData, setFormData } = useContext(GlobalContext);

  const icons = {
    upload: faArrowUpFromBracket,
    error: faSquareXmark,
    success: faSquareCheck,
  };

  const [uploadSatus, setUploadStatus] = useState({
    status: null,
    text: null,
    icon: null,
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
    <main className="col-start-3 col-end-13 row-start-1 row-end-7 flex flex-col items-center justify-center bg-slate-900">
      <h2 className="text-2xl font-semibold text-indigo-500 py-4">
        Cover picture
      </h2>
      <p className="text-center pt-4">
        To add an image press the{" "}
        <span className="underline underline-offset-2 text-teal-500 font-semibold">
          UPLOAD
        </span>{" "}
        button or hit the{" "}
        <span className="underline underline-offset-2 text-indigo-500 font-semibold">
          NEXT
        </span>{" "}
        button to skip
      </p>
      <p className="text-gray-500 pb-4">
        ( the default image shown below will be added if no image is uploaded )
      </p>
      <form
        className="flex flex-col gap-5 items-center"
        onSubmit={handleSubmit(formSubmit)}
      >
        <div className="flex items-center justify-evenly gap-5">
          <div className="flex gap-5 items-center border-[0.5px] border-indigo-500 px-5 py-3 rounded-full">
            <p className="text-2xl">Upload image</p>
            <FontAwesomeIcon icon={icons.upload} size="xl" />
            <CloudUpload
              setUploadStatus={setUploadStatus}
              setFormData={setFormData}
              icons={icons}
              setValue={setValue}
            />
          </div>
        </div>
        <div className="w-300 h-300 border-2 border-dotted border-indigo-500 flex gap-6 relative">
          <CldImage
            width={300}
            height={300}
            src={uploadSatus.imageUrl}
            sizes="100vw"
            alt="vinyl cover"
          />
          {uploadSatus.status === "success" && (
            <div className="flex items-center justify-center gap-4 border-[0.5px] border-indigo-500 px-5 py-3 absolute w-full bg-black text-indigo-500">
              <p className="font-semibold">{uploadSatus.text}</p>
              <FontAwesomeIcon
                icon={uploadSatus.icon}
                className={uploadSatus.color}
                size="2xl"
              />
            </div>
          )}
          {uploadSatus.status === "error" && (
            <div className="flex items-center justify-center gap-4 border-[0.5px] border-red-600 px-5 py-3 absolute w-full bg-black text-red-600">
              <p className="font-semibold">{uploadSatus.text}</p>
              <FontAwesomeIcon
                icon={uploadSatus.icon}
                className={uploadSatus.color}
                size="2xl"
              />
            </div>
          )}
        </div>
        <button
          className="px-8 py-2 bg-indigo-500 rounded-full text-sm font-semibold hover:bg-indigo-400 hover:text-black ring-2 ring-gray-700"
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
