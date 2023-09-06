import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import landingPagePic from "../public/images/blocks-T3mKJXfdims-unsplash.jpg";
import { Zoom, Slide } from "react-awesome-reveal";

function Home() {

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
          <Zoom delay={500}>
            <h1 className="text-7xl font-extrabold mt-20 mr-10 z-10">
              The Vinyl Lib<span className="text-4xl">.</span>
            </h1>
          </Zoom>
          <Slide direction="right" delay={1000}>
            <Link
              href={"/home"}
              className="text-2xl underline text-primaryRed z-10 underline-offset-4 decoration-[3px] mr-10"
            >
              Enter the Library
            </Link>
          </Slide>
        </>
      )}
    </div>
  );
}

export default Home;
