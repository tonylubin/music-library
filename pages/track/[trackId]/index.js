import React, { useState } from "react";
import { getTables, getTrack } from "@/database/musicLibrary";
import { serializeErrorFunc, destroyNotification, successNotification } from "@/utils/utils";
import TrackCard from "@/components/TrackCard";
import AudioPlayer from "react-h5-audio-player";

function Track({ trackData, playlistData }) {
  // initial setting of favourite status
  let fav = trackData.favouriteId ? true : false;

  const [isFavourite, setFavourite] = useState(fav);

  // adding to favs
  const addToFavourites = async (id) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    };
    let res = await fetch("/api/favourites", requestOptions);
    let { msg } = await res.json();
    setFavourite(true);
    console.log(msg)
    successNotification(msg);
  };

  //  delete from favs
  const removeFromFavourites = async (id) => {
    let res = await fetch(`/api/favourites/${id}`, { method: "DELETE" });
    let { msg } = await res.json();
    setFavourite(false);
    console.log(msg);
    destroyNotification(msg);
  };

  //  add to playlist
  const addToPlaylist = async (name, trackNum) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, trackNum }),
    };
    let res = await fetch("/api/playlists/playlist", requestOptions);
    let { msg } = await res.json();
    successNotification(msg);
  };

  //  remove from playlist
  const removeFromPlaylist = async (name, id) => {
    let res = await fetch(`/api/playlists/playlist?name=${name}&id=${id}`, { method: "DELETE" });
    let { msg } = await res.json();
    destroyNotification(msg);
  };



  // const handleFavouriteStatus = async (id) => {
  //   if (!isFavourite) {
  //     // add Favourite
  //     const requestOptions = {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ id }),
  //     };
  //     let res = await fetch("/api/favourites", requestOptions);
  //     let { msg } = await res.json();
  //     setFavourite(!isFavourite);
  //     console.log(msg)
  //     toastNotification(msg);
  //   } else {
  //     // remove Favourite
  //     let res = await fetch(`/api/favourites/${id}`, { method: "DELETE" });
  //     let { msg } = await res.json();
  //     setFavourite(!isFavourite);
  //     console.log(msg);
  //     toastNotification(msg);
  //   }
  // };

  return (
    <main className="col-start-3 col-end-13 row-start-1 row-end-7 bg-space flex flex-col items-center justify-center relative">
      <TrackCard
        trackData={trackData}
        playlistData={playlistData}
        addToFavourites={addToFavourites}
        removeFromFavourites={removeFromFavourites}
        isFavourite={isFavourite}
        setFavourite={setFavourite}
        removeFromPlaylist={removeFromPlaylist}
        addToPlaylist={addToPlaylist}
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

  const [ trackResponse, playlistResponse ] = await Promise.all([
    getTrack(id),
    getTables()
  ]);

  const [ trackData, playlistData ] = await Promise.all([
    serializeErrorFunc(trackResponse),
    serializeErrorFunc(playlistResponse)
  ]);

  return { props: { trackData, playlistData } };
};
