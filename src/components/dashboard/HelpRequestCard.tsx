
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, MessageSquare } from 'lucide-react';

export type RequestStatus = 'pending' | 'accepted' | 'resolved';

interface HelpRequestCardProps {
  id: string;
  message: string;
  location: string;
  timestamp: string;
  status: RequestStatus;
  onAccept?: (id: string) => void;
  onResolve?: (id: string) => void;
  isVolunteer?: boolean;
}

const HelpRequestCard: React.FC<HelpRequestCardProps> = ({
  id,
  message,
  location,
  timestamp,
  status,
  onAccept,
  onResolve,
  isVolunteer = false
}) => {
  const getStatusColor = (): string => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'accepted': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'resolved': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusText = (): string => {
    switch (status) {
      case 'pending': return 'Pending';
      case 'accepted': return 'Accepted';
      case 'resolved': return 'Resolved';
      default: return 'Unknown';
    }
  };

  return (
    <Card className="overflow-hidden border border-gray-100 shadow-soft hover:shadow-md transition-shadow duration-300">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-medium text-aidlink-dark">
            Help Request
          </CardTitle>
          <Badge className={`${getStatusColor()} font-normal`}>
            {getStatusText()}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-3">
        <div className="space-y-3">
          <div className="flex items-start gap-2">
            <MessageSquare size={16} className="text-gray-400 mt-0.5 flex-shrink-0" />
            <p className="text-gray-700">{message}</p>
          </div>
          
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-gray-400" />
            <p className="text-sm text-gray-600">{location}</p>
          </div>
          
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-gray-400" />
            <p className="text-sm text-gray-500">{timestamp}</p>
          </div>
        </div>
      </CardContent>
      
      {isVolunteer && status === 'pending' && (
        <CardFooter className="pt-0">
          <Button 
            className="w-full bg-aidlink-primary hover:bg-aidlink-secondary text-white"
            onClick={() => onAccept && onAccept(id)}
          >
            Accept Request
          </Button>
        </CardFooter>
      )}
      
      {isVolunteer && status === 'accepted' && (
        <CardFooter className="pt-0">
          <Button 
            variant="outline" 
            className="w-full border-green-500 text-green-600 hover:bg-green-50"
            onClick={() => onResolve && onResolve(id)}
          >
            Mark as Resolved
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default HelpRequestCard;
