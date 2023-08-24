import { CldImage } from "next-cloudinary";
import Link from "next/link";
import React from "react";


const MusicCard = ({ trackId, title, artist, imageUrl }) => {
  return (
    <Link href={`/track/${trackId}`}>
      <article className="rounded-lg shadow-cardShadow aspect-square relative font-kanit capitalize tracking-wider flex flex-col gap-2 p-3 hover:bg-hoverShade hover:scale-105 ease-in-out duration-300">
        <div className="w-full h-full relative rounded-lg">
          <CldImage
            alt="record player"
            sizes="100vw"
            src={imageUrl}
            width={300}
            height={300}
            className="object-cover rounded-lg"
          />
        </div>
        <div className="rounded-b-lg">
          <h3 className="text-sm px-2 font-bold text-zinc-50 truncate">
            {artist}
          </h3>
          <h3 className="text-xs px-2 pt-1 text-neutral-50 truncate">
            {title}
          </h3>
        </div>
      </article>
    </Link>
  );
};

export default MusicCard;