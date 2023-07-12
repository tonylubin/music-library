import React from 'react';
import Logo from './Logo';

function Header() {
  return (
    <header className='flex justify-between col-start-1 col-end-3 row-start-1 row-end-2 bg-black'>
      <div className='flex items-center gap-4 px-4'>
        <Logo />
        <h1 className='text-2xl font-extrabold font-bioRhyme text-primaryTextColor'>My Vinyl Library</h1>
      </div>
    </header>
  )
}

export default Header;