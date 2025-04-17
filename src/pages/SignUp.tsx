
import React from 'react';
import Navbar from '../components/navigation/Navbar';
import SignupForm from '../components/auth/SignupForm';

const SignUp: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <main className="flex-1 flex items-center justify-center p-4">
        <SignupForm />
      </main>
      
      <footer className="bg-white py-4 px-4 border-t">
        <div className="container mx-auto text-center">
          <p className="text-gray-500 text-sm">
            © 2025 AidLink. A decentralized disaster response platform.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default SignUp;
