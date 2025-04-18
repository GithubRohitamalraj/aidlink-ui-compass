
import React, { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import RequestHelpModal from '../modal/RequestHelpModal';
import SurvivorWelcome from './SurvivorWelcome';
import ActiveRequestCard from './ActiveRequestCard';
import RequestHistory from './RequestHistory';
import EmergencyAnnouncements from './EmergencyAnnouncements';
import SideNavigation from './SideNavigation';
import { RequestStatus } from './HelpRequestCard';

interface HelpRequest {
  id: string;
  message: string;
  location: string;
  timestamp: string;
  status: RequestStatus;
  volunteer?: string | null;
}

interface UserProfile {
  id: string;
  role: string;
  full_name: string | null;
}

interface SurvivorDashboardProps {
  profile?: UserProfile | null;
}

const SurvivorDashboard: React.FC<SurvivorDashboardProps> = ({ profile }) => {
  const { toast } = useToast();
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
      status: 'accepted',
      volunteer: 'Dr. Sarah Johnson'
    },
    {
      id: '3',
      message: 'Require transportation to evacuation center',
      location: 'West District, Street 45',
      timestamp: '1 day ago',
      status: 'resolved',
      volunteer: 'Transport Team #3'
    }
  ]);

  // Demo announcements
  const announcements = [
    {
      id: '1',
      message: 'Storm expected in Chennai at 8PM. Seek shelter.',
      severity: 'critical' as const,
      timestamp: '30 minutes ago'
    },
    {
      id: '2',
      message: 'Use safe drinking water only. Boil before consumption.',
      severity: 'warning' as const,
      timestamp: '2 hours ago'
    }
  ];

  // Find active request (pending or accepted)
  const activeRequest = requests.find(req => req.status === 'pending' || req.status === 'accepted');
  const historyRequests = requests.filter(req => req.status === 'resolved' || (!activeRequest || req.id !== activeRequest.id));

  const handleRequestSubmit = (data: { message: string; location: string }) => {
    if (activeRequest) {
      toast({
        title: "You already have an active request",
        description: "Please wait for your current request to be resolved",
        variant: "destructive",
      });
      return;
    }

    const newRequest: HelpRequest = {
      id: Date.now().toString(),
      message: data.message,
      location: data.location,
      timestamp: 'Just now',
      status: 'pending'
    };
    
    setRequests([newRequest, ...requests]);
    
    toast({
      title: "Help request submitted",
      description: "Your request has been received. Help is on the way.",
    });
  };

  const handleCancelRequest = (id: string) => {
    // In a real app, you'd call an API to cancel the request
    setRequests(requests.map(req => 
      req.id === id ? { ...req, status: 'resolved' } : req
    ));
    
    toast({
      title: "Request cancelled",
      description: "Your help request has been cancelled",
    });
  };

  const handleResolveRequest = (id: string) => {
    // In a real app, you'd call an API to resolve the request
    setRequests(requests.map(req => 
      req.id === id ? { ...req, status: 'resolved' } : req
    ));
    
    toast({
      title: "Request resolved",
      description: "Thank you for marking this request as resolved",
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
      {/* Left sidebar - only visible on medium screens and up */}
      <div className="hidden md:block md:col-span-3">
        <SideNavigation />
      </div>
      
      {/* Main content */}
      <div className="col-span-1 md:col-span-9 space-y-6">
        {/* Welcome section */}
        <SurvivorWelcome name={profile?.full_name} />
        
        {/* Emergency Announcements */}
        <EmergencyAnnouncements announcements={announcements} />
        
        {/* Active Request Card (if exists) */}
        {activeRequest && (
          <ActiveRequestCard 
            id={activeRequest.id}
            status={activeRequest.status}
            message={activeRequest.message}
            location={activeRequest.location}
            timestamp={activeRequest.timestamp}
            volunteer={activeRequest.volunteer}
            onCancel={handleCancelRequest}
            onResolve={handleResolveRequest}
          />
        )}
        
        {/* Create Help Request (only if no active request) */}
        {!activeRequest && (
          <Card className="border-dashed border-2 border-gray-200 bg-white shadow-soft mb-6">
            <CardContent className="flex flex-col items-center justify-center py-10">
              <h3 className="text-lg font-medium text-aidlink-dark mb-2">Need urgent assistance?</h3>
              <p className="text-gray-600 text-center mb-6">
                Submit a request and get connected with nearby volunteers.
              </p>
              <Button 
                className="bg-aidlink-primary hover:bg-aidlink-secondary text-white"
                onClick={() => setIsModalOpen(true)}
              >
                Request Help
              </Button>
            </CardContent>
          </Card>
        )}
        
        {/* Request History */}
        <RequestHistory requests={historyRequests} />
      </div>
      
      {/* Request Help Modal */}
      <RequestHelpModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleRequestSubmit}
      />
    </div>
  );
};

export default SurvivorDashboard;
