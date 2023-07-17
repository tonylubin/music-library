import React, { useContext } from "react";
import { GlobalContext } from "@/pages/_app";
import { useForm } from "react-hook-form";
import { toastClose, toastNotification } from "@/utils/utils";
import { useRouter } from "next/router";
import { CldImage } from "next-cloudinary";

function Result() {
  const { formData } = useContext(GlobalContext);

  const router = useRouter();

  const { handleSubmit, register, reset } = useForm({
    defaultValues: formData,
  });

  // submit form
  const formSubmit = async (data, e) => {
    e.preventDefault();

    const postTrack = await fetch("/api/addTrack", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    await postTrack.json().then(({ trackTitle, trackArtist }) => {
      let msg = (
        <p>
          The track{" "}
          <span className="underline underline-offset-2 decoration-2 decoration-green-600">
            {trackTitle.toUpperCase()}
          </span>{" "}
          by{" "}
          <span className="underline underline-offset-2 decoration-2 decoration-green-600">
            {trackArtist.toUpperCase()}
          </span>{" "}
          was added!
        </p>
      );

      const callbackFunc = () => router.push("/tracks");
      toastNotification(msg);
      toastClose(callbackFunc);
      // form reset
      reset();
    });
  };

  return (
    <div className="col-start-3 col-end-13 row-start-1 row-end-7 flex flex-col items-center justify-center bg-slate-900">
      <h2 className="text-2xl font-semibold text-indigo-500 py-4">Result</h2>
      <div className="border-[0.5px] border-indigo-500 border-dotted w-10/12 rounded-2xl">
        <form
          className="flex flex-wrap w-full"
          onSubmit={handleSubmit(formSubmit)}
        >
          <div className="flex flex-col w-7/12 items-center justify-center p-10">
            <div className="flex flex-col w-5/6 h-full gap-4">
              <label className="flex flex-col gap-1" htmlFor="title">
                <span className="text-lg px-3 text-slate-500">Title</span>
                <input
                  className="mt-0 block w-full px-3 border-0 border-b-[0.5px] border-indigo-500
                    focus:ring-0 bg-transparent"
                  id="title"
                  type="text"
                  disabled
                  {...register("title")}
                />
              </label>
              <label className="flex flex-col" htmlFor="artist">
                <span className="text-lg px-3 text-slate-500">Artist</span>
                <input
                  className="mt-0 block w-full px-3 border-0 border-b-[0.5px] border-indigo-500 text-neutral-50 focus:ring-0 bg-transparent"
                  id="artist"
                  type="text"
                  disabled
                  {...register("artist")}
                />
              </label>
              <label className="flex flex-col" htmlFor="album">
                <span className="text-lg px-3 text-slate-500">Album</span>
                <input
                  className="mt-0 block w-full px-3 border-0 border-b-[0.5px] border-indigo-500 text-neutral-50 focus:ring-0 bg-transparent"
                  id="album"
                  type="text"
                  disabled
                  {...register("album")}
                />
              </label>
              <label className="flex flex-col" htmlFor="year">
                <span className="text-lg px-3 text-slate-500">Year</span>
                <input
                  className="mt-0 block w-full px-3 border-0 border-b-[0.5px] border-indigo-500 text-neutral-50 focus:ring-0 bg-transparent"
                  id="year"
                  type="text"
                  disabled
                  {...register("year")}
                />
              </label>
              <label className="flex flex-col" htmlFor="genre">
                <span className="text-lg px-3 text-slate-500">Genre</span>
                <input
                  className="mt-0 block w-full px-3 border-0 border-b-[0.5px] border-indigo-500 text-neutral-50 focus:ring-0 bg-transparent"
                  id="genre"
                  type="text"
                  disabled
                  {...register("genre")}
                />
              </label>
            </div>
          </div>
          <div className="flex flex-col w-5/12 items-center p-10">
            <div className="flex flex-col justify-between w-5/6 h-full">
              <label className="flex flex-col" htmlFor="genre">
                <span className="text-lg px-3 text-slate-500">Image & Url</span>
                <input
                  className="mt-0 block w-full px-3 border-0 border-b-[0.5px] border-indigo-500 focus:ring-0 bg-transparent text-neutral-50"
                  id="genre"
                  type="text"
                  disabled
                  {...register("imageUrl")}
                />
              </label>
              <div className="w-250 h-250 border-2 border-dotted border-indigo-500 self-center">
                <CldImage
                  width={250}
                  height={250}
                  src={formData.imageUrl}
                  sizes="100vw"
                  alt="vinyl cover"
                />
              </div>
            </div>
          </div>
          <div className="flex w-1/2 items-center justify-center pb-6">
            <button className="rounded-full bg-indigo-500 py-2 px-8 w-fit text-black font-semibold hover:bg-indigo-400 hover:text-inherit ring-2 ring-gray-700">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Result;
