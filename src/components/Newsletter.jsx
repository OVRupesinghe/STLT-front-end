import React from 'react';
import EcoSystem from '../assets/ecosystem.png';
import '../fonts/fonts.css';

const Newsletter = () => {
  return (
    <div className='w-full py-20 text-white px-4'>
      <div className='flex flex-row w-full justify-evenly'>
        <div className='flex flex-col my-4 justify-center items-center'>
          <div style = {{fontFamily: 'K2DBold'}} className = 'text-sm'>
          •  PEOPLE   •  DEVICES   •  APPS
          </div>
          <div style = {{fontFamily: 'K2DBold'}} className = 'text-4xl'>
            COPSCO ECOSYSTEM
          </div>
          <div>
            <p className = 'w-64 text-center text-md mt-10'>
            Everyone works together as a single network. Seamlessly connected and designed to give police forces the tools they need to focus on what matters, Get to the truth faster and make the world a safer place.
            </p>
          </div>
        </div>
        <div className='my-4'>
          <img src={EcoSystem} className = 'h-80 w-auto'/>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
