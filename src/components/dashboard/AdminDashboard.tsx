
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { 
  Users, AlertCircle, CheckCircle, Clock, Shield, 
  CheckCheck, X, PieChart, MapPin, BadgeCheck 
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import HelpRequestCard from './HelpRequestCard';

interface VolunteerApplication {
  id: string;
  name: string;
  skills: string;
  location: string;
  appliedAt: string;
  status: 'pending' | 'approved' | 'rejected';
}

interface HelpRequestSummary {
  pending: number;
  accepted: number;
  resolved: number;
}

const AdminDashboard: React.FC = () => {
  const { toast } = useToast();
  const [requestSummary, setRequestSummary] = useState<HelpRequestSummary>({
    pending: 12,
    accepted: 8,
    resolved: 24
  });
  
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
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <AlertCircle className="text-yellow-500" size={18} />
              Pending Requests
            </CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-2xl font-bold text-yellow-500">{requestSummary.pending}</span>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <Clock className="text-blue-500" size={18} />
              In Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-2xl font-bold text-blue-500">{requestSummary.accepted}</span>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <CheckCircle className="text-green-500" size={18} />
              Resolved
            </CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-2xl font-bold text-green-500">{requestSummary.resolved}</span>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="text-aidlink-primary" size={20} />
            Volunteer Applications
          </CardTitle>
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

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BadgeCheck className="text-aidlink-primary" size={20} />
            Verified Volunteers
          </CardTitle>
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
