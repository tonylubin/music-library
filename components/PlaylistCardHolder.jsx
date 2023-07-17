import React from 'react'
import CreateDialog from './CreateDialog';


const PlaylistCardHolder = () => {
  return (
    <article className='flex flex-col items-center justify-center gap-6 rounded-lg  shadow-cardShadow border border-dashed border-indigo-500 aspect-square h-full'>
      <p className='font-bold text-xl'>Create a playlist</p>
      <CreateDialog />
    </article>
  )
}

export default PlaylistCardHolder;