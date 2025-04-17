
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import RequestHelpForm from '../forms/RequestHelpForm';

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
  const handleSubmit = (data: any) => {
    // Transform the new form data to match the expected format
    onSubmit({
      message: `${data.helpType}: ${data.description}`,
      location: data.location,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-xl text-aidlink-dark">Request Emergency Help</DialogTitle>
          <DialogDescription>
            Complete this form to request immediate assistance. Emergency responders will be notified.
          </DialogDescription>
        </DialogHeader>

        <RequestHelpForm onSubmit={handleSubmit} onClose={onClose} />
      </DialogContent>
    </Dialog>
  );
};

export default RequestHelpModal;
