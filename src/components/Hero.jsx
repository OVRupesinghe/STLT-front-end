import React from 'react';
import Typed from 'react-typed';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate('/login');
  };
  return (
    <div className='text-white'>
      <div className='max-w-[800px] mt-[170px] mb-[80px] w-full mx-20 text-left flex-col'>
        <h1 className='md:text-7xl sm:text-6xl text-4xl font-bold md:py-6'>
          EMPOWERING THE PUBLIC SAFETY
        </h1>
        <div className='flex justify-start items-center'>
          <p className='md:text-5xl sm:text-4xl text-xl font-bold py-4'>
            All in one platform to
          </p>
          <Typed
            className='md:text-5xl sm:text-4xl text-xl font-bold md:pl-4 pl-2'
            strings={['report', 'pay', 'track']}
            typeSpeed={120}
            backSpeed={140}
            loop
          />
          <p className='md:text-5xl sm:text-4xl text-xl font-bold py-4'>
            fines
          </p>
        </div>
        <p className='md:text-2xl text-xl font-bold text-gray-500'>FOR A BETTER COUNTRY, A BETTER COMMUNITY</p>
        <button onClick={handleButtonClick} className='border-2 bg-transparent w-[200px] rounded-md font-medium my-6 mx-auto py-3 text-white'>Get Started</button>
      </div>
    </div>
  );
};

export default Hero;
