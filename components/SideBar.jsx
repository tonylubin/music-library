import React from "react";
import Link from "next/link";
import { faCompactDisc, faHeadphonesSimple, faHouse, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function SideBar() {
  return (
    <div className="flex items-center flex-col col-start-1 col-end-3 row-start-2 row-end-7 bg-black">
      <nav className="w-2/3 flex flex-col gap-10 text-lg mt-24">
        <div className="hover:text-blue-600">
          <FontAwesomeIcon icon={faHouse} />
          <Link href={'/tracks'} className="pl-4">Home</Link>
        </div>
        <div className="hover:text-blue-600">
          <FontAwesomeIcon icon={faCompactDisc} />
          <Link href={'/addMusic'} className="pl-4">Add Music</Link>
        </div>
        <div className="hover:text-blue-600">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
          <Link href={'/search'} className="pl-4">Search</Link>
        </div>
        <div className="hover:text-blue-600">
          <FontAwesomeIcon icon={faHeart} />
          <Link href={'/favourites'} className="pl-4">Favourites</Link>
        </div>
        <div className="hover:text-blue-600">
          <FontAwesomeIcon icon={faHeadphonesSimple} />
          <Link href={'/playlists'} className="pl-4">Playlists</Link>
        </div>
      </nav>
    </div>
  );
}

export default SideBar;