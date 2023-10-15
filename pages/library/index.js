import MusicCard from "@/components/MusicCard";
import { getTracks } from "@/database/musicLib";
import React from "react";

const Library = ({ data }) => {
  const cardTracks = data.map((track, i) => (
    <MusicCard
      key={i}
      title={track.title}
      artist={track.artist}
      trackId={track.track_id}
      imageUrl={track.image_url}
    />
  ));

  return (
    <main className="col-start-3 col-end-13 row-start-1 row-end-7 grid grid-cols-5 auto-rows-max gap-12 p-12 overflow-auto bg-primaryBgAlt">
      {cardTracks}
    </main>
  );
};

export default Library;

export const getServerSideProps = async () => {
  const data = await getTracks();
  return { props: { data } };
};
