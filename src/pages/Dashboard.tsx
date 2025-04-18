
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/navigation/Navbar';
import SurvivorDashboard from '../components/dashboard/SurvivorDashboard';
import VolunteerDashboard from '../components/dashboard/VolunteerDashboard';
import AdminDashboard from '../components/dashboard/AdminDashboard';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

type UserRole = 'survivor' | 'volunteer' | 'admin';

interface UserProfile {
  id: string;
  role: UserRole;
  full_name: string | null;
}

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate('/login');
        return;
      }

      try {
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();

        if (error) throw error;
        
        setProfile(profile);
      } catch (error) {
        toast({
          title: "Error loading profile",
          description: "Please try logging in again",
          variant: "destructive"
        });
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!session) {
        navigate('/login');
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, toast]);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  const renderDashboard = () => {
    if (!profile) return null;

    switch (profile.role) {
      case 'survivor':
        return <SurvivorDashboard profile={profile} />;
      case 'volunteer':
        return <VolunteerDashboard />;
      case 'admin':
        return <AdminDashboard />;
      default:
        return <SurvivorDashboard profile={profile} />;
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar isLoggedIn={true} userName={profile?.full_name || 'User'} />
      
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
