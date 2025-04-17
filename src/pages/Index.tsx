
import React from 'react';
import Navbar from '../components/navigation/Navbar';
import Hero from '../components/landing/Hero';
import RoleCard from '../components/landing/RoleCard';
import { Users, HandHeart, ShieldCheck } from 'lucide-react';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <Hero />
        
        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-center text-aidlink-dark mb-8">
              How AidLink Works
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <RoleCard
                title="Survivor"
                description="Request urgent help and get connected with verified volunteers in your area."
                icon={<Users className="w-8 h-8 text-aidlink-primary" />}
                buttonText="I Need Help"
                role="survivor"
              />
              
              <RoleCard
                title="Volunteer"
                description="Offer your skills and time to help those affected by disasters in your community."
                icon={<HandHeart className="w-8 h-8 text-aidlink-primary" />}
                buttonText="I Can Help"
                role="volunteer"
              />
              
              <RoleCard
                title="Admin"
                description="Coordinate relief efforts, verify volunteers, and monitor help requests."
                icon={<ShieldCheck className="w-8 h-8 text-aidlink-primary" />}
                buttonText="Manage Relief"
                role="admin"
              />
            </div>
          </div>
        </section>
        
        <section className="py-16 px-4 bg-aidlink-light/30">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold text-aidlink-dark mb-4">
              Be Prepared Before Disaster Strikes
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Sign up now so you're ready to connect when help is needed most.
            </p>
            <div className="flex justify-center">
              <a href="/signup" className="bg-aidlink-primary hover:bg-aidlink-secondary text-white px-8 py-3 rounded-lg font-medium text-lg shadow-soft transition-colors">
                Join AidLink Today
              </a>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="bg-gray-50 py-8 px-4">
        <div className="container mx-auto text-center">
          <p className="text-gray-500 text-sm">
            © 2025 AidLink. A decentralized disaster response platform.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
