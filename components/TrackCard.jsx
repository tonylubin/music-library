import React from "react";
import Card from "./Card";
import { LuHeart, LuMoreHorizontal } from 'react-icons/lu';
import { Tooltip } from "react-tooltip";


const TrackCard = ({ trackData, openMenu, setOpenMenu, isFavourite }) => {
  const { title, artist, album, genre, year, imageUrl } = trackData;

  return (
    <div className="w-3/5 h-1/2 flex items-center justify-end rounded-lg relative shadow-2xl">
      <div className="w-60 h-60 absolute left-[-5%] shadow-xl rounded-xl overflow-hidden">
        <Card imageUrl={imageUrl} />
      </div>
      <div className="w-3/5 flex flex-col pr-8 gap-2 capitalize font-kanit">
        <p className="text-lg font-bold font-bioRhyme">Track</p>
        <p className="text-3xl font-bold text-primaryRed">{title}</p>
        <p className="text-lg font-medium">{artist}</p>
        {album !== "n/a" && <p className="text-lg">{album}</p>}
        <ul className="flex gap-2 items-center font-kanit font-light">
          <li className="text-lg">{year}</li>
          <span className="text-3xl">&#x2022;</span>
          <li className="text-lg">{genre}</li>
          <LuHeart
            className={`h-7 w-7 ml-8 ${
              isFavourite ? "text-redHover" : "text-[#888] opacity-40"
            }`}
          />
        </ul>
        <button
          type="button"
          className="bg-brownCardShade border border-brownCardShade hover:border-redHover rounded-full h-10 w-10"
          id="tooltip"  
          onClick={() => setOpenMenu(!openMenu)}
        >
          <LuMoreHorizontal className="text-redHover mx-auto" size={30}/>
        </button>
        <Tooltip anchorSelect="#tooltip" place="bottom" offset={15} style={{background: '#2e2e2e', color: "#d6374a" }}>
          menu
        </Tooltip>
      </div>
    </div>
  );
};

export default TrackCard;
