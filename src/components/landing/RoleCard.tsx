
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface RoleCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  buttonText: string;
  role: 'survivor' | 'volunteer' | 'admin';
}

const RoleCard: React.FC<RoleCardProps> = ({ 
  title, 
  description, 
  icon, 
  buttonText,
  role
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/signup', { state: { role } });
  };

  return (
    <Card className="border border-gray-100 shadow-soft hover:shadow-md transition-shadow duration-300">
      <CardHeader>
        <div className="w-16 h-16 bg-aidlink-light rounded-full flex items-center justify-center mx-auto mb-4">
          {icon}
        </div>
        <CardTitle className="text-center text-xl text-aidlink-dark">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-center mb-6 min-h-[80px]">
          {description}
        </CardDescription>
        <Button 
          className="w-full bg-aidlink-primary hover:bg-aidlink-secondary text-white"
          onClick={handleClick}
        >
          {buttonText}
        </Button>
      </CardContent>
    </Card>
  );
};

export default RoleCard;
