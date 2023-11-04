import React from 'react';
import Single from '../assets/traffic-light.png'
import Double from '../assets/inventory.png'
import Triple from '../assets/credit-card.png'

const Cards = () => {
  return (
    <div className='w-full py-[10rem] px-4 bg-white'>
      <div className='max-w-[1240px] mx-auto grid md:grid-cols-3 gap-8'>
          <div className='w-full shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300'>
              <img className='w-20 mx-auto mt-[-3rem] bg-white' src={Single} alt="/" />
              <h2 className='text-2xl font-bold text-center py-8'>Report Violations</h2>
   
              <div className='text-center font-medium'>
                  <p className='py-2 border-b mx-8 mt-8'>Low data cost</p>
                  <p className='py-2 border-b mx-8'>User freindly UI</p>
                  <p className='py-2 border-b mx-8'>Track progress</p>
              </div>
          </div>
          <div className='w-full shadow-xl bg-gray-100 flex flex-col p-4 md:my-0 my-8 rounded-lg hover:scale-105 duration-300'>
              <img className='w-20 mx-auto mt-[-3rem] bg-transparent' src={Double} alt="/" />
              <h2 className='text-2xl font-bold text-center py-8'>Manage Fines</h2>
              <div className='text-center font-medium'>
                  <p className='py-2 border-b mx-8 mt-8'>View fines</p>
                  <p className='py-2 border-b mx-8'>Accept or Appeal</p>
                  <p className='py-2 border-b mx-8'>View Legal Status</p>
              </div>
          </div>
          <div className='w-full shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300'>
              <img className='w-20 mx-auto mt-[-3rem] bg-white' src={Triple} alt="/" />
              <h2 className='text-2xl font-bold text-center py-8'>Pay Fines</h2>
              <div className='text-center font-medium'>
                  <p className='py-2 border-b mx-8 mt-8'>Online payments</p>
                  <p className='py-2 border-b mx-8'>Secure platform</p>
                  <p className='py-2 border-b mx-8'>View status</p>
              </div>
          </div>
      </div>
    </div>
  );
};

export default Cards;
