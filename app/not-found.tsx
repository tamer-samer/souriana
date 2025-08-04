"use client";

import { useRouter } from "next/navigation";
import { Home, ArrowLeft, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function NotFound() {
  const router = useRouter();

  const type = "404";

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-slate-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <div className="relative inline-block">
            <h1 className="text-8xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-cyan-400 to-teal-400 mb-4 font-mono tracking-wider">
              {type.toUpperCase()}
            </h1>
          </div>
        </div>

        {/* Main Error Card */}
        <Card className="bg-slate-900/80 backdrop-blur-sm border-slate-800 shadow-2xl mb-8">
          <CardContent className="p-8">
            {/* Animated Icon */}
            <div className="w-24 h-24 bg-cyan-500/10 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
              <Search className="h-12 w-12 text-cyan-400" />
            </div>

            {/* Error Title */}
            <h2
              className="text-3xl md:text-4xl font-bold text-white mb-4"
              dir="rtl"
            >
              الصفحة غير موجودة
            </h2>

            {/* Error Message */}
            <p
              className="text-lg text-slate-300 mb-8 leading-relaxed max-w-lg mx-auto"
              dir="rtl"
            >
              عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها إلى مكان آخر.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                onClick={handleGoBack}
                size="lg"
                className="gap-2 min-w-[160px] group"
              >
                <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
                العودة
              </Button>

              <Button
                onClick={handleGoHome}
                variant="outline"
                size="lg"
                className="gap-2 min-w-[160px] group"
              >
                <Home className="h-5 w-5 group-hover:scale-110 transition-transform" />
                الرئيسية
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
