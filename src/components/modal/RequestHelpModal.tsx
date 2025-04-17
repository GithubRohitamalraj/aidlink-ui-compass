
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import RequestHelpForm from '../forms/RequestHelpForm';
import { ScrollArea } from '@/components/ui/scroll-area';

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
      <DialogContent className="sm:max-w-xl max-h-[90vh] p-0">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle className="text-xl text-aidlink-dark">Request Emergency Help</DialogTitle>
          <DialogDescription>
            Complete this form to request immediate assistance. Emergency responders will be notified.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[calc(90vh-100px)] px-6">
          <div className="pr-4 pb-6">
            <RequestHelpForm onSubmit={handleSubmit} onClose={onClose} />
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default RequestHelpModal;
