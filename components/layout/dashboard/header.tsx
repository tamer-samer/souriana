"use client";

import { UserButton } from "@clerk/nextjs";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function DashboardHeader() {
  return (
    <header className="sticky top-0 z-50 min-h-[60px] bg-secondary/95 backdrop-blur-sm border-b w-full">
      <div className="flex items-center justify-between mx-auto h-full w-full py-4 px-5">
        {/* Mobile Button */}
        <div className="lg:hidden">
          <SidebarTrigger />
        </div>
        {/* User Profile */}
        <div className="flex items-center justify-end flex-1">
          <UserButton />
        </div>
      </div>
    </header>
  );
}
