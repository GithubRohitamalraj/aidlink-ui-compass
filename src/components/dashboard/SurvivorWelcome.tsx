
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User } from 'lucide-react';

interface SurvivorWelcomeProps {
  name: string | null;
}

const SurvivorWelcome: React.FC<SurvivorWelcomeProps> = ({ name }) => {
  const displayName = name || 'Survivor';
  const initials = displayName
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between bg-white rounded-lg border border-gray-100 shadow-soft p-6 mb-6">
      <div className="flex items-center gap-4 mb-4 md:mb-0">
        <Avatar className="h-16 w-16 border-2 border-aidlink-light">
          <AvatarFallback className="bg-aidlink-primary text-white text-xl">
            {initials}
          </AvatarFallback>
          <AvatarImage src="" />
        </Avatar>
        <div>
          <h1 className="text-2xl font-bold text-aidlink-dark">Welcome, {displayName}</h1>
          <p className="text-gray-600">Need help? Raise a request in seconds.</p>
        </div>
      </div>
      <div className="flex items-center gap-2 text-sm text-aidlink-secondary">
        <User size={16} />
        <span>Survivor Account</span>
      </div>
    </div>
  );
};

export default SurvivorWelcome;
