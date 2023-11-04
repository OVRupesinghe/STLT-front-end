import React, { useState } from 'react';
import { Menu,Close } from '@mui/icons-material';
import '../fonts/fonts.css';

const Navbar = () => {
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <div className='flex justify-between items-center h-24 px-4 text-white'>
      <h1 className='w-full text-3xl font-bold ' style = {{fontFamily: 'K2DBold'}}>CopSco</h1>
      <ul className='hidden md:flex'>
        <li className='p-4'>Home</li>
        <li className='p-4'>About</li>
        <li className='p-4'>Contact</li>
        <li className='p-4'>Login</li>
      </ul>
      <div onClick={handleNav} className='block md:hidden'>
          {nav ? <Menu size={20}/> : <Close size={20} />}
      </div>
      <ul className={nav ? 'fixed left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500' : 'ease-in-out duration-500 fixed left-[-100%]'}>
        <h1 className='w-full text-3xl font-bold  m-4'>CopSco</h1>
          <li className='p-4 border-b border-gray-600'>Home</li>
          <li className='p-4 border-b border-gray-600'>About</li>
          <li className='p-4'>Contact</li>
          <li className='p-4 text-bold '>Login</li>
      </ul>
    </div>
     
  );
};

export default Navbar;
