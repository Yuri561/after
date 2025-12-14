import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const SyncingAnimation: React.FC = () => {
  return (
    <>
    
    <div className="loading-overlay flex flex-col items-center justify-center text-white">
      <DotLottieReact
   src="https://lottie.host/c0d9ccf9-9236-4d68-8a34-5ee863d0f34d/i2t72vAJDD.lottie"
      loop
      autoplay
      className='w-92 h-92 text-white'
      style={{ color: 'white' }}
      />
      
      <p className='Loading-text text-white text-lg md:text-4xl text-center animate-pulse'>Resyncing...</p>
    </div>
    
    </>
  );
};

export default SyncingAnimation;