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
    <main className="col-start-3 col-end-13 row-start-1 row-end-7 grid grid-cols-5 auto-rows-max gap-x-12 gap-y-24 py-24 px-12 overflow-auto bg-mainBg">
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