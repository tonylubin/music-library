import React, { useState } from "react";
import { getTrack } from "@/database/musicLibrary";
import { serializeErrorFunc, toastNotification } from "@/utils/utils";
import TrackCard from "@/components/TrackCard";
import AudioPlayer from "react-h5-audio-player";

function Track({ data }) {
  // initial setting of favourite status
  let fav = data.favouriteId ? true : false;

  const [isFavourite, setFavourite] = useState(fav);

  const handleFavouriteStatus = async (id) => {
    if (!isFavourite) {
      // add Favourite
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      };
      let res = await fetch("/api/favourites", requestOptions);
      let { msg } = await res.json();
      setFavourite(!isFavourite);
      console.log(msg)
      toastNotification(msg);
    } else {
      // remove Favourite
      let res = await fetch(`/api/favourites/${id}`, { method: "DELETE" });
      let { msg } = await res.json();
      setFavourite(!isFavourite);
      console.log(msg);
      toastNotification(msg);
    }
  };

  return (
    <main className="col-start-3 col-end-13 row-start-1 row-end-7 bg-gradient-to-b from-gray-900 to-gray-600 flex flex-col items-center justify-center relative">
      <TrackCard
        data={data}
        handleFavouriteStatus={handleFavouriteStatus}
        isFavourite={isFavourite}
        setFavourite={setFavourite}
      />
      <AudioPlayer
        customAdditionalControls={[]}
        layout="horizontal-reverse"
        className="absolute bottom-0"
      />
    </main>
  );
}

export default Track;

export async function getServerSideProps(context) {
  const id = context.params.trackId;
  const res = await getTrack(id);
  const data = await serializeErrorFunc(res);
  return { props: { data } };
}
