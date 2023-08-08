import React, { useState } from "react";
import MainMenu from "./MainMenu";
import SubMenu from "./SubMenu";
import { destroyNotification, successNotification } from "@/utils/utils";

const Menu = ({ flipOpen, setIsFavourite, playlistData, trackId }) => {
  const [subMenu, setSubMenu] = useState({ status: false, action: null });

  //  add to playlist
  const addToPlaylist = async (name, trackNum) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, trackNum }),
    };
    let res = await fetch("/api/playlists/playlist", requestOptions);
    let { msg } = await res.json();
    successNotification(msg);
  };

  //  remove from playlist
  const removeFromPlaylist = async (name, id) => {
    let res = await fetch(`/api/playlists/playlist?name=${name}&id=${id}`, {
      method: "DELETE",
    });
    let { msg } = await res.json();
    destroyNotification(msg);
  };

  return (
    <div className="h-full w-full">
      <MainMenu
        trackId={trackId}
        flipOpen={flipOpen}
        setSubMenu={setSubMenu}
        setIsFavourite={setIsFavourite}
      />
      <SubMenu
        trackId={trackId}
        subMenu={subMenu}
        setSubMenu={setSubMenu}
        playlistData={playlistData}
        removeFromPlaylist={removeFromPlaylist}
        addToPlaylist={addToPlaylist}
      />
    </div>
  );
};

export default Menu;
