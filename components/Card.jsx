import { CldImage } from 'next-cloudinary';
import React from 'react';

const Card = ({ imageUrl }) => {

  return (
    <div className='aspect-square rounded-xl'>
      <CldImage
        alt='vinyl record cover'
        src={imageUrl}
        width={600}
        height={600}
        sizes='100vw'  
      />
    </div>
  )

};

export default Card;