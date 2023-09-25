import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import bannerImage from "../../../public/images/analog-turntable-spinning-retro-soundtrack-nightclub-generated-by-ai.jpg";
import { getPlaylistTable } from "@/database/musicLibrary";
import { serializeErrorFunc } from "@/utils/utils";
import { CldImage } from "next-cloudinary";
import Link from "next/link";
import MiniAudioPlayer from "@/components/MiniAudioPlayer";
import { BsPauseCircleFill, BsPlayCircleFill } from "react-icons/bs";

const Playlist = ({ trackData }) => {
  // play status
  const [playing, setPlaying] = useState(false);
  // highlight selected/currently playing track
  const [active, setActive] = useState({ id: null });
  const [currentTrackIndex, setCurrentTrackIndex] = useState();
  const [showBtn, setShowBtn] = useState({ id: null });

  const router = useRouter();
  const name = router.query.playlist;

  // handle hover playing
  const handleTrackPlay = (i) => {
    setCurrentTrackIndex(i);
    setActive({ id: i });
    setPlaying(true);
  };

  // handle hover pause
  const handleTrackPause = () => setPlaying(false);

  // handle mouse enter/leave
  const handleMouseEnter = (i) => setShowBtn({ id: i });
  const handleMouseLeave = () => setShowBtn({ id: null });

  // added modulo operator for odd/even colour scheme
  const getPlaylistTracks = trackData.map((track, index) => (
    <div
      key={index}
      id={index}
      className={`grid grid-cols-playlistHeader  text-neutral-300 capitalize hover:bg-redHover rounded items-center ${
        index % 2 == 0 ? "bg-brownCard" : ""
      } ${active.id === index ? "bg-redHover/60" : ""}`}
      onMouseEnter={() => handleMouseEnter(index)}
      onMouseLeave={handleMouseLeave}
    >
      <div className="justify-self-center">{index + 1}</div>

      <div className="flex items-center gap-6">
        <div className="w-10 h-10 relative">
          <CldImage
            alt="vinyl record cover"
            src={track.imageUrl}
            width={150}
            height={150}
            sizes="100vw"
          />
          {/* display play button only on mouse enter/leave */}
          {showBtn.id === index && (
            <div
              className="w-full h-full flex items-center justify-center bg-black/50 absolute top-0 left-0"
            >
              <button
                className="text-3xl text-white/80 active:text-white"
                title="Play"
                onClick={() => handleTrackPlay(index)}
              >
                <BsPlayCircleFill />
              </button>
            </div>
          )}
          {/* play/pause for selected current track */}
          {active.id === index && (
            <div
              className="w-full h-full flex items-center justify-center bg-black/50 absolute top-0 left-0"
            >
              {playing ? (
                <button
                  className="text-3xl text-white/80 active:text-white"
                  title="Pause"
                  onClick={handleTrackPause}
                >
                  <BsPauseCircleFill />
                </button>
              ) : (
                <button
                  className="text-3xl text-white/80 active:text-white"
                  onClick={() => handleTrackPlay(index)}
                  title="Play"
                >
                  <BsPlayCircleFill />
                </button>
              )}
            </div>
          )}
        </div>
        <Link href={`/track/${track.trackId}`} title="Track info" className="truncate pr-4 hover:underline">
          {track.title}
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
          currentTrackIndex={currentTrackIndex}
          trackData={trackData}
          playing={playing}
          setPlaying={setPlaying}
          setCurrentTrackIndex={setCurrentTrackIndex}
          active={active}
          setActive={setActive}
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
