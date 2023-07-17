import React from "react";
import Card from "./Card";
import { capitaliseEachWord, capitaliseWord } from "@/utils/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import DropDownMenu from "./DropDownMenu";

const TrackCard = ({
  addToFavourites,
  removeFromFavourites,
  isFavourite,
  trackData,
  playlistData,
  addToPlaylist,
  removeFromPlaylist,
}) => {
  const { trackId, title, artist, album, genre, year, imageUrl } = trackData;

  return (
    <div className="w-3/5 h-1/2 flex items-center justify-end rounded-lg relative bg-gunmetal shadow-xl">
      {/* <FontAwesomeIcon icon={faPlus} size="2xl" className="absolute right-6 top-8 hover:cursor-pointer" title="Add to Playlist" /> */}
      <div className="absolute right-6 top-8 hover:cursor-pointer">
        <DropDownMenu
          addToFavourites={addToFavourites}
          removeFromFavourites={removeFromFavourites}
          trackId={trackId}
          playlistData={playlistData}
          removeFromPlaylist={removeFromPlaylist}
          addToPlaylist={addToPlaylist}
        />
      </div>
      <div className="w-60 h-60 absolute left-[-5%] shadow-xl rounded-xl">
        <Card imageUrl={imageUrl} />
      </div>
      <div className="w-3/5 flex flex-col pr-8 gap-2 capitalize">
        <p className="text-lg font-bold">Track</p>
        <p className="text-5xl font-bold">{title}</p>
        <p className="text-lg font-bold">{artist}</p>
        {album !== "n/a" && <p className="text-lg">{album}</p>}
        <ul className="flex gap-2 items-center">
          <li className="text-lg">{year}</li>
          <span className="text-3xl">&#x2022;</span>
          <li className="text-lg">{genre}</li>
          <FontAwesomeIcon
            icon={faHeart}
            size="2xl"
            className={`ml-8 self-start ${isFavourite ? "text-red-600" : ""}`}
            title="Add to favourites"
          />
        </ul>
      </div>
    </div>
  );
};

export default TrackCard;
