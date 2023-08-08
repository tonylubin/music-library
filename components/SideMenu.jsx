import React, { useState } from "react";
import { Transition } from "@headlessui/react";
import { RxCross2 } from "react-icons/rx";
import MainMenu from "./MainMenu";
import SubMenu from "./SubMenu";
import { destroyNotification, successNotification } from "@/utils/utils";

const SideMenu = ({
  openMenu,
  setOpenMenu,
  playlistData,
  trackId,
  setIsFavourite,
}) => {

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
    <Transition
      show={openMenu}
      enter="duration-500 transition-transform ease-in-out"
      enterFrom="translate-x-full"
      enterTo="translate-x-0"
      leave="duration-500 transition-transform ease-in-out"
      leaveFrom="translate-x-0"
      leaveTo="translate-x-full"
      className="h-screen bg-blackShade w-1/5 px-4 absolute top-0 right-0"
    >
      <div className="flex justify-end mt-4">
        <RxCross2
          className="text-primaryRed h-8 w-8"
          onClick={() => setOpenMenu(!openMenu)}
        />
      </div>
      <div className="h-full w-full relative">
        <MainMenu
          trackId={trackId}
          openMenu={openMenu}
          setSubMenu={setSubMenu}
          setIsFavourite={setIsFavourite}
        />
        <SubMenu
          subMenu={subMenu}
          setSubMenu={setSubMenu}
          playlistData={playlistData}
          removeFromPlaylist={removeFromPlaylist}
          addToPlaylist={addToPlaylist}
        />
      </div>
    </Transition>
  );
};

export default SideMenu;
