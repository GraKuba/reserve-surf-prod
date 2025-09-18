import { LoginForm } from "@/components/LoginForm";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";

export default function OperatorLogin() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-background via-muted/10 to-secondary/20">
      {/* Floating shapes with blur gradients */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large blurred circle top-left */}
        <div className="absolute -top-20 -left-20 w-[500px] h-[500px] bg-gradient-to-br from-primary/15 to-accent/10 rounded-full blur-3xl animate-bounce" style={{ animationDuration: '8s' }}></div>
        
        {/* Medium blurred circle bottom-right */}
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-gradient-to-tl from-accent/20 to-secondary/15 rounded-full blur-2xl" style={{ animation: 'float 10s ease-in-out infinite 2s' }}></div>
        
        {/* Small floating circle center */}
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-gradient-to-br from-muted/30 to-primary/20 rounded-full blur-xl" style={{ animation: 'drift 12s ease-in-out infinite 1s' }}></div>
        
        {/* Geometric triangle shapes */}
        <div className="absolute top-1/4 left-1/3 w-0 h-0 border-l-[80px] border-r-[80px] border-b-[120px] border-l-transparent border-r-transparent border-b-accent/10 blur-sm" style={{ animation: 'sway 6s ease-in-out infinite 3s' }}></div>
        
        {/* Floating rectangle */}
        <div className="absolute bottom-1/4 left-1/5 w-40 h-28 bg-gradient-to-r from-primary/10 to-muted/15 rounded-lg blur-sm transform rotate-12" style={{ animation: 'rotate 15s linear infinite 4s' }}></div>
      </div>
      
      {/* Navigation Bar - matching BusinessLanding */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4">
          <div className="flex h-20 items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/" className="flex items-center gap-2">
                <div className="h-8 w-8 bg-gradient-to-br from-primary to-accent rounded-lg"></div>
                <span className="text-xl font-bold font-sans">ReserveSurf</span>
              </Link>
              <Badge variant="secondary" className="text-xs font-sans">
                for Business
              </Badge>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="outline" asChild>
                <Link to="/">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Site
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="relative z-10">
        <LoginForm />
      </div>
    </div>
  );
}
