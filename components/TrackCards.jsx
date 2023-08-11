import AudioPlayer from "@/components/AudioPlayer";
import { CldImage } from "next-cloudinary";
import React, { useState } from "react";
import { LuMoreHorizontal } from "react-icons/lu";
import { Tooltip } from "react-tooltip";
import { RiHeartFill, RiHeartLine } from "react-icons/ri";
import Menu from "./Menu";

const TrackCards = ({
  trackData,
  isFavourite,
  setIsFavourite,
  playlistData,
}) => {
  const [flipOpen, setFlipOpen] = useState(false);

  return (
    <div className="flex w-[50rem] shadow-xl rounded-lg overflow-hidden">
      <AudioPlayer trackData={trackData} />
      <div className="bg-primaryRed/80 w-[30rem] p-8 flex flex-col items-end justify-between">
        <button
          type="button"
          className="rounded-full h-10 w-10 hover:scale-110"
          id="tooltip"
          onClick={() => setFlipOpen(!flipOpen)}
        >
          <LuMoreHorizontal className="mx-auto" size={40} />
        </button>
        <div className="aspect-square rounded-lg self-center cardContainer overflow-hidden">
          <div
            className={`relative w-full h-full rounded-lg transition-transform duration-1000 card ${
              flipOpen ? "rotated" : ""
            }`}
          >
            <div className="h-full w-full absolute rounded-lg overflow-hidden cardFace shadow-2xl">
              <CldImage
                alt="vinyl record cover"
                src={trackData.imageUrl}
                width={325}
                height={325}
                sizes="100vw"
              />
            </div>
            <div className="h-full w-full absolute cardFace rounded-lg overflow-hidden cardBack border border-neutral-200">
              <Menu
                trackId={trackData.trackId}
                playlistData={playlistData}
                isFavourite={isFavourite}
                setIsFavourite={setIsFavourite}
                flipOpen={flipOpen}
              />
            </div>
          </div>
        </div>
        {isFavourite ? (
          <RiHeartFill className="text-4xl text-primaryGreen" />
        ) : (
          <RiHeartLine className="text-4xl text-neutral-200" />
        )}
      </div>
      <Tooltip
        anchorSelect="#tooltip"
        style={{ background: "#141010" }}
        place="top"
        offset={1}
      >
        Menu
      </Tooltip>
    </div>
  );
};

export default TrackCards;
