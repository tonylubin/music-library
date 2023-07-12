import Image from 'next/image';
import React from 'react';

function Logo() {
  return (
    <div className='w-14 h-14 relative'>
        <Image
            alt='site icon sound mixer'
            fill
            src={"/images/sound-mixer.png"}
            className='aspect-square'
        />
    </div>
  )
}

export default Logo;