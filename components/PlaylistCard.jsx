import Link from "next/link";
import React from "react";
import cardImg from "../public/images/Free_Vinyl_Mockup_5.jpg";
import Image from "next/image";
import DeleteDialog from "./DeleteDialog";
import { destroyNotification, toastClose } from "@/utils/utils";
import { useRouter } from "next/router";

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
    <article className="flex flex-col items-center justify-start gap-6 rounded-lg  shadow-cardShadow aspect-square h-full relative">
      <div className="absolute z-20 -top-2 -right-2">
        <DeleteDialog
          playlistName={playlistName}
          removePlaylist={removePlaylist}
        />
      </div>
      <p className="text-navyBlue text-xl font-bold capitalize z-10 pt-2">
        {playlistName}
      </p>
      <Link href={`/playlists/${playlistName}`}>
        <Image
          alt="record player"
          sizes="100vw"
          src={cardImg}
          fill
          className="object-cover "
        />
      </Link>
    </article>
  );
};

export default PlaylistCard;
