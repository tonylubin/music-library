import Image from "next/image";
import Link from "next/link";
import React from "react";
import landingPagePic from '../public/images/blocks-T3mKJXfdims-unsplash.jpg';

function Home() {
  return (
    <div className="flex flex-col items-end gap-y-8 h-full font-bioRhyme">
      <Image
        alt="vinyl and headphones on shelf"
        src={landingPagePic}
        fill
      />
      <h1 className="text-7xl font-extrabold mt-20 mr-10 z-10">My Vinyl Library</h1>
      <Link
        href={"/tracks"}
        className="text-2xl underline z-10 underline-offset-2 decoration-2 mr-10"
      >
        Enter the Library
      </Link>
    </div>
  );
}

export default Home;
