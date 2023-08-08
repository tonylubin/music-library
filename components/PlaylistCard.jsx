import Link from "next/link";
import React from "react";
import cardImg from "../public/images/high-view-old-fashioned-cassette-tapes.jpg";
import Image from "next/image";
import { destroyNotification, toastClose } from "@/utils/utils";
import { useRouter } from "next/router";
import DeleteModal from "./DeleteModal";

const PlaylistCard = ({ playlistName }) => {
  const router = useRouter();

  // refresh server side props - to show update & callback function for toast
  const refreshData = () => {
    router.replace(router.asPath);
  };

  const removePlaylist = async (name) => {
    let res = await fetch(`/api/playlists/delete?tableName=${name}`);
    let { msg } = await res.json();
    destroyNotification(msg);
    toastClose(refreshData);
  };

  return (
    <article className="flex flex-col rounded-lg shadow-cardShadow aspect-square relative">
      <div className="absolute z-20 -top-2 -right-2">
        <DeleteModal
          playlistName={playlistName}
          removePlaylist={removePlaylist}
        />
      </div>
      <Link href={`/playlists/${playlistName}`} className="h-full w-full">
        <div className="w-full h-full overflow-hidden relative flex items-end rounded-lg">
          <Image
            alt="record player"
            sizes="100vw"
            src={cardImg}
            fill
            className="object-cover rounded-lg hover:scale-125 transition duration-500"
          />
          <div className="bg-white opacity-70 z-20 shadow-2xl rounded-b-md flex items-center w-full">
            <p className="text-black font-bold capitalize z-10 px-4 py-1">
              Playlist
            </p>
          </div>
        </div>
      </Link>
      <p className="font-light text-lg font-kanit capitalize px-4 py-2">
        {playlistName}
      </p>
    </article>
  );
};

export default PlaylistCard;
