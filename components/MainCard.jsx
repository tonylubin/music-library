import React from "react";
import { CldImage } from "next-cloudinary";
import Link from "next/link";

const MainCard = (props) => {

  const { trackId, title, artist, imageUrl } = props;

  return (
    <Link href={`/track/${trackId}`} className="w-full">
      <article className="w-11/12 flex flex-col rounded-lg shadow-cardShadow relative hover:scale-105 duration-300 ease-in-out hover:transition hover:duration-300 z-10">
        <div className=" flex justify-center items-center aspect-square rounded-lg overflow-hidden">
          <CldImage
            alt="vinyl record cover"
            src={imageUrl}
            sizes="100vw"
            width={600}
            height={600}
          />
        </div>
        <div className="w-full absolute bottom-0 backdrop-blur-3xl rounded-b-lg tracking-wide capitalize font-kanit">
          <h3 className="text-sm font-bold text-zinc-50 truncate px-3 pt-2">{artist}</h3>
          <h3 className="text-xs text-neutral-50 truncate px-3 pb-2">{title}</h3>
        </div>
      </article>    
    </Link>
  );
};

export default MainCard;
