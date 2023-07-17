import Header from "@/components/Header";
import MainCard from "@/components/MainCard";
import { searchFunc } from "@/database/musicLibrary";
import { serializeErrorFunc } from "@/utils/utils";
import React from "react";

function Search({ searchResults }) {
  const searchQueryTracks = searchResults.map((track, i) => (
    <MainCard
      key={i}
      title={track.title}
      artist={track.artist}
      trackId={track.trackId}
      imageUrl={track.imageUrl}
    />
  ));

  return (
    <div className="col-start-3 col-end-13 row-start-1 row-end-7 bg-moonlitAsteroid grid grid-cols-5 grid-rows-6">
      <Header />
      <main className="grid col-start-1 col-end-13 row-start-2 row-end-7 z-0 overflow-auto">
        <section className="grid grid-cols-5 auto-rows-max gap-x-12 gap-y-24 py-12 px-12">
          {searchQueryTracks}
        </section>
      </main>
    </div>
  );
}

export default Search;

export async function getServerSideProps(context) {

  // deconstruct query param
  let { term }  = context.query;

  // conditional check for handling null/undefined url search query  
  let query = term ? term : '';

  let searchQuery = await searchFunc(query);
  let searchResults = await serializeErrorFunc(searchQuery);
  return { props: { searchResults } };
}
