
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { RequestStatus } from './HelpRequestCard';
import { Clock, CheckCircle, AlertCircle } from 'lucide-react';

interface HistoryItem {
  id: string;
  status: RequestStatus;
  location: string;
  volunteer?: string;
  timestamp: string;
  message: string;
}

interface RequestHistoryProps {
  requests: HistoryItem[];
}

const RequestHistory: React.FC<RequestHistoryProps> = ({ requests }) => {
  if (requests.length === 0) return null;
  
  const getStatusBadge = (status: RequestStatus) => {
    switch (status) {
      case 'pending':
        return (
          <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200 flex items-center gap-1">
            <Clock className="h-3 w-3" />
            Pending
          </Badge>
        );
      case 'accepted':
        return (
          <Badge className="bg-blue-100 text-blue-800 border-blue-200 flex items-center gap-1">
            <AlertCircle className="h-3 w-3" />
            Accepted
          </Badge>
        );
      case 'resolved':
        return (
          <Badge className="bg-green-100 text-green-800 border-green-200 flex items-center gap-1">
            <CheckCircle className="h-3 w-3" />
            Resolved
          </Badge>
        );
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium text-aidlink-dark">Request History</h2>
      
      <Card>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Assigned To</TableHead>
                <TableHead>Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell className="font-medium">#{request.id.slice(-4)}</TableCell>
                  <TableCell>{getStatusBadge(request.status)}</TableCell>
                  <TableCell className="max-w-[150px] truncate" title={request.location}>
                    {request.location}
                  </TableCell>
                  <TableCell>{request.volunteer || '—'}</TableCell>
                  <TableCell className="text-sm text-gray-500">{request.timestamp}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
};

export default RequestHistory;
