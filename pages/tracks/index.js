import MainCard from "@/components/MainCard";
import { getTracks } from "@/database/musicLibrary";
import { serializeErrorFunc } from "@/utils/utils";
import React from "react";

function Tracks({ data }) {

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
    <main className="col-start-3 col-end-13 row-start-1 row-end-7 grid grid-cols-4 gap-x-12 gap-y-24 py-24 px-12 overflow-auto bg-gradient-to-t from-gray-700 via-gray-900 to-black z-0">
      {cardTracks}
    </main>
  )
};

export default Tracks;


export const getServerSideProps = async () => {
  const res = await getTracks();
  const data = await serializeErrorFunc(res);
  return { props: { data } };
};