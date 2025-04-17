
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Hero: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="bg-gradient-to-b from-white to-aidlink-light py-20 px-4">
      <div className="container mx-auto text-center max-w-4xl animate-fade-in">
        <h1 className="text-4xl md:text-6xl font-bold text-aidlink-dark mb-4">
          Connecting Communities During Crisis
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          AidLink is a decentralized platform connecting disaster survivors with volunteers and relief coordinators in real-time.
        </p>
        <Button 
          className="bg-aidlink-primary hover:bg-aidlink-secondary text-white text-lg py-6 px-8 rounded-xl shadow-soft"
          onClick={() => navigate('/signup')}
        >
          Get Started
        </Button>
      </div>
    </div>
  );
};

export default Hero;
