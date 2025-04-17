
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, Loader } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface RequestHelpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { message: string; location: string }) => void;
}

const RequestHelpModal: React.FC<RequestHelpModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [message, setMessage] = useState('');
  const [location, setLocation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      onSubmit({ message, location });
      setIsLoading(false);
      toast({
        title: "Help request submitted",
        description: "Volunteers have been notified of your request.",
      });
      setMessage('');
      setLocation('');
      onClose();
    }, 1000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="text-xl text-aidlink-dark">Request Help</DialogTitle>
            <DialogDescription>
              Please provide details about the help you need. Nearby volunteers will be notified.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="message">What do you need help with?</Label>
              <Textarea
                id="message"
                placeholder="Describe what help you need..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="min-h-[100px]"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location" className="flex items-center gap-1">
                <MapPin size={16} className="text-aidlink-primary" />
                Your Location
              </Label>
              <Input
                id="location"
                placeholder="Enter your current location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </div>

            <div className="bg-aidlink-light/50 p-3 rounded-md text-sm">
              <p className="text-gray-600">
                <strong>Note:</strong> For your safety, only verified volunteers can see and respond to your request.
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="bg-aidlink-primary hover:bg-aidlink-secondary text-white"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <Loader size={16} className="animate-spin" />
                  <span>Submitting...</span>
                </div>
              ) : (
                "Send Request"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RequestHelpModal;
