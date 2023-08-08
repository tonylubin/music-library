import HomeCard from '@/components/HomeCard';
import React from 'react';

function Home() {
  return (
    <main className='col-start-3 col-end-13 row-start-1 row-end-7 bg-primaryBgAlt overflow-auto'>
      <section className='grid grid-cols-homepage gap-10 p-12'>
        <HomeCard page={"/genres/house"} genre={"House"} imgUrl={'/images/house-genre.jpg'} />
        <HomeCard page={"/genres/ukg"} genre={"Uk Garage"} imgUrl={'/images/ukg-genre.jpg'} />
        <HomeCard page={"/genres/garage"} genre={"Garage"} imgUrl={'/images/garage-genre.jpg'} />
        <HomeCard page={"/genres/pop"} genre={"Pop"} imgUrl={'/images/pop-genre.jpg'} />
        <HomeCard page={"/genres/indie"} genre={"Indie"} imgUrl={'/images/indie-genre.jpg'} />
        <HomeCard page={"/genres/randb"} genre={"R&b"} imgUrl={'/images/randb-genre.jpg'} />
        <HomeCard page={"/genres/hiphop"} genre={"Hip-Hop"} imgUrl={'/images/hiphop-genre.jpg'} />
      </section>
    </main>
  )
}

export default Home;