import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import bannerImage from '../../../public/images/immo-wegmann-lfI34jNFLVs-unsplash.jpg';

function Playlist() {

  const router = useRouter();
  const name = router.query.playlist;

  return (
    <main className='col-start-3 col-end-13 row-start-1 row-end-7 font-kanit p-2'>
      <div className='w-full h-1/3 text-3xl bg-moonlitAsteroid rounded-t-xl overflow-hidden'>
        <div className='w-full h-full relative'>
          <h1 className='text-xl z-10 relative pl-16 pt-12'>Playlist</h1>
          <p className='capitalize text-8xl font-semibold pt-6 pl-16 z-10 relative'>{name}</p>
          <Image alt="record player" sizes='100vw' src={bannerImage} fill className='object-cover opacity-10'/>
        </div>
      </div>
      <div className='flex justify-center h-full w-full bg-playlist'>
        <div className='grid grid-cols-playlistHeader w-11/12'>
          <div className='col-span-full grid grid-cols-playlistHeader w-full h-fit text-lg border-b border-slate-700 text-gray-500'>
            <div className='pt-8 pb-4'>#</div>
            <div className='pt-8 pb-4'>Title</div>
            <div className='pt-8 pb-4'>Artist</div>
            <div className='pt-8 pb-4'>Genre</div>
            <div className='pt-8 pb-4'>Duration</div>
          </div>
        </div>
      </div>    
    </main>
  )
}

export default Playlist;