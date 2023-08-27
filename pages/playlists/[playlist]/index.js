import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import bannerImage from "../../../public/images/analog-turntable-spinning-retro-soundtrack-nightclub-generated-by-ai.jpg";
import { getPlaylistTable } from "@/database/musicLibrary";
import { serializeErrorFunc } from "@/utils/utils";
import { CldImage } from "next-cloudinary";
import Link from "next/link";
import { BsPlayCircleFill, BsPauseCircleFill } from "react-icons/bs";
import MiniAudioPlayer from "@/components/MiniAudioPlayer";

function Playlist({ trackData }) {
  const [showPlayBtn, setShowPlayBtn] = useState({ id: null, status: false });
  const [simplePlay, setSimplePlay] = useState(false);
  const [currentTrack, setCurrentTrack] = useState({ title: '', artist: '', image: '', audio: '', duration: '00:00'});

  const router = useRouter();
  const name = router.query.playlist;

  // hover play status - mouseEnter
  const mouseEnterPlay = (e) => {
    let element = Number(e.currentTarget.id) + 1;
    setShowPlayBtn({ id: element, status: true, playing: true });
  };

  // hover play status - mouseLeave
  const mouseLeavePlay = () => {
    setShowPlayBtn({ id: null, status: false });
  };

  // handle hover playing
  const handleMouseOverPlay = async (e) => {
    // off set with array & playlist starting from 1 
    let i = e.currentTarget.parentElement.id - 1;
    setCurrentTrack({
      title: trackData[i].title,
      artist: trackData[i].artist,
      audio: trackData[i].audioUrl,
      image: trackData[i].imageUrl,
      duration: trackData[i].duration
    });
    setSimplePlay(!simplePlay);
  };

  // added modulo operator for odd/even colour scheme
  const getPlaylistTracks = trackData.map((track, index) => (
    <div
      key={index}
      id={index}
      className={`grid grid-cols-playlistHeader  text-neutral-300 capitalize hover:bg-redHover rounded items-center ${
        index % 2 == 0 ? "bg-brownCard" : "bg-transparent"
      }`}
      onMouseEnter={mouseEnterPlay}
      onMouseLeave={mouseLeavePlay}
    >
      <div className="justify-self-center">{index + 1}</div>

      <div className="flex items-center gap-6">
        <div className="w-10 h-10 relative">
          {showPlayBtn.id === index + 1 && (
            <div
              id={index + 1}
              className="w-full h-full flex items-center justify-center bg-black/50 absolute"
            >
              <button
                className="text-3xl text-white/80 active:text-white"
                onClick={handleMouseOverPlay}
              >
                {simplePlay ? <BsPauseCircleFill /> : <BsPlayCircleFill />}
              </button>
            </div>
          )}
          <CldImage
            alt="vinyl record cover"
            src={track.imageUrl}
            width={150}
            height={150}
            sizes="100vw"
          />
        </div>
        <Link href={`/track/${track.trackId}`}>
          <div className="truncate pr-4 hover:underline" title={track.title}>
            {track.title}
          </div>
        </Link>
      </div>
      <div className="truncate pr-4 artist" title={track.artist}>
        {track.artist}
      </div>
      <div>{track.genre}</div>
      <div className="justify-self-center">{track.duration.substring(3)}</div>
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
      <div className="h-3/4 w-full bg-primaryBgAlt pt-8 pb-24 px-8">
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
        <MiniAudioPlayer
          currentTrack={currentTrack}
          simplePlay={simplePlay}
          setSimplePlay={setSimplePlay}
        />
      </div>
    </main>
  );
}

export default Playlist;

export const getServerSideProps = async (context) => {
  const playlistName = context.query.playlist;
  const res = await getPlaylistTable(playlistName);
  const trackData = await serializeErrorFunc(res);
  return { props: { trackData } };
};
