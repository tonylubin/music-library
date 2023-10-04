import Image from "next/image";
import React from "react";

const Heading = () => {
  return (
    <header className="col-start-1 col-end-3 row-start-1 row-end-2 bg-blackShade relative">
      <div className="w-2/3 h-full mx-auto relative">
        <Image alt="music eq" width={180} height={180} src={"/images/eq.png"} className="absolute"/>
      </div>
      <div className="flex justify-center absolute bottom-0 inset-x-0 m-auto">
        <h1 className="text-2xl text-primaryRed font-extrabold font-bioRhyme z-10">
        The Vinyl Lib.
        </h1>
      </div>
    </header>
  );
};

export default Heading;
