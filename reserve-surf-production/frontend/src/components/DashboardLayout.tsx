import * as React from "react";
import { Outlet } from "react-router-dom";
import { Bell, Plus, Search } from "lucide-react";

import { AppSidebar } from "@/components/AppSidebar";
import { MobileNavigation } from "@/components/MobileNavigation";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Command, CommandInput } from "@/components/ui/command";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

interface DashboardLayoutProps {
  children?: React.ReactNode;
  pageTitle?: string;
  breadcrumbs?: Array<{
    title: string;
    href?: string;
  }>;
  showQuickActions?: boolean;
}

export function DashboardLayout({
  children,
  pageTitle = "Dashboard",
  breadcrumbs = [],
  showQuickActions = true,
}: DashboardLayoutProps) {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "16rem",
          "--sidebar-width-icon": "3rem",
        } as React.CSSProperties
      }
    >
      <AppSidebar />
      <SidebarInset>
        {/* Header */}
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />

          {/* Breadcrumb */}
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/operator/dashboard">
                  Dashboard
                </BreadcrumbLink>
              </BreadcrumbItem>
              {breadcrumbs.map((crumb, index) => (
                <React.Fragment key={index}>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    {crumb.href ? (
                      <BreadcrumbLink href={crumb.href}>
                        {crumb.title}
                      </BreadcrumbLink>
                    ) : (
                      <BreadcrumbPage>{crumb.title}</BreadcrumbPage>
                    )}
                  </BreadcrumbItem>
                </React.Fragment>
              ))}
            </BreadcrumbList>
          </Breadcrumb>

          {/* Right side actions */}
          <div className="ml-auto flex items-center gap-2">
            {/* Global Search */}
            <div className="relative hidden md:block">
              <Command className="rounded-lg border shadow-none w-64">
                <CommandInput placeholder="Search..." className="h-9" />
              </Command>
            </div>

            {/* Notifications */}
            <Button variant="ghost" size="icon">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Notifications</span>
            </Button>

            {/* Quick Actions */}
            {showQuickActions && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Quick Actions
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>New Booking</DropdownMenuItem>
                  <DropdownMenuItem>Add Customer</DropdownMenuItem>
                  <DropdownMenuItem>Staff Check-in</DropdownMenuItem>
                  <DropdownMenuItem>Generate Report</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </header>

        {/* Main Content */}
        <div className="flex flex-1 flex-col">
          <main className="flex-1 p-6 pb-20 md:pb-6">
            {children || <Outlet />}
          </main>
        </div>
      </SidebarInset>

      {/* Mobile Navigation */}
      <MobileNavigation />
    </SidebarProvider>
  );
}
