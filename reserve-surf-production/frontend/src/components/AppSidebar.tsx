import * as React from "react";
import { Link } from "react-router-dom";
import {
  BarChart3,
  Calendar,
  Users,
  UserCheck,
  TrendingUp,
  Settings,
  Waves,
  Cloud,
  Wrench,
  DollarSign,
} from "lucide-react";

import { NavMain } from "@/components/NavMain";
import { NavUser } from "@/components/NavUser";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

// Navigation data
const navigationData = {
  user: {
    name: "Operator",
    email: "operator@reservesurf.com",
    avatar: "/avatars/operator.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/operator/dashboard",
      icon: BarChart3,
    },
    {
      title: "Calendar",
      url: "/operator/calendar",
      icon: Calendar,
    },
    {
      title: "Customers",
      url: "/operator/customers",
      icon: Users,
    },
    {
      title: "Staff",
      url: "/operator/staff",
      icon: UserCheck,
    },
    {
      title: "Reports",
      url: "/operator/reports",
      icon: TrendingUp,
    },
    {
      title: "Pricing",
      url: "/operator/pricing",
      icon: DollarSign,
    },
    {
      title: "Weather",
      url: "/operator/weather",
      icon: Cloud,
    },
    {
      title: "Equipment",
      url: "/operator/equipment",
      icon: Wrench,
    },
    {
      title: "Settings",
      url: "/operator/settings",
      icon: Settings,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Link to="/operator/dashboard">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Waves className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">ReserveSurf</span>
                  <span className="truncate text-xs">Operator Portal</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navigationData.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={navigationData.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
