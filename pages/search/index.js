import Header from "@/components/Header";
import MusicCard from "@/components/MusicCard";
import { searchFunc } from "@/database/musicLib";
import React, { useEffect, useState } from "react";

const Search = ({ searchResults, query, placeHolders }) => {
  const [queryRequest, setQueryRequest] = useState(true);
  const [isLoading, setIsLoading] = useState();

  
  const searchQuery = searchResults.map((track, i) => (
    <MusicCard
    key={i}
    artist={track.artist}
    title={track.title}
    trackId={track.track_id}
    imageUrl={track.image_url}
    placeHolder={placeHolders[i]}
    />
    ));
    
    useEffect(() => {
      if (query.length >= 1) {
        setQueryRequest(false);
      }
      if (query.length === 0) {
        setQueryRequest(true);
      }
      setIsLoading(false);
    }, [query.length]);
    

  return (
    <div className="col-start-3 col-end-13 row-start-1 row-end-7 bg-blackShade grid grid-cols-5 grid-rows-6">
      <Header isLoading={isLoading} setIsLoading={setIsLoading} />
      <main className="grid col-start-1 col-end-13 row-start-2 row-end-7 z-0 overflow-auto rounded-tl-lg bg-primaryBgAlt">
        <section className="grid grid-cols-5 auto-rows-max gap-12 py-12 px-12 relative">
          {queryRequest && (
            <p className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl">
              Awaiting search query...
            </p>
          )}
          {!queryRequest && !searchQuery.length ? (
            <p className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl">
              Sorry, no results were found that matched your query!
            </p>
          ) : (
            searchQuery
          )}
        </section>
      </main>
    </div>
  );
};

export default Search;

export const getServerSideProps = async (context) => {
  // deconstruct query param
  let { term } = context.query;
 
  // conditional check for handling null/undefined url search query
  let query = term ? term : "";

  let searchResults = await searchFunc(query);

  // Array of img urls
  const imgSrc = searchResults.map((track) => track.image_url);

  // fetching image placeholders
  const url = `${process.env.BASE_URL}/api/placeholders`;
  const getPlaceHolders = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(imgSrc)
  });

  const { placeHolders } = await getPlaceHolders.json();

  return { props: { searchResults, query, placeHolders } };
};
