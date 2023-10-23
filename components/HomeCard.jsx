import Image from "next/image";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";

const HomeCard = ({ genre, page, imgUrl, placeHolder }) => {
  const zoom = {
    hidden: {
      scale: 0,
      opacity: 0,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1,
        delay: 0.3,
      },
    },
  };

  return (
    <motion.div initial="hidden" animate="visible" variants={zoom}>
      <Link
        href={page}
        className="relative h-full rounded-xl flex items-center justify-center overflow-hidden  hover:scale-95 hover:bg-neutral-50 hover:opacity-80 transition duration-300 ease-in-out shadow-2xl"
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
          placeholder="blur"
          blurDataURL={placeHolder}
        />
      </Link>
    </motion.div>
  );
};

export default HomeCard;
