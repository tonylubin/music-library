import React, { useState } from "react";
import { getTables, getTrack } from "@/database/musicLib";
import TrackCards from "@/components/TrackCards";
import axios from "axios";


const Track = ({ trackData, playlistData, placeHolders }) => {
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
        placeHolder={placeHolders[0]}
      />
    </main>
  );
};

export default Track;

export const getServerSideProps = async (context) => {
  const id = context.params.trackId;

  const [trackData, playlistData] = await Promise.all([
    getTrack(id),
    getTables()
  ]);
  
  // Array of img urls (single element but function expects an array)
  const imgSrc = [trackData.image_url];
  
  // fetching image placeholders
  const domainName  = context.req.headers.host;
  const url = `http://${domainName}/api/placeholders`;

  const getPlaceHolders = await axios.post(url, imgSrc);

  const { placeHolders } = getPlaceHolders.data;

  // const getPlaceHolders = await fetch(url, {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify(imgSrc)
  // });

  // const { placeHolders } = await getPlaceHolders.json();

  return { props: { trackData, playlistData, placeHolders } };
}
