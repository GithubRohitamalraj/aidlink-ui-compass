
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

type Role = 'survivor' | 'volunteer' | 'admin';

const LoginForm: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role>('survivor');
  
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Logged in successfully",
        description: `Welcome back, ${selectedRole}!`,
      });
      navigate('/dashboard');
    }, 1000);
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-soft">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl font-bold text-aidlink-dark">Welcome Back</CardTitle>
        <CardDescription>
          Login to access your AidLink account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="survivor" className="mb-6">
          <TabsList className="grid grid-cols-3">
            <TabsTrigger 
              value="survivor" 
              onClick={() => setSelectedRole('survivor')}
              className="data-[state=active]:bg-aidlink-primary data-[state=active]:text-white"
            >
              Survivor
            </TabsTrigger>
            <TabsTrigger 
              value="volunteer" 
              onClick={() => setSelectedRole('volunteer')}
              className="data-[state=active]:bg-aidlink-primary data-[state=active]:text-white"
            >
              Volunteer
            </TabsTrigger>
            <TabsTrigger 
              value="admin" 
              onClick={() => setSelectedRole('admin')}
              className="data-[state=active]:bg-aidlink-primary data-[state=active]:text-white"
            >
              Admin
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input 
              id="phoneNumber" 
              type="tel" 
              placeholder="Enter your phone number" 
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <a 
                href="#" 
                className="text-sm text-aidlink-primary hover:underline"
              >
                Forgot password?
              </a>
            </div>
            <Input 
              id="password" 
              type="password" 
              placeholder="Enter your password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-aidlink-primary hover:bg-aidlink-secondary text-white"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <Loader size={16} className="animate-spin" />
                <span>Logging in...</span>
              </div>
            ) : (
              "Sign In"
            )}
          </Button>

          <div className="text-center text-sm mt-4">
            Don't have an account? {' '}
            <a 
              href="/signup" 
              className="text-aidlink-primary hover:underline"
            >
              Sign Up
            </a>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
