import React from 'react'
import CreateModal from './CreateModal';


const PlaylistCardHolder = () => {
  return (
    <article className='flex flex-col items-center justify-center gap-6 rounded-lg  shadow-cardShadow border border-dashed border-primaryRed aspect-square'>
      <p className='font-bold text-xl px-2 text-center'>Create a playlist</p>
      <CreateModal />
    </article>
  )
}

export default PlaylistCardHolder;