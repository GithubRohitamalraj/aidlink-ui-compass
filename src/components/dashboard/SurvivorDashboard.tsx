
import React, { useState } from 'react';
import HelpRequestCard, { RequestStatus } from './HelpRequestCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import RequestHelpModal from '../modal/RequestHelpModal';
import { AlertTriangle } from 'lucide-react';

interface HelpRequest {
  id: string;
  message: string;
  location: string;
  timestamp: string;
  status: RequestStatus;
}

const SurvivorDashboard: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [requests, setRequests] = useState<HelpRequest[]>([
    {
      id: '1',
      message: 'Need food and water supplies for family of 4',
      location: 'North District, Building 7',
      timestamp: '10 minutes ago',
      status: 'pending'
    },
    {
      id: '2',
      message: 'Medical assistance needed for elderly person',
      location: 'East District, Apartment 12B',
      timestamp: '2 hours ago',
      status: 'accepted'
    },
    {
      id: '3',
      message: 'Require transportation to evacuation center',
      location: 'West District, Street 45',
      timestamp: '1 day ago',
      status: 'resolved'
    }
  ]);

  const handleRequestSubmit = (data: { message: string; location: string }) => {
    const newRequest: HelpRequest = {
      id: Date.now().toString(),
      message: data.message,
      location: data.location,
      timestamp: 'Just now',
      status: 'pending'
    };
    
    setRequests([newRequest, ...requests]);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-aidlink-dark">Survivor Dashboard</h2>
        <Button 
          className="bg-aidlink-primary hover:bg-aidlink-secondary text-white"
          onClick={() => setIsModalOpen(true)}
        >
          Request Help
        </Button>
      </div>

      <Card className="bg-aidlink-light/30 border border-aidlink-light">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="text-aidlink-secondary mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-medium text-aidlink-dark mb-1">Emergency Tips</h3>
              <p className="text-sm text-gray-600">
                Stay in a safe location, conserve phone battery, and keep your requests clear and specific for faster assistance.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-aidlink-dark">Your Help Requests</h3>
        
        {requests.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {requests.map((request) => (
              <HelpRequestCard
                key={request.id}
                id={request.id}
                message={request.message}
                location={request.location}
                timestamp={request.timestamp}
                status={request.status}
              />
            ))}
          </div>
        ) : (
          <Card className="bg-gray-50 border-dashed border-2 border-gray-200">
            <CardContent className="py-8">
              <p className="text-center text-gray-500">
                You haven't made any help requests yet.
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      <RequestHelpModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleRequestSubmit}
      />
    </div>
  );
};

export default SurvivorDashboard;
