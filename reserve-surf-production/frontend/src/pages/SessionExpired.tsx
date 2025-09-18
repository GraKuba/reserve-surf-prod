import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Lock, User, RefreshCw, ArrowRight } from 'lucide-react';

export default function SessionExpired() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { login } = useAuth();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate loading for premium feel
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const success = login(username, password);
    if (!success) {
      setError(true);
      setIsLoading(false);
      setTimeout(() => setError(false), 3000);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-background">
      {/* Animated gradient background with red tint for expired state */}
      <div className="absolute inset-0 bg-gradient-to-br from-destructive/10 via-accent/5 to-destructive/10 animate-gradient-shift" />
      
      
      {/* Floating shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-destructive/10 rounded-full blur-3xl animate-float" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-drift" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-destructive/5 rounded-full blur-3xl animate-sway" />
      </div>

      {/* Main content */}
      <Card className={`w-full max-w-md relative z-10 border-destructive/20 bg-background/95 backdrop-blur-xl shadow-2xl transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <CardHeader className="space-y-1 pb-6">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-destructive/30 blur-2xl rounded-full animate-pulse" />
              <div className="relative p-8 rounded-2xl bg-gradient-to-br from-destructive via-destructive/80 to-destructive shadow-2xl">
              </div>
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-center">
            Session Expired
          </CardTitle>
          <CardDescription className="text-center text-base flex items-center justify-center gap-2 flex-wrap">
            <AlertCircle className="h-4 w-4 text-destructive" />
            <span>Your demo session has ended</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6 p-4 rounded-lg bg-destructive/5 border border-destructive/20">
            <div className="flex items-center gap-3">
              <RefreshCw className="h-5 w-5 text-destructive animate-spin-slow" />
              <p className="text-sm text-muted-foreground">
                Please re-authenticate to continue exploring
              </p>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-sm font-medium flex items-center gap-2">
                <User className="h-3 w-3" />
                Username
              </Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter demo username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full border-destructive/20 focus:border-primary transition-all duration-300 hover:border-destructive/30"
                required
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium flex items-center gap-2">
                <Lock className="h-3 w-3" />
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter demo password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border-destructive/20 focus:border-primary transition-all duration-300 hover:border-destructive/30"
                required
                disabled={isLoading}
              />
            </div>
            {error && (
              <Alert variant="destructive" className="animate-shake">
                <AlertDescription>
                  Invalid credentials. Please try again.
                </AlertDescription>
              </Alert>
            )}
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-primary to-accent border-2 border-primary/20 hover:border-primary hover:from-primary/80 hover:to-accent/80 transition-all duration-300 shadow-lg hover:shadow-xl group"
              size="lg"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="animate-spin h-4 w-4 border-2 border-white/30 border-t-white rounded-full" />
                  Re-authenticating...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <RefreshCw className="h-4 w-4" />
                  Re-enter Demo
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              )}
            </Button>
          </form>
          <div className="mt-6 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 backdrop-blur">
              <div className="h-2 w-2 bg-yellow-500 rounded-full animate-pulse" />
              <p className="text-sm text-muted-foreground">
                New session: 1 hour access
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Premium badge */}
      <div className="absolute top-8 right-8 z-20">
        <div className="px-4 py-2 rounded-full bg-gradient-to-r from-destructive/20 to-accent/20 backdrop-blur-xl border border-destructive/20 shadow-xl">
          <span className="text-xs font-semibold text-destructive">SESSION TIMEOUT</span>
        </div>
      </div>
    </div>
  );
}