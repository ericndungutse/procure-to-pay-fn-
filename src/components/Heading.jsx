import React from 'react';

function Heading({ text, variation = 'h1' }) {
  const variations = {
    h1: 'text-3xl font-semibold',
    h2: 'text-2xl font-semibold',
    h3: 'text-xl font-semibold',
    h4: 'text-lg font-semibold',
    h5: 'text-base font-semibold',
    h6: 'text-sm font-semibold',
  };
  return <h1 className={variations[variation]}>{text}</h1>;
}

export default Heading;
