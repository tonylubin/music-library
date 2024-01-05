import { CldImage } from "next-cloudinary";
import React, { useState } from "react";
import { LuMoreHorizontal } from "react-icons/lu";
import { Tooltip } from "react-tooltip";
import { RiHeartFill, RiHeartLine } from "react-icons/ri";
import Menu from "./Menu";
import { motion } from "framer-motion";
import AudioPlayer from "./AudioPlayer";

// framer motion variants
// animation --> 1st: scale 2nd: rotate
const effect = {
  type: "tween",
  ease: "easeInOut",
}

const duration = 0.3;

const variants = {
  open: {
    rotateY: 0,
    transition: {
      effect,
      duration: duration,
    }
    
  },
  closed: {
    rotateY: -180,
    transition: {
      effect,
      duration: duration,
      delay: duration
    }
  },
  normal: {
    scale: 1,
    transition: {
      effect,
      duration: duration,
      delay: duration
    }
  },
  scaled: {
    scale: 1.05,
    transition: {
      effect,
      duration: duration,
    }
  }
}

const TrackCards = ({ trackData, isFavourite, setIsFavourite, playlistData, placeHolder }) => {
  const [flipOpen, setFlipOpen] = useState(false);

  return (
    <div className="flex w-[50rem] shadow-xl rounded-lg overflow-hidden">
      <AudioPlayer trackData={trackData} />
      <div className="bg-primaryRed/80 w-[30rem] p-8 flex flex-col items-end justify-between">
        <button
          type="button"
          aria-label="menu"
          className="rounded-full h-10 w-10 hover:scale-110"
          id="tooltip"
          onClick={() => setFlipOpen(!flipOpen)}
        >
          <LuMoreHorizontal className="mx-auto" size={40} />
        </button>
        <motion.div 
          className="aspect-square rounded-lg self-center cardContainer overflow-hidden"
          animate={flipOpen ? "scaled" : "normal" }
          variants={variants}
        >
          <motion.div
            className="relative w-full h-full rounded-lg card"
            animate={flipOpen ? "closed" : "open" }
            variants={variants}
          >
            <div className="h-full w-full rounded-lg overflow-hidden cardFace shadow-2xl">
              <CldImage
                alt="vinyl record cover"
                src={trackData.image_url}
                width={325}
                height={325}
                sizes="100vw"
                placeholder="blur"
                blurDataURL={placeHolder}
              />
            </div>
            <div className="h-full w-full cardFace rounded-lg overflow-hidden cardBack border border-neutral-200">
              <Menu
                trackId={trackData.track_id}
                playlistData={playlistData}
                isFavourite={isFavourite}
                setIsFavourite={setIsFavourite}
                flipOpen={flipOpen}
              />
            </div>
          </motion.div>
        </motion.div>
        {isFavourite ? (
          <RiHeartFill aria-label="favourite" className="text-4xl text-primaryGreen" />
        ) : (
          <RiHeartLine aria-label="non-favourite"  className="text-4xl text-neutral-200" />
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
