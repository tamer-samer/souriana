import { LayoutProps } from "@/types";

export default function AuthLayout({ children }: LayoutProps) {
  return (
    <div className={`flex items-center justify-center min-h-screen`}>
      {children}
    </div>
  );
}
