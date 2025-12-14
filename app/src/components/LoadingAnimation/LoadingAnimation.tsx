import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const LoadingAnimation: React.FC = () => {
  return (
    <>
    
    <div className="loading-overlay flex flex-col items-center justify-center text-white">
      <DotLottieReact
     src="https://lottie.host/a57318d4-b222-479c-93b9-50f3d54229d9/M5WbZIK6hQ.lottie"
      loop
      autoplay
      className='w-92 h-92 text-slate-300'
      />
      
      <p className='Loading-text text-white text-lg text-center md:text-4xl mx-auto'></p>
    </div>
    
    </>
  );
};

export default LoadingAnimation;