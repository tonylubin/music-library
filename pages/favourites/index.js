import MainCard from "@/components/MainCard";
import { getAllFavouriteTracks } from "@/database/musicLib";
import React from "react";

const Favourites = ({ data }) => {

  const cardTracks = data.map((track, i) => (
    <MainCard
      key={i}
      title={track.title}
      artist={track.artist}
      trackId={track.track_id}
      imageUrl={track.image_url}
    />
  ));
  
  return (
    <main className="col-start-3 col-end-13 row-start-1 row-end-7 grid grid-cols-5 auto-rows-max gap-x-12 gap-y-24 p-12 overflow-auto bg-brownShadeAlt z-0">
      {cardTracks}
    </main>
  )
};

export default Favourites;


export const getServerSideProps = async () => {
  const data = await getAllFavouriteTracks();
  return { props: { data } };
};