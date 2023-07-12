import React, { useState } from "react";
import SearchBar from "./SearchBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

function Header() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="col-start-1 col-end-13 row-start-1 row-end-2 z-10 flex flex-col justify-center gap-4">
      <div className="flex gap-6 items-center justify-center pt-8 text-blue-700 w-full">
        <FontAwesomeIcon icon={faMagnifyingGlass} size="2xl" />
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </div>
      <h2 className="text-sm w-1/2 mx-auto font-semibold text-slate-500 pl-12">
        Searching for:{" "}
        <span className="ml-2 text-slate-300">
          {searchQuery.toUpperCase()}
        </span>
      </h2>
    </div>
  );
}

export default Header;
