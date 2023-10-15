import React, { useState } from "react";
import { getTables, getTrack } from "@/database/musicLib";
import TrackCards from "@/components/TrackCards";


const Track = ({ trackData, playlistData }) => {
  // initial setting of favourite status
  let fav = trackData.favourite_id ? true : false;
  const [isFavourite, setIsFavourite] = useState(fav);

  return (
    <main className="col-start-3 col-end-13 row-start-1 row-end-7 bg-primaryBgAlt flex flex-col items-center justify-center relative">
      <TrackCards
        trackData={trackData}
        isFavourite={isFavourite}
        setIsFavourite={setIsFavourite}
        playlistData={playlistData}
      />
    </main>
  );
};

export default Track;

export async function getServerSideProps(context) {
  const id = context.params.trackId;
 
  const [trackData, playlistData] = await Promise.all([
    getTrack(id),
    getTables()
  ]);

  return { props: { trackData, playlistData } };
}
