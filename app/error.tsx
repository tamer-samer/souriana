"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Home,
  Wifi,
  AlertTriangle,
  Search,
  Bug,
  ServerCrash,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

// Error configuration for different error types
const errorConfigs = {
  "404": {
    title: "الصفحة غير موجودة",
    message:
      "عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها إلى مكان آخر.",
    icon: Search,
    color: "text-cyan-400",
    bgColor: "bg-cyan-500/10",
    animation: "animate-bounce",
  },
  "500": {
    title: "خطأ في الخادم",
    message:
      "حدث خطأ في الخادم الخاص بنا. نحن نعمل على إصلاح المشكلة، يرجى المحاولة لاحقاً.",
    icon: ServerCrash,
    color: "text-red-400",
    bgColor: "bg-red-500/10",
    animation: "animate-pulse",
  },
  "403": {
    title: "غير مصرح بالوصول",
    message:
      "ليس لديك صلاحية للوصول إلى هذه الصفحة. يرجى تسجيل الدخول أو التواصل مع المسؤول.",
    icon: AlertTriangle,
    color: "text-amber-400",
    bgColor: "bg-amber-500/10",
    animation: "animate-pulse",
  },
  network: {
    title: "انقطع الاتصال",
    message:
      "يبدو أن اتصالك بالإنترنت قد انقطع. يرجى التحقق من اتصالك والمحاولة مرة أخرى.",
    icon: Wifi,
    color: "text-purple-400",
    bgColor: "bg-purple-500/10",
    animation: "animate-ping",
  },
  unknown: {
    title: "حدث خطأ غير متوقع",
    message:
      "نعتذر، حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى أو الاتصال بالدعم الفني.",
    icon: Bug,
    color: "text-orange-400",
    bgColor: "bg-orange-500/10",
    animation: "animate-pulse",
  },
};

interface ErrorPageProps {
  error: Error & { digest?: string };
}

export default function Error({ error }: ErrorPageProps) {
  console.log(error);
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [glitchText, setGlitchText] = useState("");

  // Determine error type based on error message or digest
  const determineErrorType = (): keyof typeof errorConfigs => {
    // Check if error contains status code
    if (error.message.includes("404")) return "404";
    if (error.message.includes("403")) return "403";
    if (error.message.includes("500")) return "500";

    // Check error message content
    if (error.message.includes("network") || error.message.includes("fetch")) {
      return "network";
    }
    if (
      error.message.includes("permission") ||
      error.message.includes("unauthorized")
    ) {
      return "403";
    }
    if (error.message.includes("not found")) {
      return "404";
    }
    if (error.message.includes("server")) {
      return "500";
    }

    // Default to unknown
    return "unknown";
  };

  const type = determineErrorType();

  // Get the appropriate error configuration or fallback to unknown
  const config = errorConfigs[type] || errorConfigs.unknown;
  const Icon = config.icon;

  useEffect(() => {
    setMounted(true);
    console.error("Application error:", error);

    // Create glitch effect for error code
    const glitchChars = "!@#$%^&*()_+-=[]{}|;:,.<>?";
    const originalText = type.toUpperCase();
    let glitchInterval: NodeJS.Timeout;

    const createGlitch = () => {
      let result = "";
      for (let i = 0; i < originalText.length; i++) {
        if (Math.random() < 0.1) {
          result += glitchChars[Math.floor(Math.random() * glitchChars.length)];
        } else {
          result += originalText[i];
        }
      }
      setGlitchText(result);

      setTimeout(() => setGlitchText(originalText), 100);
    };

    glitchInterval = setInterval(createGlitch, 2000);
    setGlitchText(originalText);

    return () => clearInterval(glitchInterval);
  }, [type, error]);

  const handleGoBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };

  const handleGoHome = () => {
    router.push("/");
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-slate-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        {/* Error Code with Glitch Effect */}
        <div className="mb-8">
          <div className="relative inline-block">
            <h1 className="text-8xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-cyan-400 to-teal-400 mb-4 font-mono tracking-wider">
              {glitchText}
            </h1>
            {/* Glitch overlay effect */}
            <div className="absolute inset-0 text-2xl md:text-7xl font-bold text-red-400 opacity-20 animate-pulse font-mono tracking-wider">
              {type.toUpperCase()}
            </div>
          </div>
        </div>

        {/* Main Error Card */}
        <Card className="bg-slate-900/80 backdrop-blur-sm border-slate-800 shadow-2xl mb-8">
          <CardContent className="p-8">
            {/* Animated Icon */}
            <div
              className={`w-24 h-24 ${config.bgColor} rounded-full flex items-center justify-center mx-auto mb-6 ${config.animation}`}
            >
              <Icon className={`h-12 w-12 ${config.color}`} />
            </div>

            {/* Error Title */}
            <h2
              className="text-3xl md:text-4xl font-bold text-white mb-4"
              dir="rtl"
            >
              {config.title}
            </h2>

            {/* Error Message */}
            <p
              className="text-lg text-slate-300 mb-8 leading-relaxed max-w-lg mx-auto"
              dir="rtl"
            >
              {config.message}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                onClick={handleGoHome}
                variant="outline"
                size="lg"
                className="gap-2 min-w-[160px] group"
              >
                <Home className="h-5 w-5 group-hover:scale-110 transition-transform" />
                الرئيسية
              </Button>
              <Button
                onClick={handleGoBack}
                size="lg"
                className="gap-2 min-w-[160px] group"
              >
                <ArrowRight className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
                العودة
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
