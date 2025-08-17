import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Waves,
  Facebook,
  Instagram,
  Twitter,
  CreditCard,
  Smartphone,
  Globe,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter signup
    console.log("Newsletter signup:", email);
    setEmail("");
  };

  return (
    <footer className="bg-foreground text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <Waves className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold font-sans">ReserveSurf</span>
            </div>
            <p className="text-primary-foreground/70 mb-4 font-sans">
              Book ocean adventures in seconds. Real-time conditions, verified
              instructors, transparent pricing.
            </p>
            <div className="flex space-x-4">
              <Button
                variant="ghost"
                size="icon"
                className="text-primary-foreground/70 hover:text-primary-foreground"
              >
                <span className="sr-only">Facebook</span>
                <Facebook className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-primary-foreground/70 hover:text-primary-foreground"
              >
                <span className="sr-only">Instagram</span>
                <Instagram className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-primary-foreground/70 hover:text-primary-foreground"
              >
                <span className="sr-only">Twitter</span>
                <Twitter className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 font-serif">
              Quick Links
            </h3>
            <div className="space-y-2">
              <Link
                to="/about"
                className="block text-primary-foreground/70 hover:text-primary-foreground font-sans"
              >
                About Us
              </Link>
              <Link
                to="/how-it-works"
                className="block text-primary-foreground/70 hover:text-primary-foreground font-sans"
              >
                How It Works
              </Link>
              <Link
                to="/safety"
                className="block text-primary-foreground/70 hover:text-primary-foreground font-sans"
              >
                Safety Standards
              </Link>
              <Link
                to="/login"
                className="block text-primary-foreground/70 hover:text-primary-foreground font-sans"
              >
                Login
              </Link>
            </div>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4 font-serif">Support</h3>
            <div className="space-y-2">
              <Link
                to="/help"
                className="block text-primary-foreground/70 hover:text-primary-foreground font-sans"
              >
                Help Center
              </Link>
              <Link
                to="/contact"
                className="block text-primary-foreground/70 hover:text-primary-foreground font-sans"
              >
                Contact Us
              </Link>
              <Link
                to="/terms"
                className="block text-primary-foreground/70 hover:text-primary-foreground font-sans"
              >
                Terms of Service
              </Link>
              <Link
                to="/privacy"
                className="block text-primary-foreground/70 hover:text-primary-foreground font-sans"
              >
                Privacy Policy
              </Link>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4 font-serif">
              Get Ocean Updates
            </h3>
            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-background/10 border-primary-foreground/20 text-primary-foreground placeholder-primary-foreground/60"
                required
              />
              <Button type="submit" className="w-full">
                Subscribe
              </Button>
            </form>
            <p className="text-sm text-primary-foreground/70 mt-2 font-sans">
              Weekly conditions & deals
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/20 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <p className="text-primary-foreground/70 text-sm font-sans">
              © 2025 ReserveSurf. All rights reserved.
            </p>

            {/* Payment Icons */}
            <div className="flex items-center space-x-4">
              <span className="text-sm text-primary-foreground/70 font-sans">
                We accept:
              </span>
              <div className="flex space-x-2">
                <div className="w-8 h-5 bg-primary-foreground/20 rounded text-xs flex items-center justify-center">
                  <CreditCard className="h-3 w-3" />
                </div>
                <div className="w-8 h-5 bg-primary-foreground/20 rounded text-xs flex items-center justify-center">
                  <Smartphone className="h-3 w-3" />
                </div>
                <div className="w-8 h-5 bg-primary-foreground/20 rounded text-xs flex items-center justify-center">
                  <Globe className="h-3 w-3" />
                </div>
                <div className="w-8 h-5 bg-primary-foreground/20 rounded text-xs flex items-center justify-center">
                  <User className="h-3 w-3" />
                </div>
              </div>
            </div>

            {/* Language Selector */}
            <Select defaultValue="en">
              <SelectTrigger className="w-32 bg-background/10 border-primary-foreground/20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="nl">Nederlands</SelectItem>
                <SelectItem value="de">Deutsch</SelectItem>
                <SelectItem value="es">Español</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
