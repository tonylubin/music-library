import Image from 'next/image';
import React from 'react';

const Logo = () => {
  return (
    <div className='w-14 h-14 relative'>
        <Image
            alt='site icon sound mixer'
            fill={true}
            src={"/images/sound-mixer.png"}
            className='aspect-square'
        />
    </div>
  )
}

export default Logo;