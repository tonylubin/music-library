import { useRouter } from "next/router";
import React from "react";

const SearchBar = ({ searchQuery, setSearchQuery }) => {

  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    router.push(`/search?term=${searchQuery}`);
  };

  return (
    <div className="w-2/4 flex gap-4 items-center relative">
      <form onSubmit={handleSearch} className="flex gap-6 w-full">
        <input
          className="text-neutral-300 placeholder:italic placeholder:text-brownText block bg-brownShadeAlt w-full border-[0.1px] border-brownShade rounded-full py-1 px-5 shadow-md focus:outline-none focus:border-brownHover focus:ring-brownHover focus:ring-1 sm:text-sm font-kanit"
          placeholder="Search artist/title..."
          type="text"
          name="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="text-neutral-300 hover:text-black bg-redHover hover:bg-primaryRed font-medium rounded-lg px-5 py-2.5 text-center hover:outline hover:outline-primaryRed">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
