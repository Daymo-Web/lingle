import React from 'react';

const Keyboard = ({ keys }) => {
  let row1 = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'];
  let len1 = row1.length;
  let row2 = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'];
  let len2 = row2.length;
  let row3 = ['z', 'x', 'c', 'v', 'b', 'n', 'm'];
  let len3 = row3.length;
  return (
    <div className="keys">
      <div className="parent">
        {Array.from({ length: len1 }, (_, k) => (
          <div
            key={k}
            style={{ backgroundColor: keys[row1[k]] }}
            className="keyboard"
          >
            {row1[k].toUpperCase()}
          </div>
        ))}
      </div>
      <div className="parent">
        {Array.from({ length: len2 }, (_, k) => (
          <div
            key={k}
            style={{ backgroundColor: keys[row2[k]] }}
            className="keyboard"
          >
            {row2[k].toUpperCase()}
          </div>
        ))}
      </div>
      <div className="parent">
        {Array.from({ length: len3 }, (_, k) => (
          <div
            key={k}
            style={{ backgroundColor: keys[row3[k]] }}
            className="keyboard"
          >
            {row3[k].toUpperCase()}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Keyboard;
