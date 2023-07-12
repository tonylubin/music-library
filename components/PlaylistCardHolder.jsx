import React from 'react'
import Modal from './Modal';

const PlaylistCardHolder = () => {
  return (
    <article className='flex flex-col items-center justify-center gap-6 rounded-lg bg-cardBG shadow-cardShadow border border-dashed border-white aspect-square h-full'>
      <p className='font-bold text-xl'>Create a playlist</p>
      <Modal />
    </article>
  )
}

export default PlaylistCardHolder;