import React, { useContext } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { GlobalContext } from "../_app";

// form validation - yup
const schema = yup
  .object({
    title: yup.string().required("Please enter the track title!"),
    artist: yup.string().required("Please enter the artist's name!"),
    album: yup.string(),
    duration: yup.string().required("Please enter track time length"),
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

function AddMusic() {
  const { setFormData } = useContext(GlobalContext);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const formSubmit = async (data, e) => {
    e.preventDefault();
    await setFormData(data);
    router.push("/addMusic/step1");
    // form reset
    reset();
  };

  return (
    <main className="col-start-3 col-end-13 row-start-1 row-end-7 flex items-center justify-center bg-primaryBgAlt">
      <div className="flex w-4/5 justify-center rounded-2xl">
        <div className="flex flex-col items-center w-3/5">
          <h2 className="text-2xl font-semibold text-neutral-50 pb-4">
            Track Details
          </h2>
          <form
            className="flex flex-col w-3/4 gap-4 font-kanit"
            onSubmit={handleSubmit(formSubmit)}
          >
            <label className="flex flex-col gap-1" htmlFor="title">
              <span className="text-lg font-medium">Title</span>
              <span className="text-red-900 float-right">
                {errors.title && errors.title.message}
              </span>
              <input
                className="mt-0 block w-full p-2.5 border border-brownShade
                 focus:ring-offset-brownHover focus:border-brownHover focus:ring-brownHover bg-brownShadeAlt rounded-lg placeholder-gray-400 text-sm"
                id="title"
                type="text"
                placeholder="Enter title..."
                {...register("title")}
              />
            </label>
            <label className="flex flex-col gap-1" htmlFor="artist">
              <span className="text-lg font-medium">Artist</span>
              <span className="text-red-900 float-right">
                {errors.artist && errors.artist.message}
              </span>
              <input
                className="mt-0 block w-full p-2.5 border-brownShade border
                focus:ring-offset-brownHover focus:border-brownHover focus:ring-brownHover bg-brownShadeAlt rounded-lg placeholder-gray-400 text-sm"
                id="artist"
                type="text"
                placeholder="Enter artist..."
                {...register("artist")}
              />
            </label>
            <label className="flex flex-col gap-1" htmlFor="album">
              <span className="text-lg font-medium">Album</span>
              <span className="text-red-900 float-right">
                {errors.album && errors.album.message}
              </span>
              <input
                className="mt-0 block w-full p-2.5 border-brownShade border
                focus:ring-offset-brownHover focus:border-brownHover focus:ring-brownHover bg-brownShadeAlt rounded-lg placeholder-gray-400 text-sm"
                id="album"
                type="text"
                defaultValue={"n/a"}
                {...register("album")}
              />
            </label>
            <label className="flex flex-col gap-1" htmlFor="year">
              <span className="text-lg font-medium">Year</span>
              <span className="text-red-900 float-right">
                {errors.year && errors.year.message}
              </span>
              <input
                className="mt-0 block w-full p-2.5 border-brownShade border
                focus:ring-offset-brownHover focus:border-brownHover focus:ring-brownHover bg-brownShadeAlt rounded-lg placeholder-gray-400 text-sm"
                id="year"
                type="text"
                placeholder="Year must be in a XXXX format...e.g.1998"
                {...register("year")}
              />
            </label>
            <label className="flex flex-col gap-1" htmlFor="duration">
              <span className="text-lg font-medium">Duration</span>
              <span className="text-red-900 float-right">
                {errors.duration && errors.duration.message}
              </span>
              <input
                className="mt-0 block w-full p-2.5 border-brownShade border
                focus:ring-offset-brownHover focus:border-brownHover focus:ring-brownHover bg-brownShadeAlt rounded-lg placeholder-gray-400 text-sm"
                id="duration"
                type="time"
                placeholder="Enter track time...format e.g. 03:33"
                {...register("duration")}
              />
            </label>
            <label className="flex flex-col gap-1" htmlFor="genre">
              <span className="text-lg font-medium">Genre</span>
              <select
                className="mt-0 block w-full p-2.5 border-brownShade border
                focus:ring-offset-brownHover focus:border-brownHover focus:ring-brownHover bg-brownShadeAlt rounded-lg placeholder-gray-400 text-sm"
                id="genre"
                type="text"
                {...register("genre")}
              >
                <option value="ukg">UKG</option>
                <option value="house">HOUSE</option>
                <option value="garge">GARAGE</option>
                <option value="indie">INDIE</option>
                <option value="r&b">R&B</option>
                <option value="pop">POP</option>
              </select>
            </label>
            <button className="font-medium font-bioRhyme rounded-lg text-md px-5 py-2.5 w-full mt-4 self-center hover:text-black bg-primaryRed hover:bg-redHover">
              Next
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}

export default AddMusic;
