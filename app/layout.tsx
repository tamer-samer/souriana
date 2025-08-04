import type { Metadata } from "next";
import { Tajawal } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { LayoutProps } from "@/types";

const tajawal = Tajawal({
  subsets: ["latin", "arabic"],
  weight: ["200", "400", "500"],
});

export const metadata: Metadata = {
  title: "سوريانا التعليمية",
  description: "أكبر منصة تعليمية في سوريا",
};

export default function RootLayout({ children }: LayoutProps) {
  return (
    <ClerkProvider afterSignOutUrl="/">
      <html lang="ar" dir="rtl">
        <body
          className={`${tajawal.className} antialiased dark min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-teal-950`}
        >
          <Toaster />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
