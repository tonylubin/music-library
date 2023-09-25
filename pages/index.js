import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import landingPagePic from "../public/images/blocks-T3mKJXfdims-unsplash.jpg";
import { motion } from "framer-motion";

const Home = () => {
  const [imgLoaded, setImageLoaded] = useState(false);

  return (
    <div className="flex flex-col items-end gap-y-8 h-full font-bioRhyme">
      <Image
        alt="vinyl and headphones on shelf"
        src={landingPagePic}
        fill
        priority={true}
        placeholder="blur"
        onLoadingComplete={() => setImageLoaded(true)}
      />
      {imgLoaded && (
        <>
          <motion.h1
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: "0%" }}
            transition={{ ease: "easeIn", duration: 0.5 }}
            className="text-7xl font-extrabold mt-20 mr-10 z-10"
          >
            The Vinyl Lib<span className="text-4xl">.</span>
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: "0%" }}
            transition={{ ease: "easeIn", duration: 0.5 }}
          >
            <Link
              href={"/home"}
              className="text-2xl underline text-primaryRed z-10 underline-offset-4 decoration-[3px] mr-10"
            >
              Enter the Library
            </Link>
          </motion.div>
        </>
      )}
    </div>
  );
};

export default Home;
