
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, AlertCircle, Clock } from 'lucide-react';

interface Announcement {
  id: string;
  message: string;
  severity: 'critical' | 'warning' | 'info';
  timestamp: string;
}

interface EmergencyAnnouncementsProps {
  announcements: Announcement[];
}

const EmergencyAnnouncements: React.FC<EmergencyAnnouncementsProps> = ({ announcements }) => {
  if (announcements.length === 0) return null;
  
  const getSeverityDetails = (severity: Announcement['severity']) => {
    switch (severity) {
      case 'critical':
        return { 
          icon: <AlertCircle className="h-5 w-5 text-red-500" />,
          badge: 'bg-red-100 text-red-800 border-red-200',
          label: 'Critical'
        };
      case 'warning':
        return { 
          icon: <AlertTriangle className="h-5 w-5 text-yellow-500" />,
          badge: 'bg-yellow-100 text-yellow-800 border-yellow-200',
          label: 'Warning'
        };
      default:
        return { 
          icon: <AlertCircle className="h-5 w-5 text-blue-500" />,
          badge: 'bg-blue-100 text-blue-800 border-blue-200',
          label: 'Information'
        };
    }
  };

  return (
    <div className="space-y-4 mb-6">
      <h2 className="text-lg font-medium text-aidlink-dark">Emergency Announcements</h2>
      
      <div className="space-y-3">
        {announcements.map((announcement) => {
          const { icon, badge, label } = getSeverityDetails(announcement.severity);
          
          return (
            <Card key={announcement.id} className="border-l-4 border-l-aidlink-secondary">
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    {icon}
                    <span className="font-medium">{announcement.message}</span>
                  </div>
                  <Badge className={badge}>{label}</Badge>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Clock size={14} />
                  <span>{announcement.timestamp}</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default EmergencyAnnouncements;
