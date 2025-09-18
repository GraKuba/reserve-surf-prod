import { cn } from "../lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    navigate("/operator/dashboard");
  };

  return (
    <div
      className={cn(
        "min-h-[calc(100vh-5rem)] w-full flex items-center justify-center p-4",
        className
      )}
      {...props}
    >
      <div className="container mx-auto max-w-screen-xl">
        <div className="bg-background rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl overflow-hidden">
          <div className="flex flex-col lg:flex-row min-h-[600px] lg:min-h-[700px]">
            {/* Left Panel - Gradient Background (hidden on mobile, visible on lg+) */}
            <div className="hidden lg:flex flex-col justify-between p-12 xl:p-16 bg-gradient-to-br from-primary/90 via-accent/70 to-primary/80 relative overflow-hidden lg:w-[45%]">
              {/* Logo at the top */}
              <div className="relative z-10">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 xl:h-14 xl:w-14 bg-gradient-to-br from-background via-background/95 to-background/85 rounded-xl flex items-center justify-center shadow-xl">
                    <span className="text-3xl xl:text-4xl bg-gradient-to-br from-primary via-accent to-secondary bg-clip-text">
                      🏄
                    </span>
                  </div>
                  <span className="text-background font-bold text-xl xl:text-2xl drop-shadow-lg">
                    ReserveSurf
                  </span>
                </div>
              </div>

              {/* Main text at the bottom */}
              <div className="relative z-10">
                <p className="text-black/40 text-base xl:text-lg mb-3 xl:mb-4 font-medium">
                  You can easily
                </p>
                <h2 className="text-2xl xl:text-3xl font-bold font-serif text-black/70 leading-tight drop-shadow-lg">
                  Get access to your
                  <br />
                  personal hub for
                  <br />
                  surf school
                  <br />
                  management.
                </h2>
              </div>

              {/* Decorative gradient orb */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 xl:w-96 xl:h-96 bg-gradient-to-br from-accent/30 via-primary/20 to-transparent rounded-full blur-3xl"></div>
            </div>

            {/* Mobile/Tablet Gradient Header (visible on mobile/tablet, hidden on lg+) */}
            <div className="lg:hidden bg-gradient-to-br from-primary/90 via-accent/70 to-primary/80 relative overflow-hidden p-8 sm:p-10">
              <div className="relative z-10 text-center">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className="h-11 w-11 bg-gradient-to-br from-background via-background/95 to-background/85 rounded-xl flex items-center justify-center shadow-xl">
                    <span className="text-2xl">🏄</span>
                  </div>
                  <span className="text-background font-bold text-xl drop-shadow-lg">
                    ReserveSurf
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold font-serif text-background drop-shadow-lg">
                  Surf School Management
                </h2>
                <p className="text-background/90 text-sm sm:text-base mt-2 font-medium">
                  Your personal hub for managing bookings
                </p>
              </div>
              {/* Decorative gradient orb for mobile */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-br from-accent/30 via-primary/20 to-transparent rounded-full blur-3xl"></div>
            </div>

            {/* Right Panel - Login Form */}
            <div className="flex-1 flex items-center bg-white justify-center p-6 sm:p-8 lg:p-12 xl:p-16">
              <div className="w-full max-w-sm sm:max-w-md">
                <div className="mb-6 sm:mb-8">
                  <div className="flex items-center gap-3 mb-3 sm:mb-4">
                    <h1 className="text-2xl sm:text-3xl font-bold font-serif">
                      Welcome back
                    </h1>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Access your surf school dashboard - manage classes, track
                    bookings, and keep everything flowing smoothly.
                  </p>
                </div>

                <form
                  onSubmit={handleSubmit}
                  className="space-y-4 sm:space-y-5"
                >
                  <div className="space-y-2">
                    <Label
                      htmlFor="email"
                      className="text-sm font-medium text-foreground"
                    >
                      Your email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="operator@reservesurf.com"
                      className="h-11 sm:h-12 bg-muted/30 border-input focus:bg-background transition-colors"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="password"
                      className="text-sm font-medium text-foreground"
                    >
                      Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••••••••••"
                        className="h-11 sm:h-12 bg-muted/30 border-input pr-10 focus:bg-background transition-colors"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {showPassword ? (
                          <EyeOff size={18} className="sm:w-5 sm:h-5" />
                        ) : (
                          <Eye size={18} className="sm:w-5 sm:h-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-11 sm:h-12 bg-foreground text-background hover:bg-foreground/90 font-medium text-sm sm:text-base rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
                  >
                    Sign in
                  </Button>

                  <div className="relative my-5 sm:my-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-border"></div>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-muted-foreground">
                        or continue with
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2 sm:gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      className="flex-1 h-11 sm:h-12 border-muted opacity-60 cursor-not-allowed relative rounded-xl"
                      disabled
                    >
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5 opacity-50"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="currentColor"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="currentColor"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        />
                        <path
                          fill="currentColor"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                      </svg>
                      <span className="absolute -top-2 -right-1 sm:-right-2 bg-muted text-muted-foreground text-[9px] sm:text-[10px] px-1 sm:px-1.5 py-0.5 rounded-full font-medium">
                        Soon
                      </span>
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className="flex-1 h-11 sm:h-12 border-muted opacity-60 cursor-not-allowed relative rounded-xl"
                      disabled
                    >
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5 opacity-50"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                      <span className="absolute -top-2 -right-1 sm:-right-2 bg-muted text-muted-foreground text-[9px] sm:text-[10px] px-1 sm:px-1.5 py-0.5 rounded-full font-medium">
                        Soon
                      </span>
                    </Button>
                  </div>

                  <p className="text-center text-xs sm:text-sm text-muted-foreground mt-5 sm:mt-6">
                    Don't have an account?{" "}
                    <Link
                      to="/register"
                      className="text-primary hover:underline font-medium"
                    >
                      Register
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
