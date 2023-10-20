import HomeCard from "@/components/HomeCard";
import React from "react";
import { promises as fs } from 'fs';
import path from 'path';
import { getPlaiceholder } from "plaiceholder";


const Home = ({ data, placeHolders }) => {

  const getMusicGenres = data.map((music, i) => (
    <HomeCard
      key={i}
      genre={music.genre}
      page={music.pageUrl}
      imgUrl={music.imgPath}
      placeHolder={placeHolders[i]}
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


export const getStaticProps = async () => {

  // fetch data from local json file
  const filePath = path.join(process.cwd(), 'database/homePageData.json')
  const jsonData = await fs.readFile(filePath)
  const data = await JSON.parse(jsonData)

  // Array of img urls
  const imgSrc = await Promise.all(data.map(async (img) => {
    const filePath = path.join(process.cwd(), `public/${img.imgPath}`);
    const file = await fs.readFile(filePath);
    return file;
  }));

  // get image placeholders
  const placeHolders = await Promise.all(imgSrc.map( async (file) => {
    const { base64 } = await getPlaiceholder(file);
    return base64;
  }));

  return { props: { data, placeHolders } };
};
