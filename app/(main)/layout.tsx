import { MainHeader } from "@/components/layout/main/header";
import { Footer } from "@/components/layout/footer";
import { LayoutProps } from "@/types";

export default function MainLayout({ children }: LayoutProps) {
  return (
    <>
      <MainHeader />
      <div className="min-h-screen">{children}</div>
      <Footer />
    </>
  );
}
