import { LuChevronRight, LuStar, LuStarOff } from "react-icons/lu";
import { MdRemoveCircleOutline, MdAddCircleOutline } from "react-icons/md";
import React from "react";
import { destroyNotification, successNotification } from "@/utils/utils";

function MainMenu({ trackId, setSubMenu, setIsFavourite }) {
  // adding to favs
  const addToFavourites = async (id) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    };
    let res = await fetch("/api/favourites", requestOptions);
    let { msg } = await res.json();
    setIsFavourite(true);
    successNotification(msg);
  };

  //  delete from favs
  const removeFromFavourites = async (id) => {
    let res = await fetch(`/api/favourites/${id}`, { method: "DELETE" });
    let { msg } = await res.json();
    setIsFavourite(false);
    destroyNotification(msg);
  };

  return (
    <ul className="flex flex-col gap-6 p-8 pt-12 bg-secondaryBlack h-full w-full">
      <li
        className="flex items-center gap-4 hover:cursor-pointer pl-1 hover:text-primaryRed"
        onClick={() => addToFavourites(trackId)}
      >
        <LuStar className="h-6 w-6" />
        <span>Set as favourite</span>
      </li>
      <li
        className="flex items-center gap-4 hover:cursor-pointer pl-1 hover:text-primaryRed"
        onClick={() => removeFromFavourites(trackId)}
      >
        <LuStarOff className="h-6 w-6" />
        <span>Unset as favourite</span>
      </li>
      <span className="border-b-2 border-b-slate-400"></span>
      <li
        className="flex justify-between cursor-default pl-1 hover:text-primaryRed"
        onClick={() => setSubMenu({ status: true, action: "add" })}
      >
        <div className="flex items-center gap-4">
          <MdAddCircleOutline className="h-6 w-6" />
          <span>Add to playlist</span>
        </div>
        <LuChevronRight className="h-6 w-6" />
      </li>
      <li
        className="flex justify-between cursor-default pl-1 hover:text-primaryRed"
        onClick={() => setSubMenu({ status: true, action: "remove" })}
      >
        <div className="flex items-center gap-4">
          <MdRemoveCircleOutline className="h-6 w-6" />
          <span>Remove from playlist</span>
        </div>
        <LuChevronRight className="h-6 w-6" />
      </li>
    </ul>
  );
}

export default MainMenu;
