"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { BarChart3, Building2, TrendingUp } from "lucide-react";

const menuItems = [
  {
    title: "الفواتير",
    url: "/transactions",
    icon: BarChart3,
  },
  {
    title: "الجهات الاعلانية",
    url: "/clients",
    icon: Building2,
  },
  {
    title: "الاحصائيات",
    url: "/stats",
    icon: TrendingUp,
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar side="right">
      <SidebarHeader className="py-5">
        {/* Logo */}
        <div className="flex items-center">
          <Link href={"/"} className="w-full">
            <h1 className="text-xl font-bold text-primary text-center w-full">
              سوريانا التعليمية
            </h1>
          </Link>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-3">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-3">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <Button
                    variant={pathname == item.url ? "sidebar" : "ghost"}
                    className="w-full justify-start"
                    size={"lg"}
                    asChild
                  >
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </Button>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
