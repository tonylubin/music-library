import React from "react";
import { serializeErrorFunc } from "@/utils/utils";
import { getGenreLib } from "@/database/musicLibrary";
import Image from "next/image";
import imagePaths from "../../../database/data.json";
import MusicCard from "@/components/MusicCard";

export default function Genre({ data, genre }) {
  let pathObj = imagePaths.genreImgPath.find((music) => music[genre]);
  let imgPath = pathObj[genre];

  const cardTracks = data.map((track, i) => (
    <MusicCard
      key={i}
      title={track.title}
      artist={track.artist}
      trackId={track.trackId}
      imageUrl={track.imageUrl}
    />
  ));

  // genre name formating
  switch (genre) {
    case 'hiphop':
      genre = 'hip-hop'
      break;
    case 'randb':
      genre = 'r&b'
      break;
    case 'ukg':
      genre = 'uk garage'
      break;  
    default:
      genre
      break;
  }  

  return (
    <main className="col-start-3 col-end-13 row-start-1 row-end-7 font-kanit overflow-auto">
      <div className="w-full h-1/4 text-3xl bg-brownShadeAlt sticky top-0 z-10">
        <div className="w-full h-full relative">
          <h1 className="text-xl z-10 relative pl-16 pt-8">Genre</h1>
          <p className="capitalize text-7xl font-semibold pt-6 pl-16 z-10 relative">
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
      <section className="grid grid-cols-5 gap-6 py-24 px-12 h-full overflow-auto bg-primaryBgAlt">
        {cardTracks}
      </section>
    </main>
  );
}

export const getServerSideProps = async (context) => {
  const { genre } = context.query;
  const res = await getGenreLib(genre);
  const data = await serializeErrorFunc(res);
  return { props: { data, genre } };
};
