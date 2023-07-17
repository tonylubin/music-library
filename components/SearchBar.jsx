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
          className="text-black placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-full py-1 px-5 shadow-md hover:ring-neutral-400 hover:border-neutral-400 hover:ring-2 focus:outline-none focus:border-neutral-300 focus:ring-neutral-300 focus:ring-2 sm:text-sm"
          placeholder="Search artist/title..."
          type="text"
          name="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          autoFocus
        />
        <button className="text-black hover:text-white bg-neutral-200 hover:bg-neutral-300  font-medium rounded-lg text-sm px-5 py-2.5 text-center hover:outline">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
