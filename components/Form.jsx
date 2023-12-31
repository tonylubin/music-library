import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const Form = ({ setPlaylistCreated }) => {
  const [errorStatus, setErrorStatus] = useState({
    status: false,
    message: "",
  });

  const schema = yup
    .object()
    .shape({
      name: yup.string().required("Please enter a valid name"),
    })
    .required();

  const {
    register,
    handleSubmit,
    reset,
    formState,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema), criteriaMode: "all" });

  const onSubmit = async (data) => {
    const response = await fetch("/api/playlists/manage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data.name),
    });
    if (response.status >= 400) {
      const { msg } = await response.json();
      setErrorStatus({ status: true, message: msg });
    } else {
      const { msg } = await response.json();
      setErrorStatus({ status: false, message: "" });
      setPlaylistCreated({ status: true, message: msg });
    }
  };

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset();
    }
  }, [formState.isSubmitSuccessful, reset]);

  return (
    <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="relative z-0 w-full mb-6 group">
        <input
          type="text"
          id="floating_name"
          className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-neutral-300 appearance-none focus:border-neutral-300 focus:outline-none focus:ring-0 peer"
          placeholder=" "
          {...register("name")}
        />
        <label
          htmlFor="floating_name"
          className="peer-focus:font-medium absolute text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-400 peer-focus:dark:text-gray-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Enter playlist name
        </label>
      </div>
      <div className="mt-4">
        <button
          type="submit"
          className="inline-flex justify-center rounded-md border border-transparent bg-redHover px-4 py-2 text-sm font-medium dark:text-white hover:bg-primaryRed focus:outline-none focus-visible:ring-2 focus-visible:ring-primaryRed focus-visible:ring-offset-2 text-neutral-300 cursor-not-allowed"
          disabled
        >
          Create
        </button>
      </div>
      {errorStatus && (
        <p className="text-red-500 text-sm mt-3">{errorStatus.message}</p>
      )}
      {errors.name && (
        <p className="text-red-500 text-sm mt-3">{errors.name.message}</p>
      )}
    </form>
  );
}

export default Form;