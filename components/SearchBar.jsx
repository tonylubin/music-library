import { useRouter } from "next/router";
import React from "react";

const SearchBar = ({ searchQuery, setSearchQuery, isLoading, setIsLoading }) => {
  const router = useRouter();

  const handleSearch = (e) => {
    setIsLoading(true);
    e.preventDefault();
    // handle query params
    let routePath = searchQuery.length
      ? `/search?term=${searchQuery}`
      : "/search";
      router.push(routePath);
      // setTimeout(() => router.push(routePath), 1000);
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
          onInput={(e) => setSearchQuery(e.target.value)}
        />
        {!isLoading ? (
          <button type="submit" className="text-neutral-300 hover:text-black bg-redHover hover:bg-primaryRed font-medium rounded-lg px-5 py-2.5 text-center hover:outline hover:outline-primaryRed">
            Search
          </button>
        ) : (
          <button
            type="button"
            className="bg-primaryRed h-max w-max rounded-lg px-5 py-2.5 text-neutral-200 font-medium hover:contrast-50 hover:cursor-not-allowed duration-[500ms,800ms]"
            disabled
          >
            <div className="flex items-center justify-center gap-2">
              <div className="h-5 w-5 border-t-transparent border-solid animate-spin rounded-full border-white border-4"></div>
              <div> Searching... </div>
            </div>
          </button>
        )}
      </form>
    </div>
  );
};

export default SearchBar;
