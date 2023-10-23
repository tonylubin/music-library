import Image from "next/image";
import React from "react";

const Heading = () => {
  return (
    <header className="col-start-1 col-end-3 row-start-1 row-end-2 bg-blackShade relative flex flex-col">
      <div className="relative flex-1 m-4">
        <Image alt="music eq" src={"/images/eq-monochrome.png"} fill />
      </div>
      <h1 className="text-2xl text-center text-primaryRed font-extrabold font-bioRhyme z-10">
      The Vinyl Lib.
      </h1>
    </header>
  );
};

export default Heading;
