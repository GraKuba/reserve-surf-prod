import { Link, useLocation } from "react-router-dom";
import {
  BarChart3,
  Calendar,
  Users,
  UserCheck,
  MoreHorizontal,
} from "lucide-react";

import { cn } from "../lib/utils";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const mainNavItems = [
  {
    title: "Dashboard",
    href: "/operator/dashboard",
    icon: BarChart3,
  },
  {
    title: "Calendar",
    href: "/operator/calendar",
    icon: Calendar,
  },
  {
    title: "Customers",
    href: "/operator/customers",
    icon: Users,
  },
  {
    title: "Staff",
    href: "/operator/staff",
    icon: UserCheck,
  },
];

const moreNavItems = [
  {
    title: "Reports",
    href: "/operator/reports",
  },
  {
    title: "Settings",
    href: "/operator/settings",
  },
];

export function MobileNavigation() {
  const location = useLocation();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background md:hidden">
      <NavigationMenu className="mx-auto max-w-full">
        <NavigationMenuList className="flex w-screen justify-around px-2 py-2">
          {mainNavItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <NavigationMenuItem key={item.title}>
                <Link
                  to={item.href}
                  className={cn(
                    "flex flex-col items-center gap-1 rounded-md px-3 py-2 text-xs transition-colors",
                    isActive
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="text-xs">{item.title}</span>
                </Link>
              </NavigationMenuItem>
            );
          })}

          {/* More menu */}
          <NavigationMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex flex-col items-center gap-1 h-auto py-2 px-3 text-xs text-muted-foreground hover:text-foreground"
                >
                  <MoreHorizontal className="h-5 w-5" />
                  <span className="text-xs">More</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="mb-2">
                {moreNavItems.map((item) => (
                  <DropdownMenuItem key={item.title} asChild>
                    <Link to={item.href}>{item.title}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
