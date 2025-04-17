
import React, { useState } from 'react';
import Navbar from '../components/navigation/Navbar';
import SurvivorDashboard from '../components/dashboard/SurvivorDashboard';
import VolunteerDashboard from '../components/dashboard/VolunteerDashboard';
import AdminDashboard from '../components/dashboard/AdminDashboard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// In a real app, this would come from authentication
type UserRole = 'survivor' | 'volunteer' | 'admin';

const Dashboard: React.FC = () => {
  // For demo purposes, we're allowing role switching
  const [userRole, setUserRole] = useState<UserRole>('survivor');
  
  // In a real app, this would be the actual user's name
  const userName = "Jane Doe";
  
  const renderDashboard = () => {
    switch (userRole) {
      case 'survivor':
        return <SurvivorDashboard />;
      case 'volunteer':
        return <VolunteerDashboard />;
      case 'admin':
        return <AdminDashboard />;
      default:
        return <SurvivorDashboard />;
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar isLoggedIn={true} userName={userName} />
      
      <div className="bg-white py-4 px-4 border-b">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-aidlink-dark">AidLink</h1>
            
            {/* Demo role switcher - In a real app, this would not be here */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Demo:</span>
              <Tabs defaultValue={userRole} onValueChange={(val) => setUserRole(val as UserRole)}>
                <TabsList>
                  <TabsTrigger value="survivor">Survivor</TabsTrigger>
                  <TabsTrigger value="volunteer">Volunteer</TabsTrigger>
                  <TabsTrigger value="admin">Admin</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
      
      <main className="flex-1 container mx-auto py-6 px-4">
        {renderDashboard()}
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

export default Dashboard;
