import { DashboardHeader, AppSidebar } from "@/components/layout/dashboard";
import { Footer } from "@/components/layout/footer";
import { SidebarProvider } from "@/components/ui/sidebar";
import { LayoutProps } from "@/types";

export default function DashboardLayout({ children }: LayoutProps) {
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <div className="w-full ">
          <DashboardHeader />
          <main className="p-5 min-h-screen">{children}</main>
          <Footer />
        </div>
      </SidebarProvider>
    </>
  );
}
