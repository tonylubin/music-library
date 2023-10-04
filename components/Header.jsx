import React, { useState } from "react";
import SearchBar from "./SearchBar";
import { FaMagnifyingGlass } from "react-icons/fa6";

const Header = ({ isLoading, setIsLoading }) => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="col-start-1 col-end-13 row-start-1 row-end-2 z-10 flex flex-col justify-center gap-4 bg-blackShade">
      <div className="flex gap-6 items-center justify-center pt-8 text-redHover w-full">
        <FaMagnifyingGlass className="h-8 w-8" />
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      </div>
    </div>
  );
};

export default Header;
