
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader, Check } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type Role = 'survivor' | 'volunteer' | 'admin';

interface LocationState {
  role?: Role;
}

const SignupForm: React.FC = () => {
  const location = useLocation();
  const locationState = location.state as LocationState;
  const initialRole = locationState?.role || 'survivor';

  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    email: '',
    location: '',
    skills: '',
    password: '',
  });
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role>(initialRole);
  
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSkillsChange = (value: string) => {
    setFormData(prev => ({ ...prev, skills: value }));
  };

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Account created successfully",
        description: "Welcome to AidLink! You can now log in.",
      });
      navigate('/login');
    }, 1500);
  };

  // Form fields based on role
  const renderFormFields = () => {
    if (step === 1) {
      return (
        <>
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input 
              id="name" 
              placeholder="Enter your full name" 
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input 
              id="phoneNumber" 
              type="tel" 
              placeholder="Enter your phone number" 
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input 
              id="password" 
              type="password" 
              placeholder="Create a password" 
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
        </>
      );
    }
    
    if (step === 2) {
      // Role specific fields
      if (selectedRole === 'survivor') {
        return (
          <div className="space-y-2">
            <Label htmlFor="location">Your Location</Label>
            <Input 
              id="location" 
              placeholder="Enter your location" 
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>
        );
      }
      
      if (selectedRole === 'volunteer') {
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="location">Area You Can Serve</Label>
              <Input 
                id="location" 
                placeholder="Enter your service area" 
                value={formData.location}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="skills">Skills</Label>
              <Select onValueChange={handleSkillsChange} value={formData.skills}>
                <SelectTrigger id="skills">
                  <SelectValue placeholder="Select your skills" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="medical">Medical</SelectItem>
                  <SelectItem value="logistics">Logistics</SelectItem>
                  <SelectItem value="transport">Transportation</SelectItem>
                  <SelectItem value="food">Food Distribution</SelectItem>
                  <SelectItem value="shelter">Shelter Management</SelectItem>
                  <SelectItem value="rescue">Search & Rescue</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        );
      }
      
      if (selectedRole === 'admin') {
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="Enter your email" 
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="location">Organization</Label>
              <Input 
                id="location" 
                placeholder="Enter your organization name" 
                value={formData.location}
                onChange={handleChange}
                required
              />
            </div>
          </>
        );
      }
    }
    
    return null;
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-soft">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl font-bold text-aidlink-dark">Create an Account</CardTitle>
        <CardDescription>
          Join AidLink to connect during disasters
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs 
          value={selectedRole} 
          onValueChange={(value) => setSelectedRole(value as Role)}
          className="mb-6"
        >
          <TabsList className="grid grid-cols-3">
            <TabsTrigger 
              value="survivor"
              className="data-[state=active]:bg-aidlink-primary data-[state=active]:text-white"
            >
              Survivor
            </TabsTrigger>
            <TabsTrigger 
              value="volunteer"
              className="data-[state=active]:bg-aidlink-primary data-[state=active]:text-white"
            >
              Volunteer
            </TabsTrigger>
            <TabsTrigger 
              value="admin"
              className="data-[state=active]:bg-aidlink-primary data-[state=active]:text-white"
            >
              Admin
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Progress Indicator */}
        <div className="flex items-center justify-center mb-6">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-aidlink-primary text-white' : 'bg-gray-200'}`}>
            {step > 1 ? <Check size={16} /> : 1}
          </div>
          <div className={`h-1 w-12 ${step > 1 ? 'bg-aidlink-primary' : 'bg-gray-200'}`}></div>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-aidlink-primary text-white' : 'bg-gray-200'}`}>
            2
          </div>
        </div>

        <form onSubmit={handleSignup} className="space-y-4">
          {renderFormFields()}
          
          <div className="flex gap-2 justify-between mt-6">
            {step > 1 && (
              <Button 
                type="button" 
                variant="outline"
                onClick={handlePrevStep}
                className="flex-1"
              >
                Back
              </Button>
            )}
            
            {step < 2 ? (
              <Button 
                type="button" 
                className="bg-aidlink-primary hover:bg-aidlink-secondary text-white flex-1"
                onClick={handleNextStep}
              >
                Continue
              </Button>
            ) : (
              <Button 
                type="submit" 
                className="bg-aidlink-primary hover:bg-aidlink-secondary text-white flex-1"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <Loader size={16} className="animate-spin" />
                    <span>Creating Account...</span>
                  </div>
                ) : (
                  "Create Account"
                )}
              </Button>
            )}
          </div>

          <div className="text-center text-sm mt-4">
            Already have an account? {' '}
            <a 
              href="/login" 
              className="text-aidlink-primary hover:underline"
            >
              Sign In
            </a>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default SignupForm;
