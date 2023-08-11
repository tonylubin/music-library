import React from "react";
import { CldUploadWidget } from "next-cloudinary";

const CloudUpload = ({ setUploadStatus, setValue }) => {

  // cloudinary widget options
  const widgetUIOptions = {
    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
    folder: process.env.NEXT_PUBLIC_CLOUDINARY_DB_FOLDER,
    sources: ["url", "camera", "local", "facebook", "instagram"],
    showAdvancedOptions: false,
    cropping: true,
    multiple: false,
    defaultSource: "local",
    styles: {
      palette: {
        window: "#10173a",
        sourceBg: "#20304b",
        windowBorder: "#7171D0",
        tabIcon: "#79F7FF",
        inactiveTabIcon: "#8E9FBF",
        menuIcons: "#CCE8FF",
        link: "#72F1FF",
        action: "#5333FF",
        inProgress: "#00ffcc",
        complete: "#33ff00",
        error: "#cc3333",
        textDark: "#000000",
        textLight: "#ffffff",
      },
      fonts: {
        default: null,
        "'IBM Plex Sans', sans-serif": {
          url: "https://fonts.googleapis.com/css?family=IBM+Plex+Sans",
          active: true,
        },
      },
    },
  };

  // upload handling
  const handleUpload = async (result) => {
      console.log("Image uploaded!", result.info);
      let uploadImgUrl = result.info.public_id
      Promise.all([
      await setValue('imageUrl',uploadImgUrl),
      await setUploadStatus({
        status: 'success',
        text: "Done! Image uploaded.",
        color: "text-teal-500",
        imageUrl: uploadImgUrl
      })])
  };

  // error handling
  const handleError = async (error) => {
    console.log(`Something went wrong! - ${error}`);
    await setUploadStatus({
      status: 'error',
      text: "Something went wrong!",
      color: "text-red-600"
    });
  };

  return (
    <CldUploadWidget
      uploadPreset="next-cloudinary-unsigned"
      options={widgetUIOptions}
      onUpload={handleUpload}
      onError={handleError}
    >
      {({ open }) => {
        function handleOnClick(e) {
          e.preventDefault();
          open();
        }
        return (
          <button
            className="px-5 py-[6px] rounded-full bg-teal-500 text-sm font-semibold hover:bg-teal-400 hover:text-black ring-2 ring-teal-500"
            onClick={handleOnClick}
          >
            Upload
          </button>
        );
      }}
    </CldUploadWidget>
  );
};

export default CloudUpload; 
