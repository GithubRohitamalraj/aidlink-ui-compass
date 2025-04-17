
import React, { useState } from 'react';
import HelpRequestCard, { RequestStatus } from './HelpRequestCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { MapPin, Users, Bell } from 'lucide-react';

interface HelpRequest {
  id: string;
  message: string;
  location: string;
  timestamp: string;
  status: RequestStatus;
}

const VolunteerDashboard: React.FC = () => {
  const { toast } = useToast();
  const [activeRequests, setActiveRequests] = useState<HelpRequest[]>([
    {
      id: '1',
      message: 'Need food and water supplies for family of 4',
      location: 'North District, Building 7',
      timestamp: '10 minutes ago',
      status: 'pending'
    },
    {
      id: '2',
      message: 'Help needed to clear debris from entrance',
      location: 'South District, House 23',
      timestamp: '30 minutes ago',
      status: 'pending'
    },
    {
      id: '3',
      message: 'Transport needed to evacuation center',
      location: 'East District, Apartment 45',
      timestamp: '1 hour ago',
      status: 'pending'
    },
  ]);

  const [myRequests, setMyRequests] = useState<HelpRequest[]>([
    {
      id: '4',
      message: 'Medical assistance needed for elderly person',
      location: 'East District, Apartment 12B',
      timestamp: '2 hours ago',
      status: 'accepted'
    },
    {
      id: '5',
      message: 'Rescue pet trapped in building',
      location: 'West District, Building 3',
      timestamp: '3 hours ago',
      status: 'resolved'
    }
  ]);

  const handleAcceptRequest = (id: string) => {
    // Find the request to accept
    const requestToAccept = activeRequests.find(req => req.id === id);
    
    if (requestToAccept) {
      // Remove from active requests
      setActiveRequests(activeRequests.filter(req => req.id !== id));
      
      // Add to my requests with 'accepted' status
      const acceptedRequest = { ...requestToAccept, status: 'accepted' as RequestStatus };
      setMyRequests([acceptedRequest, ...myRequests]);
      
      toast({
        title: "Request Accepted",
        description: "You've accepted a help request. Thank you for your support!",
      });
    }
  };

  const handleResolveRequest = (id: string) => {
    setMyRequests(myRequests.map(req => 
      req.id === id ? { ...req, status: 'resolved' as RequestStatus } : req
    ));
    
    toast({
      title: "Request Resolved",
      description: "Thank you for helping someone in need!",
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-aidlink-dark">Volunteer Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <MapPin className="text-aidlink-primary" size={18} />
              Your Area
            </CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-gray-700">Downtown District</span>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <Bell className="text-aidlink-primary" size={18} />
              Active Requests
            </CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-2xl font-bold text-aidlink-primary">{activeRequests.length}</span>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <Users className="text-aidlink-primary" size={18} />
              People Helped
            </CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-2xl font-bold text-aidlink-primary">
              {myRequests.filter(req => req.status === 'resolved').length}
            </span>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="active" className="w-full">
        <TabsList className="grid grid-cols-2 w-full max-w-md">
          <TabsTrigger 
            value="active" 
            className="data-[state=active]:bg-aidlink-primary data-[state=active]:text-white"
          >
            Active Requests
          </TabsTrigger>
          <TabsTrigger 
            value="my-requests"
            className="data-[state=active]:bg-aidlink-primary data-[state=active]:text-white"
          >
            My Assignments
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="active" className="mt-4">
          {activeRequests.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {activeRequests.map((request) => (
                <HelpRequestCard
                  key={request.id}
                  id={request.id}
                  message={request.message}
                  location={request.location}
                  timestamp={request.timestamp}
                  status={request.status}
                  onAccept={handleAcceptRequest}
                  isVolunteer={true}
                />
              ))}
            </div>
          ) : (
            <Card className="bg-gray-50 border-dashed border-2 border-gray-200">
              <CardContent className="py-8">
                <p className="text-center text-gray-500">
                  There are no active help requests in your area at the moment.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="my-requests" className="mt-4">
          {myRequests.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {myRequests.map((request) => (
                <HelpRequestCard
                  key={request.id}
                  id={request.id}
                  message={request.message}
                  location={request.location}
                  timestamp={request.timestamp}
                  status={request.status}
                  onResolve={handleResolveRequest}
                  isVolunteer={true}
                />
              ))}
            </div>
          ) : (
            <Card className="bg-gray-50 border-dashed border-2 border-gray-200">
              <CardContent className="py-8">
                <p className="text-center text-gray-500">
                  You haven't accepted any help requests yet.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default VolunteerDashboard;
