import Image from "next/image";
import Link from "next/link";
import React from "react";

const HomeCard = ({ genre, page, imgUrl }) => {
  return (
    <Link
      href={page}
      className="relative h-52 rounded-xl flex items-center justify-center overflow-hidden  hover:scale-95 hover:bg-neutral-50 hover:opacity-80 transition duration-300 ease-in-out shadow-2xl"
    >
      <p className="text-3xl font-semibold font-kanit tracking-wider z-10">
        {genre}
      </p>
      <Image
        alt="music genre"
        src={imgUrl}
        sizes="100vw"
        fill
        className="object-cover absolute rounded-xl opacity-70"
      />
    </Link>
  );
};

export default HomeCard;
