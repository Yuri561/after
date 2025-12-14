import React from 'react';
import MainGrid from '../GridSection/MainGrid';


const Dashboard: React.FC = () => {
  return (
    
    <main className="bg-[linear-gradient(135deg,#050505,#0b0c10,#050505)] bg-[length:200%_200%] animate-[bgshift_30s_linear_infinite]">
      <MainGrid  loading={false}/>
    </main>

  );
};

export default Dashboard;