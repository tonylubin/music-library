import HomeCard from "@/components/HomeCard";
import React from "react";
import data from "../../database/homePageData.json";

const Home = () => {
  const getMusicGenres = data.map((music, i) => (
    <HomeCard
      key={i}
      genre={music.genre}
      page={music.pageUrl}
      imgUrl={music.imgPath}
    />
  ));

  return (
    <main className="col-start-3 col-end-13 row-start-1 row-end-7 bg-primaryBgAlt">
      <section className="h-full w-full grid grid-cols-homepage gap-x-14 gap-y-19 justify-center items-center p-8">
        {getMusicGenres}
      </section>
    </main>
  );
};

export default Home;

// fetch data from local json file
// import { promises as fs } from 'fs';
// import path from 'path';

// export const getStaticProps = async () => {
//   const filePath = path.join(process.cwd(), 'database/homePageData.json')
//   const jsonData = await fs.readFile(filePath)
//   const data = await JSON.parse(jsonData)
//   return { props: { data } };
// }
