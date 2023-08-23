import React from "react";
import { CldUploadWidget } from "next-cloudinary";

const CloudUpload = ({ setUploadStatus, setValue, uploadOption }) => {
  const uploadFolder =
    (uploadOption === "images")
      ? process.env.NEXT_PUBLIC_CLOUDINARY_DB_FOLDER_IMG
      : process.env.NEXT_PUBLIC_CLOUDINARY_DB_FOLDER_AUD;

  const uploadText =
    (uploadOption === "images")
      ? "Done! Image uploaded."
      : "Done! track audio uploaded.";

  const uploadUrl = (uploadOption === "images") ? "imageUrl" : "audioUrl";

  // cloudinary widget options
  const widgetUIOptions = {
    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
    folder: uploadFolder,
    sources: ["url", "camera", "local"],
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
    let uploadedSrc = (uploadOption === 'images') ? result.info.public_id : result.info.url;
    Promise.all([
      await setValue(uploadUrl, uploadedSrc),
      await setUploadStatus({
        status: "success",
        text: uploadText,
        color: "text-teal-500",
        uploadUrl: uploadedSrc,
      }),
    ]);
  };

  // error handling
  const handleError = async (error) => {
    console.log(`Something went wrong! - ${error}`);
    await setUploadStatus({
      status: "error",
      text: "Something went wrong!",
      color: "text-red-600",
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
