
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LogOut, User } from 'lucide-react';

interface NavbarProps {
  isLoggedIn?: boolean;
  userName?: string;
}

const Navbar: React.FC<NavbarProps> = ({ isLoggedIn = false, userName }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // In a real app, you'd have logout logic here
    navigate('/');
  };

  return (
    <header className="bg-white shadow-soft py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-aidlink-primary text-2xl font-bold">AidLink</span>
        </Link>
        
        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <>
              <div className="flex items-center gap-2">
                <User size={18} className="text-aidlink-dark" />
                <span className="text-aidlink-dark hidden sm:inline">{userName || 'User'}</span>
              </div>
              <Button 
                variant="outline" 
                className="flex items-center gap-2 border-aidlink-primary text-aidlink-primary hover:bg-aidlink-light"
                onClick={handleLogout}
              >
                <LogOut size={16} />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </>
          ) : (
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                className="border-aidlink-primary text-aidlink-primary hover:bg-aidlink-light"
                onClick={() => navigate('/login')}
              >
                Login
              </Button>
              <Button 
                className="bg-aidlink-primary hover:bg-aidlink-secondary text-white"
                onClick={() => navigate('/signup')}
              >
                Sign Up
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
