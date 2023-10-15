import PlaylistCard from "@/components/PlaylistCard";
import PlaylistCardHolder from "@/components/PlaylistCardHolder";
import { getTables } from "@/database/musicLib";
import React from "react";


const Playlists = ({ data }) => {

  // get array of playlists in database
  let playlistTableArr = data.map((playlist, index) => (
    <PlaylistCard key={index} playlistName={playlist.table_name} />
  ));

  let getPlaylists;

  if(playlistTableArr.length === 0) {
    getPlaylists = <PlaylistCardHolder />
  } else {
    playlistTableArr.push(<PlaylistCardHolder key={playlistTableArr.length + 1} />)
    getPlaylists = playlistTableArr
  }

  return (
    <main className="col-start-3 col-end-13 row-start-1 row-end-7 grid grid-cols-5 auto-rows-max gap-x-12 gap-y-24 py-24 px-12 overflow-auto bg-primaryBgAlt z-0">
      {getPlaylists}
    </main>
  );
}

export default Playlists;


export const getServerSideProps = async () => {
  const data = await getTables();
  return { props: { data } };
};
