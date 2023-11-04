import React from 'react';
import Camera from '../assets/camera.png';
import Verify from '../assets/verify.png';
import Reward from '../assets/reward.png';
import '../fonts/fonts.css';

const Analytics = () => {
  return (
    <div className='w-full bg-white py-16 px-4'>
      <h1 className='md:text-4xl sm:text-3xl text-2xl font-bold py-2 text-center'>HOW IT WORKS</h1>
      <div className='flex flex-wrap justify-evenly items-center mt-20'>
        <div className='flex flex-col items-center gap-8'>
          <img src={Camera} alt="" className='h-28 w-auto' />
          <p className='text-2xl font-extralight'>SUBMIT YOUR EVIDENCE</p>
        </div>
        <div className='flex flex-col items-center gap-8'>
          <img src={Verify} alt="" className='h-28 w-auto' />
          <p className='text-2xl font-extralight'>LET OFFICERS VERIFY THEM</p>
        </div>
        <div className='flex flex-col items-center gap-8'>
          <img src={Reward} alt="" className='h-28 w-auto' />
          <p className='text-2xl font-extralight'>COLLECT YOUR REWARD</p>
        </div>
      </div>
      <div className='flex flex-col justify-center items-center gap-8'>
        <div>
          <h1 className='mt-28 md:text-sm sm:text-sm text-sm font-extralight py-2 text-center'>NOT CLEAR YET ?</h1>
        </div>
        <div>
          <button className='border-2 bg-black w-[200px] rounded-md text-lg py-2 text-white'>Learn More</button>
        </div>
        <div>
          <h2 className='text-3xl font-bold text-center' style = {{fontFamily: 'K2DBold'}}>Join public safety's most trusted network</h2>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
