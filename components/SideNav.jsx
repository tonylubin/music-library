import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FaHome, FaSearch } from "react-icons/fa";
import { LuLibrary, LuHeart } from "react-icons/lu";
import { ImHeadphones } from "react-icons/im";
import { TbVinyl } from "react-icons/tb";
import { useRouter } from "next/router";

const SideNav = () => {
  //  get current page path & enable "active link" styling
  const router = useRouter();
  let currentPage = router.pathname;

  const [isActive, setActive] = useState({ home: true });

  useEffect(() => {
    switch (currentPage) {
      case "/home":
        setActive({ home: true });
        break;
      case "/library":
        setActive({ library: true });
        break;
      case "/playlists":
        setActive({ playlists: true });
        break;
      case "/playlists/[playlist]":
        setActive({ playlists: true });
        break;
      case "/favourites":
        setActive({ favs: true });
        break;
      case "/addTrack":
        setActive({ addMusic: true });
        break;
      case "/search":
        setActive({ searching: true });
        break;
      default:
        setActive(false);
    }
  }, [currentPage]);

  return (
    <div className="flex items-center justify-center flex-col col-start-1 col-end-3 row-start-2 row-end-7 bg-blackShade">
      <nav className="flex flex-col gap-10 text-lg h-3/4">
        <div
          data-testid="link-home"
          className={`hover:text-primaryRed flex items-center gap-x-4 ${
            isActive.home ? "text-primaryRed" : ""
          }`}
        >
          <FaHome aria-hidden={true} title="home" />
          <Link href={"/home"}>Home</Link>
        </div>
        <div
          data-testid="link-library"
          className={`hover:text-primaryRed flex items-center gap-x-4 ${
            isActive.library ? "text-primaryRed" : ""
          }`}
        >
          <LuLibrary aria-hidden={true} title="library" />
          <Link href={"/library"}>Library</Link>
        </div>
        <div
          data-testid="link-playlists"
          className={`hover:text-primaryRed flex items-center gap-x-4 ${
            isActive.playlists ? "text-primaryRed" : ""
          }`}
        >
          <ImHeadphones aria-hidden={true} title="playlists" />
          <Link href={"/playlists"}>Playlists</Link>
        </div>
        <div
          data-testid="link-favourites"
          className={`hover:text-primaryRed flex items-center gap-x-4 ${
            isActive.favs ? "text-primaryRed" : ""
          }`}
        >
          <LuHeart aria-hidden={true} title="favourites" />
          <Link href={"/favourites"}>Favourites</Link>
        </div>
        <div
          data-testid="link-addMusic"
          className={`hover:text-primaryRed flex items-center gap-x-4 ${
            isActive.addMusic ? "text-primaryRed" : ""
          }`}
        >
          <TbVinyl aria-hidden={true} title="add music" />
          <Link href={"/addTrack"}>Add Music</Link>
        </div>
        <div
          data-testid="link-search"
          className={`hover:text-primaryRed flex items-center gap-x-4 ${
            isActive.searching ? "text-primaryRed" : ""
          }`}
        >
          <FaSearch aria-hidden={true} title="search" />
          <Link href={"/search"}>Search</Link>
        </div>
      </nav>
    </div>
  );
};

export default SideNav;
