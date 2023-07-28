import React from 'react';
import { useInfoModal } from '../hooks/useInfoModal';

const Navbar = () => {
  const infoModal = useInfoModal();
  return (
    <div className="h-full  w-full text-lg flex justify-center font-bold font-serif cursor-pointer">
      <span
        onClick={() => infoModal.onOpen()}
        style={{
          cursor: 'pointer',
        }}
      >
        {' '}
        About
      </span>{' '}
      | <a href="https://github.com/Daymo-Web/lingle">Github</a>
    </div>
  );
};

export default Navbar;
