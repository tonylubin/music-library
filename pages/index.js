import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import landingPagePic from "../public/images/stacked-vinyls.jpeg";
import { motion } from "framer-motion";
import Head from "next/head";

const Home = () => {
  const [imgLoaded, setImageLoaded] = useState(false);

  return (
    <>
      <Head>
        <title>The Vinyl Library</title>
      </Head>
      <div className="flex flex-col items-end gap-y-8 h-full font-bioRhyme">
        <Image
          alt="vinyl and headphones on shelf"
          src={landingPagePic}
          fill
          priority={true}
          placeholder="blur"
          onLoadingComplete={() => setImageLoaded(true)}
          className="z-0 opacity-40"
        />
        {imgLoaded && (
          <>
            <motion.h1
              initial={{ opacity: 0, y: "-100%" }}
              animate={{ opacity: 1, y: "0%" }}
              transition={{ ease: "easeIn", duration: 0.5 }}
              className="text-primaryRed text-7xl font-extrabold mt-20 mr-10 z-10"
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
                className="text-2xl underline z-10 underline-offset-4 decoration-[3px] mr-10"
              >
                Enter the Library
              </Link>
            </motion.div>
          </>
        )}
      </div>
    </>
  );
};

export default Home;
