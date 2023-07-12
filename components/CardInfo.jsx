import React from 'react';

const CardInfo = ({ heading, name }) => {
  return (
    <>
      <div className=" border-b border-stone-400">
        <h3 className="tracking-wider font-extralight text-stone-400">
          {heading}
        </h3>
      </div>
      <div>
        <p className="tracking-wider font-bold text-lg text-primary-heading">
          {name}
        </p>
      </div>
    </>
  );
};

export default CardInfo;