import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";
import { useToast } from '@/components/ui/use-toast';
import { 
  Users, AlertTriangle, CheckCircle, Clock, Shield, 
  CheckCheck, X, Box, CircleCheck, Search, BadgeCheck, MapPin
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";

interface AidRequest {
  id: string;
  type: string;
  description: string;
  urgency: string;
  status: string;
  createdAt: string;
  acceptedBy?: string;
}

interface VolunteerApplication {
  id: string;
  name: string;
  skills: string;
  location: string;
  appliedAt: string;
  status: 'pending' | 'approved' | 'rejected';
}

const AdminDashboard: React.FC = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  
  // Demo aid requests
  const [requests, setRequests] = useState<AidRequest[]>([
    {
      id: 'req-001',
      type: 'medical',
      description: 'Need first aid supplies for injured people',
      urgency: 'urgent',
      status: 'pending',
      createdAt: '2025-04-17T08:30:00Z'
    },
    {
      id: 'req-002',
      type: 'food',
      description: 'Family of 5 needs food supplies',
      urgency: 'moderate',
      status: 'accepted',
      createdAt: '2025-04-17T07:15:00Z',
      acceptedBy: 'Lisa Garcia'
    },
    {
      id: 'req-003',
      type: 'shelter',
      description: 'Need temporary housing for elderly couple',
      urgency: 'moderate',
      status: 'accepted',
      createdAt: '2025-04-16T15:45:00Z',
      acceptedBy: 'Robert Chen'
    },
    {
      id: 'req-004',
      type: 'transportation',
      description: 'Need evacuation from flooded area',
      urgency: 'urgent',
      status: 'pending',
      createdAt: '2025-04-17T09:20:00Z'
    },
    {
      id: 'req-005',
      type: 'rescue',
      description: 'People trapped on roof need immediate help',
      urgency: 'urgent',
      status: 'completed',
      createdAt: '2025-04-16T14:10:00Z',
      acceptedBy: 'Rescue Team Alpha'
    },
    {
      id: 'req-006',
      type: 'water',
      description: 'Clean drinking water needed for community center',
      urgency: 'moderate',
      status: 'completed',
      createdAt: '2025-04-15T11:25:00Z',
      acceptedBy: 'Water Relief Team'
    },
  ]);
  
  // Demo volunteers
  const [volunteers, setVolunteers] = useState<VolunteerApplication[]>([
    {
      id: '1',
      name: 'John Smith',
      skills: 'Medical',
      location: 'North District',
      appliedAt: '2 hours ago',
      status: 'pending'
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      skills: 'Transportation',
      location: 'East District',
      appliedAt: '3 hours ago',
      status: 'pending'
    },
    {
      id: '3',
      name: 'Michael Brown',
      skills: 'Rescue',
      location: 'West District',
      appliedAt: '5 hours ago',
      status: 'pending'
    },
    {
      id: '4',
      name: 'Lisa Garcia',
      skills: 'Food Distribution',
      location: 'South District',
      appliedAt: '1 day ago',
      status: 'approved'
    },
    {
      id: '5',
      name: 'Robert Chen',
      skills: 'Shelter Management',
      location: 'Central District',
      appliedAt: '2 days ago',
      status: 'approved'
    }
  ]);

  // Filter requests based on search query
  const filteredRequests = requests.filter((request) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      request.type.toLowerCase().includes(searchLower) ||
      request.description.toLowerCase().includes(searchLower) ||
      request.urgency.toLowerCase().includes(searchLower) ||
      request.status.toLowerCase().includes(searchLower)
    );
  });
  
  // Count requests by status
  const pendingCount = requests.filter(
    (request) => request.status === "pending"
  ).length;
  const acceptedCount = requests.filter(
    (request) => request.status === "accepted"
  ).length;
  const completedCount = requests.filter(
    (request) => request.status === "completed"
  ).length;
  
  // Count requests by urgency
  const urgentCount = requests.filter(
    (request) => request.urgency === "urgent" && request.status !== "completed"
  ).length;

  const getTimeAgo = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true });
    } catch (error) {
      return "recently";
    }
  };

  const renderUrgencyBadge = (urgency: string) => {
    const classes = {
      urgent: "bg-red-500 text-white",
      moderate: "bg-yellow-400 text-gray-900",
      low: "bg-green-500 text-white",
    };
    
    return (
      <span
        className={cn(
          "rounded-full text-xs px-2 py-0.5 inline-block",
          classes[urgency as keyof typeof classes]
        )}
      >
        {urgency}
      </span>
    );
  };

  const handleApproveVolunteer = (id: string) => {
    setVolunteers(volunteers.map(vol => 
      vol.id === id ? { ...vol, status: 'approved' as const } : vol
    ));
    
    toast({
      title: "Volunteer Approved",
      description: "The volunteer has been verified and can now accept help requests.",
    });
  };

  const handleRejectVolunteer = (id: string) => {
    setVolunteers(volunteers.map(vol => 
      vol.id === id ? { ...vol, status: 'rejected' as const } : vol
    ));
    
    toast({
      title: "Volunteer Rejected",
      description: "The volunteer application has been rejected.",
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-aidlink-dark">Admin Dashboard</h2>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Box className="mr-2 h-4 w-4 text-gray-500" />
              Total Requests
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{requests.length}</div>
            <p className="text-xs text-gray-500 mt-1">All time</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center text-orange-600">
              <Clock className="mr-2 h-4 w-4" />
              Pending
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingCount}</div>
            <p className="text-xs text-gray-500 mt-1">Awaiting volunteers</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center text-blue-600">
              <Users className="mr-2 h-4 w-4" />
              In Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{acceptedCount}</div>
            <p className="text-xs text-gray-500 mt-1">Being handled</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center text-green-600">
              <CircleCheck className="mr-2 h-4 w-4" />
              Completed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedCount}</div>
            <p className="text-xs text-gray-500 mt-1">Aid delivered</p>
          </CardContent>
        </Card>
      </div>

      {/* Aid Requests Section */}
      <Card className="mt-6">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Aid Requests</CardTitle>
              <CardDescription>Manage and monitor all aid requests</CardDescription>
            </div>
            
            {urgentCount > 0 && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-3 py-1.5 rounded-md flex items-center text-sm">
                <AlertTriangle className="h-4 w-4 mr-2" />
                {urgentCount} urgent requests
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-4 relative">
            <Search className="h-4 w-4 absolute left-3 top-2.5 text-gray-400" />
            <Input
              placeholder="Search requests..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Tabs defaultValue="all">
            <TabsList className="mb-4">
              <TabsTrigger value="all">All Requests</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="accepted">In Progress</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-0">
              <div className="rounded-lg border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Request ID</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Urgency</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Created</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRequests.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-6 text-gray-500">
                          No requests found matching your search
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredRequests.map((request) => (
                        <TableRow key={request.id}>
                          <TableCell className="font-mono text-xs">{request.id}</TableCell>
                          <TableCell className="capitalize">{request.type}</TableCell>
                          <TableCell className="max-w-sm truncate">{request.description}</TableCell>
                          <TableCell>{renderUrgencyBadge(request.urgency)}</TableCell>
                          <TableCell className="capitalize">{request.status}</TableCell>
                          <TableCell>{getTimeAgo(request.createdAt)}</TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            
            <TabsContent value="pending" className="mt-0">
              <div className="rounded-lg border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Request ID</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Urgency</TableHead>
                      <TableHead>Created</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRequests
                      .filter((request) => request.status === "pending")
                      .map((request) => (
                        <TableRow key={request.id}>
                          <TableCell className="font-mono text-xs">{request.id}</TableCell>
                          <TableCell className="capitalize">{request.type}</TableCell>
                          <TableCell className="max-w-sm truncate">{request.description}</TableCell>
                          <TableCell>{renderUrgencyBadge(request.urgency)}</TableCell>
                          <TableCell>{getTimeAgo(request.createdAt)}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            
            <TabsContent value="accepted" className="mt-0">
              <div className="rounded-lg border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Request ID</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Urgency</TableHead>
                      <TableHead>Accepted By</TableHead>
                      <TableHead>Created</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRequests
                      .filter((request) => request.status === "accepted")
                      .map((request) => (
                        <TableRow key={request.id}>
                          <TableCell className="font-mono text-xs">{request.id}</TableCell>
                          <TableCell className="capitalize">{request.type}</TableCell>
                          <TableCell className="max-w-sm truncate">{request.description}</TableCell>
                          <TableCell>{renderUrgencyBadge(request.urgency)}</TableCell>
                          <TableCell>{request.acceptedBy || "Unknown"}</TableCell>
                          <TableCell>{getTimeAgo(request.createdAt)}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            
            <TabsContent value="completed" className="mt-0">
              <div className="rounded-lg border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Request ID</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Urgency</TableHead>
                      <TableHead>Completed By</TableHead>
                      <TableHead>Created</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRequests
                      .filter((request) => request.status === "completed")
                      .map((request) => (
                        <TableRow key={request.id}>
                          <TableCell className="font-mono text-xs">{request.id}</TableCell>
                          <TableCell className="capitalize">{request.type}</TableCell>
                          <TableCell className="max-w-sm truncate">{request.description}</TableCell>
                          <TableCell>{renderUrgencyBadge(request.urgency)}</TableCell>
                          <TableCell>{request.acceptedBy || "Unknown"}</TableCell>
                          <TableCell>{getTimeAgo(request.createdAt)}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Volunteer Applications Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="text-aidlink-primary" size={20} />
            Volunteer Applications
          </CardTitle>
          <CardDescription>Review and verify volunteer applications</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Skills</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Applied</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {volunteers
                .filter(vol => vol.status === 'pending')
                .map((volunteer) => (
                <TableRow key={volunteer.id}>
                  <TableCell className="font-medium">{volunteer.name}</TableCell>
                  <TableCell>{volunteer.skills}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <MapPin size={14} className="text-gray-400" />
                      {volunteer.location}
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-gray-500">{volunteer.appliedAt}</TableCell>
                  <TableCell>
                    <span className="bg-yellow-100 text-yellow-800 text-xs py-1 px-2 rounded-full">
                      Pending
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        className="bg-green-500 hover:bg-green-600 text-white h-8 w-8 p-0"
                        onClick={() => handleApproveVolunteer(volunteer.id)}
                        title="Approve"
                      >
                        <CheckCheck size={16} />
                      </Button>
                      <Button 
                        size="sm" 
                        className="bg-red-500 hover:bg-red-600 text-white h-8 w-8 p-0"
                        onClick={() => handleRejectVolunteer(volunteer.id)}
                        title="Reject"
                      >
                        <X size={16} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {volunteers.filter(vol => vol.status === 'pending').length === 0 && (
            <div className="text-center py-6 text-gray-500">
              No pending volunteer applications
            </div>
          )}
        </CardContent>
      </Card>

      {/* Verified Volunteers Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BadgeCheck className="text-aidlink-primary" size={20} />
            Verified Volunteers
          </CardTitle>
          <CardDescription>List of approved volunteers</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Skills</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {volunteers
                .filter(vol => vol.status === 'approved')
                .map((volunteer) => (
                <TableRow key={volunteer.id}>
                  <TableCell className="font-medium">{volunteer.name}</TableCell>
                  <TableCell>{volunteer.skills}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <MapPin size={14} className="text-gray-400" />
                      {volunteer.location}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="bg-green-100 text-green-800 text-xs py-1 px-2 rounded-full">
                      Verified
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {volunteers.filter(vol => vol.status === 'approved').length === 0 && (
            <div className="text-center py-6 text-gray-500">
              No verified volunteers yet
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;