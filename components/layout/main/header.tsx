"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ClerkLoading,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { SkeletonBtton } from "@/components/ui/skeleton-button";
import { Logo } from "@/components/common";

const links = [
  {
    title: "الرئيسية",
    href: "#",
  },
  {
    title: "حول",
    href: "#about",
  },
  {
    title: "اتصل بنا",
    href: "#contact",
  },
];

export function MainHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-secondary/95 backdrop-blur-sm border-b">
      <div className="flex items-center justify-between container mx-auto h-full w-full p-4">
        {/* Logo */}
        <Logo />
        {/* Nav */}
        <nav className="hidden md:flex">
          <ul className="flex items-center gap-x-4">
            {links.map((link) => {
              return (
                <li key={link.title}>
                  <a href={link.href}>{link.title}</a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Login button */}
        <div className="md:flex items-center gap-3 hidden">
          <ClerkLoading>
            <SkeletonBtton />
          </ClerkLoading>
          <>
            <SignedOut>
              <div className="flex items-center gap-2">
                <SignInButton
                  mode="modal"
                  fallbackRedirectUrl={"/transactions"}
                >
                  <Button>تسجيل الدخول</Button>
                </SignInButton>
              </div>
            </SignedOut>

            <SignedIn>
              <div className="flex items-center gap-4">
                <Link href={"/transactions"}>
                  <Button>لوحة التحكم</Button>
                </Link>
                <UserButton />
              </div>
            </SignedIn>
          </>
        </div>

        {/* Mobile Button */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            className="rounded-md"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="!h-5 !w-5" />
            ) : (
              <Menu className="!h-5 !w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-b">
            <ul>
              {links.map((link) => {
                return (
                  <li key={link.title}>
                    <a
                      href={link.href}
                      className="text-slate-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                    >
                      {link.title}
                    </a>
                  </li>
                );
              })}
            </ul>

            <div className="px-3 py-2">
              <SignedOut>
                <div className="w-full">
                  <SignInButton
                    mode="modal"
                    fallbackRedirectUrl={"/transactions"}
                  >
                    <Button className="w-full">تسجيل الدخول</Button>
                  </SignInButton>
                </div>
              </SignedOut>
              <SignedIn>
                <Link href={"/transactions"} className="w-full">
                  <Button className="w-full">لوحة التحكم</Button>
                </Link>
              </SignedIn>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
