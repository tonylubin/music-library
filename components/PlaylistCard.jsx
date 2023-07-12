import Link from 'next/link';
import React from 'react';

const PlaylistCard = ({ playlistName }) => {
  return (
    <Link href={`/playlists/${playlistName}`}>
      <article className='flex flex-col items-center justify-center gap-6 rounded-lg bg-violet-500 shadow-cardShadow aspect-square h-full'>
        <p className='text-lg font-bold capitalize'>{playlistName}</p>
      </article>
    </Link>
  )
}

export default PlaylistCard;