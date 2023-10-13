import React from "react";
import SideNav from "./SideNav";
import Heading from "./Heading";
import Head from "next/head";
import { useRouter } from "next/router";
import { capitaliseEachWord, capitaliseWord } from "@/utils/utils";


const Layout = ({ children }) => {
  
  const router = useRouter();
  const currentPage = router.pathname;

  // dynamic page title
  let pageTitle;

  switch (currentPage) {
    case "/home":
      pageTitle = 'Home';
      break;
    case "/library":
      pageTitle = 'Library';
      break;
    case "/playlists":
      pageTitle = 'Playlists';
      break;
    case "/playlists/[playlist]":
      pageTitle = `Playlist - ${capitaliseEachWord(router.query.playlist,capitaliseWord)}`;
      break;
    case "/genres/[genre]":
      pageTitle = `${capitaliseEachWord(router.query.genre,capitaliseWord)}`;
      break;
    case "/favourites":
      pageTitle = 'Favourites';
      break;
    case "/addTrack":
      pageTitle = 'Form - add music to library'; 
      break;
    case "/search":
      pageTitle = 'Search';
      break;
    case "/track/[trackId]":
      pageTitle = `${capitaliseEachWord(children.props.trackData.artist,capitaliseWord)}`;
      break;  
    default:
     pageTitle = 'The Vinyl Library' 
  }

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <div className="grid grid-cols-12 grid-rows-6 h-full w-full font-bioRhyme">
        <Heading />
        <SideNav />
        {children}
      </div>
    </>
  );
}

export default Layout;