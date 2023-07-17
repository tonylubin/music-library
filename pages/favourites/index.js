import MainCard from "@/components/MainCard";
import { getAllFavouriteTracks } from "@/database/musicLibrary";
import { serializeErrorFunc } from "@/utils/utils";
import React from "react";

function Favourites({ data }) {

  const cardTracks = data.map((track, i) => (
    <MainCard
      key={i}
      title={track.title}
      artist={track.artist}
      trackId={track.trackId}
      imageUrl={track.imageUrl}
    />
  ));
  
  return (
    <main className="col-start-3 col-end-13 row-start-1 row-end-7 grid grid-cols-5 auto-rows-max gap-x-12 gap-y-24 py-24 px-12 overflow-auto bg-space z-0">
      {cardTracks}
    </main>
  )
};

export default Favourites;


export const getServerSideProps = async () => {
  const res = await getAllFavouriteTracks();
  const data = await serializeErrorFunc(res);
  return { props: { data } };
};