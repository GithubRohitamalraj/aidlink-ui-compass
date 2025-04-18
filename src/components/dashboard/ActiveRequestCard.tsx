
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, MapPin, MessageSquare, User, AlertTriangle } from 'lucide-react';
import { RequestStatus } from './HelpRequestCard';

interface ActiveRequestCardProps {
  id: string;
  status: RequestStatus;
  message: string;
  location: string;
  timestamp: string;
  volunteer?: string | null;
  onCancel?: (id: string) => void;
  onResolve?: (id: string) => void;
}

const ActiveRequestCard: React.FC<ActiveRequestCardProps> = ({
  id,
  status,
  message,
  location,
  timestamp,
  volunteer,
  onCancel,
  onResolve
}) => {
  const getStatusDetails = () => {
    switch (status) {
      case 'pending':
        return { 
          label: 'Pending',
          color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
          icon: <Clock className="h-4 w-4" />,
          description: 'Waiting for volunteer response'
        };
      case 'accepted':
        return { 
          label: 'Accepted',
          color: 'bg-blue-100 text-blue-800 border-blue-200',
          icon: <User className="h-4 w-4" />,
          description: volunteer ? `Assigned to ${volunteer}` : 'A volunteer has accepted your request'
        };
      case 'resolved':
        return { 
          label: 'Resolved',
          color: 'bg-green-100 text-green-800 border-green-200',
          icon: <Clock className="h-4 w-4" />,
          description: 'This request has been resolved'
        };
      default:
        return { 
          label: 'Unknown',
          color: 'bg-gray-100 text-gray-800 border-gray-200',
          icon: <AlertTriangle className="h-4 w-4" />,
          description: 'Status unknown'
        };
    }
  };

  const { label, color, icon, description } = getStatusDetails();
  
  return (
    <Card className="border-l-4 border-l-aidlink-primary shadow-soft overflow-hidden mb-6">
      <div className="p-6 pb-2">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-medium text-aidlink-dark">
              Active Help Request
            </h2>
            <span className="text-sm text-gray-500">#{id.slice(-4)}</span>
          </div>
          <Badge className={`${color} font-normal flex items-center gap-1`}>
            {icon}
            {label}
          </Badge>
        </div>
        
        <div className="text-sm text-gray-500 mb-1">{description}</div>
      </div>
      
      <CardContent className="pt-2 pb-4">
        <div className="space-y-4">
          <div className="flex items-start gap-2">
            <MessageSquare size={18} className="text-aidlink-secondary mt-0.5 flex-shrink-0" />
            <p className="text-gray-700">{message}</p>
          </div>
          
          <div className="flex items-center gap-2">
            <MapPin size={18} className="text-aidlink-secondary flex-shrink-0" />
            <p className="text-gray-600">{location}</p>
          </div>
          
          <div className="flex items-center gap-2">
            <Clock size={18} className="text-aidlink-secondary flex-shrink-0" />
            <p className="text-sm text-gray-500">{timestamp}</p>
          </div>
        </div>
      </CardContent>
      
      {status === 'pending' && (
        <CardFooter className="pt-0">
          <Button 
            variant="outline" 
            className="border-red-500 text-red-600 hover:bg-red-50 w-full"
            onClick={() => onCancel && onCancel(id)}
          >
            Cancel Request
          </Button>
        </CardFooter>
      )}
      
      {status === 'accepted' && (
        <CardFooter className="pt-0">
          <Button 
            variant="outline" 
            className="border-green-500 text-green-600 hover:bg-green-50 w-full"
            onClick={() => onResolve && onResolve(id)}
          >
            Mark as Resolved
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default ActiveRequestCard;
