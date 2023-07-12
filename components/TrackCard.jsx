import React from "react";
import Card from "./Card";
import { capitaliseEachWord, capitaliseWord } from "@/utils/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";


const TrackCard = ({ handleFavouriteStatus, isFavourite, data}) => {

  const { trackId, title, artist, album, genre, year, imageUrl } = data;

  return (
    <div className="w-3/5 h-1/2 flex items-center justify-end rounded-lg relative bg-gradient-to-r from-gray-200 via-gray-400 to-gray-600 shadow-xl">
      <FontAwesomeIcon icon={faPlus} size="2xl" className="absolute right-6 top-8 hover:cursor-pointer" title="Add to Playlist" />
      <div className="w-60 h-60 absolute left-[-5%] shadow-xl rounded-xl">
        <Card imageUrl={imageUrl} />
      </div>
      <div className="w-3/5 flex flex-col pr-8 gap-2">
        <p className="text-lg font-bold">Track</p>
        <p className="text-5xl font-bold">
          {capitaliseEachWord(title, capitaliseWord)}
        </p>
        <p className="text-lg font-bold">{capitaliseEachWord(artist, capitaliseWord)}</p>
        {album !== "n/a" && <p className="text-lg">{album.toUpperCase()}</p>}
        <ul className="flex gap-2 items-center">
          <li className="text-lg">{year}</li>
          <span className="text-3xl">&#x2022;</span>
          <li className="text-lg">{genre.toUpperCase()}</li>
          <FontAwesomeIcon icon={faHeart} size="2xl" className={`ml-8 self-start hover:cursor-pointer ${isFavourite ? 'text-red-600' : ''}`} onClick={() => handleFavouriteStatus(trackId)} title="Add to favourites" />
        </ul>
      </div>
    </div>
  );
};

export default TrackCard;
