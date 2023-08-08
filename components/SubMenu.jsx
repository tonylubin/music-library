import { MdOutlineQueueMusic } from "react-icons/md";
import { LuChevronLeft } from "react-icons/lu";
import React from "react";
import { Transition } from "@headlessui/react";

const SubMenu = ({
  subMenu,
  setSubMenu,
  playlistData,
  addToPlaylist,
  removeFromPlaylist,
  trackId
}) => {

  //  get playlists tables for add function
  const addFuncPlaylistTables = playlistData.map((table, index) => (
    <li
      key={index}
      className="flex items-center gap-4 text-neutral-300 hover:text-primaryRed hover:cursor-pointer"
      onClick={() => addToPlaylist(table.TABLE_NAME, trackId)}
    >
      <MdOutlineQueueMusic className="h-6 w-6" />
      <span>{table.TABLE_NAME}</span>
    </li>
  ));

  // get playlists tables for remove function
  const removeFuncPlaylistTables = playlistData.map((table, index) => (
    <li
      key={index}
      className="flex items-center gap-4 text-neutral-300 hover:text-primaryRed hover:cursor-pointer"
      onClick={() => removeFromPlaylist(table.TABLE_NAME, trackId)}
    >
      <MdOutlineQueueMusic className="h-6 w-6" />
      <span>{table.TABLE_NAME}</span>
    </li>
  ));

  return (
    <Transition
      show={subMenu.status}
      enter="duration-500 transition-all ease-in-out"
      enterFrom="translate-x-full"
      enterTo="translate-x-0"
      leave="duration-500 transition-all ease-in-out"
      leaveFrom="translate-x-0"
      leaveTo="translate-x-full"
      className="absolute top-0 right-0 bg-blackShade h-full w-full z-20 px-8 pt-4 pb-6 flex flex-col"
    >
      <div className="flex w-full items-center justify-center relative">
        <LuChevronLeft
          className="h-8 w-8 absolute left-0 hover:text-primaryRed"
          onClick={() => setSubMenu({ status: false, action: null, func: "" })}
        />
        <h3 className="py-4 text-lg">Playlists</h3>
      </div>
      <p className="pt-4 text-slate-400 font-kanit text-center text-sm border-t-2 border-t-slate-400">{`click on desired playlist to ${subMenu.action} track`}</p>
      <ul className="flex flex-col gap-3 mt-2 pl-2 overflow-auto">
        {subMenu.action === "add" && addFuncPlaylistTables}
        {subMenu.action === "remove" && removeFuncPlaylistTables}
      </ul>
    </Transition>
  );
};

export default SubMenu;
