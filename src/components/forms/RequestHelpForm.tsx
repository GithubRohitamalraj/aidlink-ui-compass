import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { 
  MapPin, 
  Upload, 
  Loader2, 
  AlertTriangle,
  Phone,
  PhoneCall
} from 'lucide-react';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';

interface RequestHelpFormProps {
  onSubmit: (data: RequestFormData) => void;
  onClose: () => void;
}

interface RequestFormData {
  helpType: string;
  description: string;
  location: string;
  useCurrentLocation: boolean;
  urgencyLevel: string;
  image?: File;
  phone: string;
  alternatePhone?: string;
}

const RequestHelpForm: React.FC<RequestHelpFormProps> = ({ onSubmit, onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<RequestFormData>({
    defaultValues: {
      helpType: '',
      description: '',
      location: '',
      useCurrentLocation: false,
      urgencyLevel: 'medium',
      phone: '',
    },
  });

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast({
          title: "File too large",
          description: "Please select an image under 5MB",
          variant: "destructive",
        });
        return;
      }
      setImagePreview(URL.createObjectURL(file));
      form.setValue('image', file);
    }
  };

  const handleSubmit = async (data: RequestFormData) => {
    setIsSubmitting(true);
    try {
      await onSubmit(data);
      toast({
        title: "Help request sent",
        description: "Emergency responders have been notified",
      });
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send help request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLocationDetection = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = `${position.coords.latitude}, ${position.coords.longitude}`;
          form.setValue('location', coords);
          toast({
            title: "Location detected",
            description: "Your current location has been added to the form.",
          });
        },
        () => {
          toast({
            title: "Location error",
            description: "Could not detect your location. Please enter it manually.",
            variant: "destructive",
          });
        }
      );
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="helpType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>What kind of help do you need?</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type of help needed" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="medical">Medical Aid</SelectItem>
                  <SelectItem value="food">Food/Water</SelectItem>
                  <SelectItem value="shelter">Shelter</SelectItem>
                  <SelectItem value="rescue">Rescue</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Briefly describe your situation</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Describe what help you need..."
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel>Your Location</FormLabel>
              <div className="flex gap-2">
                <FormControl>
                  <Input 
                    placeholder="Enter your location"
                    {...field}
                    className="flex-1"
                  />
                </FormControl>
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={handleLocationDetection}
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  Detect
                </Button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="urgencyLevel"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-500" />
                  How urgent is your situation?
                </div>
              </FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex space-x-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="low" id="low" />
                    <Label htmlFor="low">Low</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="medium" id="medium" />
                    <Label htmlFor="medium">Medium</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="high" id="high" />
                    <Label htmlFor="high">High</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="critical" id="critical" />
                    <Label htmlFor="critical">Critical</Label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-2">
          <Label>Upload Image (Optional)</Label>
          <div className="flex items-center gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => document.getElementById('image-upload')?.click()}
              className="w-full"
            >
              <Upload className="w-4 h-4 mr-2" />
              Upload photo
            </Button>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </div>
          {imagePreview && (
            <div className="mt-2">
              <img
                src={imagePreview}
                alt="Preview"
                className="max-w-full h-32 object-cover rounded-md"
              />
            </div>
          )}
        </div>

        <div className="space-y-4">
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <Input type="tel" placeholder="Your phone number" {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="alternatePhone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Alternate Phone (Optional)</FormLabel>
                <FormControl>
                  <div className="flex items-center space-x-2">
                    <PhoneCall className="w-4 h-4 text-muted-foreground" />
                    <Input 
                      type="tel" 
                      placeholder="Alternative contact number"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end gap-2 pt-4 sticky bottom-0">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button 
            type="submit"
            className="bg-aidlink-primary hover:bg-aidlink-secondary text-white"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Sending...
              </>
            ) : (
              "Send Request"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default RequestHelpForm;
