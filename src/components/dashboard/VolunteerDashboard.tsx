import React, { useState, useEffect } from 'react';
import HelpRequestCard, { RequestStatus } from './HelpRequestCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { MapPin, Users, Bell, Map as MapIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Import React Leaflet components
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons in React Leaflet
// In a real implementation, you would store these images in your public folder
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom marker icon for urgent requests
const urgentIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  shadowSize: [41, 41],
  className: 'urgent-marker', // You can style this with CSS to make it red
});

interface HelpRequest {
  id: string;
  message: string;
  location: string;
  timestamp: string;
  status: RequestStatus;
  // Adding coordinates for map markers
  coordinates?: [number, number];
  urgency?: 'urgent' | 'moderate' | 'low';
}

// Component to recenter map when active requests change
function RecenterAutomatically({ coordinates }: { coordinates: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(coordinates, map.getZoom());
  }, [coordinates, map]);
  return null;
}

const VolunteerDashboard: React.FC = () => {
  const { toast } = useToast();
  const [activeRequests, setActiveRequests] = useState<HelpRequest[]>([
    {
      id: '1',
      message: 'Need food and water supplies for family of 4',
      location: 'North District, Building 7',
      timestamp: '10 minutes ago',
      status: 'pending',
      coordinates: [13.0827, 80.2707], // Chennai coordinates
      urgency: 'urgent'
    },
    {
      id: '2',
      message: 'Help needed to clear debris from entrance',
      location: 'South District, House 23',
      timestamp: '30 minutes ago',
      status: 'pending',
      coordinates: [13.0569, 80.2425], // Slightly different location
      urgency: 'moderate'
    },
    {
      id: '3',
      message: 'Transport needed to evacuation center',
      location: 'East District, Apartment 45',
      timestamp: '1 hour ago',
      status: 'pending',
      coordinates: [13.1067, 80.2847], // Another nearby location
      urgency: 'urgent'
    },
  ]);

  const [myRequests, setMyRequests] = useState<HelpRequest[]>([
    {
      id: '4',
      message: 'Medical assistance needed for elderly person',
      location: 'East District, Apartment 12B',
      timestamp: '2 hours ago',
      status: 'accepted',
      coordinates: [13.0927, 80.2707]
    },
    {
      id: '5',
      message: 'Rescue pet trapped in building',
      location: 'West District, Building 3',
      timestamp: '3 hours ago',
      status: 'resolved',
      coordinates: [13.0727, 80.2507]
    }
  ]);

  // Center map on average coordinates of active requests or default to Chennai
  const getMapCenter = (): [number, number] => {
    if (activeRequests.length === 0) return [13.0827, 80.2707]; // Default: Chennai

    const validRequests = activeRequests.filter(req => req.coordinates);
    if (validRequests.length === 0) return [13.0827, 80.2707];

    const sum = validRequests.reduce(
      (acc, req) => {
        if (req.coordinates) {
          return [acc[0] + req.coordinates[0], acc[1] + req.coordinates[1]];
        }
        return acc;
      },
      [0, 0]
    );

    return [sum[0] / validRequests.length, sum[1] / validRequests.length];
  };

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
        <TabsList className="grid grid-cols-3 w-full max-w-md">
          <TabsTrigger 
            value="active" 
            className="data-[state=active]:bg-aidlink-primary data-[state=active]:text-white"
          >
            Active Requests
          </TabsTrigger>
          <TabsTrigger 
            value="map-view"
            className="data-[state=active]:bg-aidlink-primary data-[state=active]:text-white"
          >
            <MapIcon className="mr-2 h-4 w-4" />
            Map View
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

        {/* Map View Tab */}
        <TabsContent value="map-view" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapIcon className="text-aidlink-primary" />
                Help Request Map
              </CardTitle>
              <CardDescription>
                View and respond to active help requests in your area
              </CardDescription>
            </CardHeader>
            <CardContent>
              {activeRequests.length > 0 ? (
                <div className="h-96 w-full rounded-md overflow-hidden border border-gray-200">
                  <MapContainer 
                    center={getMapCenter()} 
                    zoom={13} 
                    style={{ height: '100%', width: '100%' }}
                    zoomControl={true}
                  >
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    
                    {/* Add markers for each active request */}
                    {activeRequests.map((request) => (
                      request.coordinates && (
                        <Marker 
                          key={request.id} 
                          position={request.coordinates}
                          icon={request.urgency === 'urgent' ? urgentIcon : new L.Icon.Default()}
                        >
                          <Popup className="request-popup">
                            <div className="space-y-2 p-1">
                              <h3 className="font-medium text-base">{request.message}</h3>
                              <div className="text-sm text-gray-600">
                                <div className="flex items-start gap-1">
                                  <MapPin size={14} className="mt-0.5 text-aidlink-primary" />
                                  {request.location}
                                </div>
                                <div className="mt-1 text-xs text-gray-500">
                                  {request.timestamp}
                                </div>
                                {request.urgency === 'urgent' && (
                                  <div className="mt-2 bg-red-100 text-red-800 px-2 py-0.5 rounded-full text-xs inline-block">
                                    Urgent
                                  </div>
                                )}
                              </div>
                              <Button 
                                size="sm" 
                                className="w-full bg-aidlink-primary hover:bg-aidlink-secondary mt-2"
                                onClick={() => handleAcceptRequest(request.id)}
                              >
                                Accept Request
                              </Button>
                            </div>
                          </Popup>
                        </Marker>
                      )
                    ))}
                    
                    {/* Keep map centered on requests */}
                    <RecenterAutomatically coordinates={getMapCenter()} />
                  </MapContainer>
                </div>
              ) : (
                <div className="bg-gray-50 border-dashed border-2 border-gray-200 rounded-lg flex flex-col items-center justify-center p-12">
                  <MapIcon className="h-12 w-12 text-gray-400 mb-4" />
                  <p className="text-center text-gray-500">
                    There are no active help requests to display on the map.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
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

      {/* Add CSS to make urgent markers visually distinct */}
      <style jsx global>{`
        .urgent-marker {
          filter: hue-rotate(140deg);
        }
        .leaflet-popup-content {
          margin: 13px 19px 13px 13px;
          min-width: 200px;
        }
        .request-popup .leaflet-popup-content-wrapper {
          border-radius: 8px;
        }
      `}</style>
    </div>
  );
};

export default VolunteerDashboard;