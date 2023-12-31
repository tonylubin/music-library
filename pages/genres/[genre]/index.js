import React from "react";
import { getGenreLib } from "@/database/musicLib";
import Image from "next/image";
import imagePaths from "../../../database/homePageData.json";
import MainCard from "@/components/MainCard";
import axios from "axios";

const Genre = ({ data, genre, placeHolders }) => {
  let pathObj = imagePaths.find(
    (music) => music.pageUrl === `/genres/${genre}`
  );
  let imgPath = pathObj.imgPath;

  const cardTracks = data.map((track, i) => (
    <MainCard
      key={i}
      title={track.title}
      artist={track.artist}
      trackId={track.track_id}
      imageUrl={track.image_url}
      placeHolder={placeHolders[i]}
    />
  ));

  // genre name formating
  switch (genre) {
    case "hiphop":
      genre = "hip-hop";
      break;
    case "randb":
      genre = "r&b";
      break;
    case "ukg":
      genre = "uk garage";
      break;
    default:
      genre;
      break;
  }

  return (
    <main className="col-start-3 col-end-13 row-start-1 row-end-7 font-kanit">
      <div className="w-full h-1/4 text-3xl bg-brownShadeAlt sticky top-0 z-10">
        <div className="w-full h-full relative">
          <h1 className="text-xl text-primaryRed z-10 relative pl-16 pt-8">Genre</h1>
          <p className="capitalize text-7xl font-semibold pt-4 pl-16 z-10 relative">
            {genre}
          </p>
          <Image
            alt="music genre"
            sizes="100vw"
            src={imgPath}
            fill
            className="object-cover opacity-30 object-[10%_60%]"
          />
        </div>
      </div>
      {cardTracks.length ? (
        <section className="grid grid-cols-5 gap-8 py-16 px-12 h-3/4 overflow-auto bg-primaryBgAlt">
          {cardTracks}
        </section>
      ) : (
        <div className="flex items-center justify-center h-3/4">
          <p className="font-bioRhyme text-3xl text-primaryRed">Nothing found in your library</p>
        </div>
      )}
    </main>
  );
};

export default Genre;

export const getServerSideProps = async (context) => {
  const { genre } = context.query;
  let musicGenre = (genre === 'randb') ? 'r&b' : genre;
  const data = await getGenreLib(musicGenre);

  // Array of img urls
  const imgSrc = data.map((track) => track.image_url);

  // fetching image placeholders
  const domainName = context.req.headers.host;
  const url = `http://${domainName}/api/placeholders`;

  const getPlaceHolders = await axios.post(url, imgSrc);

  const { placeHolders } = getPlaceHolders.data;

  // const getPlaceHolders = await fetch(url, {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify(imgSrc)
  // });

  // const { placeHolders } = await getPlaceHolders.json();

  return { props: { data, genre, placeHolders } };
};
