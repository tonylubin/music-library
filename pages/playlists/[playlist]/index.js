import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import bannerImage from "../../../public/images/analog-turntable-spinning-retro-soundtrack-nightclub-generated-by-ai.jpg";
import { getPlaylistTable } from "@/database/musicLibrary";
import { serializeErrorFunc } from "@/utils/utils";
import { CldImage } from "next-cloudinary";
import Link from "next/link";
import { Tooltip } from "react-tooltip";

function Playlist({ data }) {
  const router = useRouter();
  const name = router.query.playlist;

  // added modulo function for odd/even colour scheme
  const getPlaylistTracks = data.map((track, index) => (
    <div
      key={index}
      className={`col-span-full grid grid-cols-playlistHeader w-full h-full text-lg text-neutral-300 capitalize hover:bg-redHover rounded content-center ${
        index % 2 == 0 ? "bg-brownCard" : "bg-transparent"
      }`}
    >
      <div className="justify-self-center">{index + 1}</div>

      <div className="flex gap-6">
        <div className="w-10 h-10">
          <CldImage
            alt="vinyl record cover"
            src={track.imageUrl}
            width={150}
            height={150}
            sizes="100vw"
          />
        </div>
        <Link href={`/track/${track.trackId}`} id={index}>
          <div className="truncate pr-4 hover:underline" title={track.title}>
            {track.title}
          </div>
        </Link>
      </div>
      <div className="truncate pr-4 artist" title={track.artist}>
        {track.artist}
      </div>
      <div>{track.genre}</div>
      <div className="justify-self-center">03:33</div>
    </div>
  ));

  return (
    <main className="col-start-3 col-end-13 row-start-1 row-end-7 font-kanit bg-neutral-900">
      <div className="w-full h-1/4 bg-brownShadeAlt overflow-hidden">
        <div className="w-full h-full relative">
          <h1 className="text-xl z-10 pl-16 pt-8">Playlist</h1>
          <p className="capitalize text-7xl font-semibold pt-6 pl-16 z-10">
            {name}
          </p>
          <Image
            alt="record player"
            sizes="100vw"
            src={bannerImage}
            fill
            className="object-cover opacity-10 object-[10%_60%]"
          />
        </div>
      </div>
      <div className="flex justify-center h-full w-full bg-primaryBgAlt pt-8">
        <div className="grid grid-cols-playlistHeader w-11/12 auto-rows-[4rem] items-center ">
          <div className="col-span-full grid grid-cols-playlistHeader w-full h-4/6 text-lg border-b-[0.5px] border-b-zinc-400 text-zinc-400 content-center">
            <div className="justify-self-center">#</div>
            <div>Title</div>
            <div>Artist</div>
            <div>Genre</div>
            <div className="justify-self-center">Duration</div>
          </div>
          {getPlaylistTracks}
        </div>
      </div>
    </main>
  );
}

export default Playlist;

export const getServerSideProps = async (context) => {
  const playlistName = context.query.playlist;
  const res = await getPlaylistTable(playlistName);
  const data = await serializeErrorFunc(res);
  return { props: { data } };
};
