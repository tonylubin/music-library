import Image from "next/image";
import React from "react";

const Heading = () => {
  return (
    <header className="col-start-1 col-end-3 row-start-1 row-end-2 bg-blackShade flex flex-col">
      <div className="relative flex-grow m-4">
        <Image alt="music eq" src={"/images/eq-monochrome.png"} fill sizes="100vw" />
      </div>
      <div className="mx-auto">
        <h1 className="text-2xl text-primaryRed font-extrabold font-bioRhyme z-10">
        The Vinyl Lib.
        </h1>
      </div>
    </header>
  );
};

export default Heading;
