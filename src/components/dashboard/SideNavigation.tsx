
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Send, History, LogOut, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';

interface NavigationItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

const NavigationItem = ({ href, icon, label, active, onClick }: NavigationItemProps) => (
  <Link
    to={href}
    className={cn(
      "flex items-center gap-3 px-4 py-3 rounded-md transition-colors",
      active 
        ? "bg-aidlink-light text-aidlink-primary font-medium" 
        : "text-gray-600 hover:bg-gray-100"
    )}
    onClick={onClick}
  >
    {icon}
    <span>{label}</span>
  </Link>
);

const SideNavigation: React.FC = () => {
  const location = useLocation();
  
  const handleLogout = async () => {
    await supabase.auth.signOut();
    // Navigation is handled by the auth listener in Dashboard.tsx
  };
  
  return (
    <div className="bg-white rounded-lg border border-gray-100 shadow-soft p-3 mb-6">
      <div className="space-y-1">
        <NavigationItem
          href="/dashboard"
          icon={<LayoutDashboard size={20} />}
          label="Dashboard"
          active={location.pathname === '/dashboard'}
        />
        <NavigationItem
          href="#request-help"
          icon={<Send size={20} />}
          label="Request Help"
          active={false}
        />
        <NavigationItem
          href="#history"
          icon={<History size={20} />}
          label="History"
          active={false}
        />
        <NavigationItem
          href="#alerts"
          icon={<AlertCircle size={20} />}
          label="Alerts"
          active={false}
        />
        <NavigationItem
          href="#"
          icon={<LogOut size={20} />}
          label="Logout"
          onClick={handleLogout}
        />
      </div>
    </div>
  );
};

export default SideNavigation;
