import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import bannerImage from "../../public/images/analog-turntable-spinning-retro-soundtrack-nightclub-generated-by-ai.jpg";
import { getPlaylistTable } from "@/database/musicLibrary";
import { serializeErrorFunc } from "@/utils/utils";
import { CldImage } from "next-cloudinary";
import Link from "next/link";
import MiniAudioPlayer from "@/components/MiniAudioPlayer";

function Test({ data }) {
  const router = useRouter();
  const name = 'example';

  // added modulo function for odd/even colour scheme
  const getPlaylistTracks = data.map((track, index) => (
    <div
      key={index}
      className={`grid grid-cols-playlistHeader text-neutral-300 capitalize hover:bg-redHover rounded items-center ${
        index % 2 == 0 ? "bg-brownCard" : "bg-transparent"
      }`}
    >
      <div className="justify-self-center">{index + 1}</div>

      <div className="flex items-center gap-6">
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
    <main className="col-start-3 col-end-13 row-start-1 row-end-7 font-kanit bg-neutral-900 flex flex-col relative">
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
      <div className="h-3/4 w-full bg-primaryBgAlt pt-8 px-8 pb-28">
        <div className="h-full w-full grid grid-flow-row auto-rows-[3rem] overflow-auto">
          <div className="grid grid-cols-playlistHeader text-lg border-b-[0.5px] border-b-zinc-400 text-zinc-400 content-center mb-4 sticky top-0 z-10 bg-primaryBgAlt">
            <div className="justify-self-center">#</div>
            <div>Title</div>
            <div>Artist</div>
            <div>Genre</div>
            <div className="justify-self-center">Duration</div>
          </div>
          {getPlaylistTracks}
        </div>
      </div>
      <div className="absolute bottom-0 w-full">
      <MiniAudioPlayer title='treat me right' artist='kim english' />
      </div>
    </main>
  );
}

export default Test;

export const getServerSideProps = async (context) => {
  const playlistName = 'example'
  const res = await getPlaylistTable(playlistName);
  const data = await serializeErrorFunc(res);
  return { props: { data } };
};

