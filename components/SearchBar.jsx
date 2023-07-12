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
          className="text-black placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-full py-1 pr-3 shadow-md hover:ring-blue-500 hover:border-bluering-blue-500 hover:ring-2 focus:outline-none focus:border-blue-700 focus:ring-blue-700 focus:ring-2 sm:text-sm"
          placeholder="Search artist/title..."
          type="text"
          name="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          autoFocus
        />
        <button className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
