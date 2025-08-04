import { ArrowLeft } from "lucide-react";
import { Button } from "../ui/button";

export function Hero() {
  return (
    <section className="relative container mx-auto px-4">
      <div className="max-w-7xl mx-auto py-24">
        <div className="text-center">
          <h1 className="text-3xl md:text-6xl font-bold text-white mb-6">
            منصة
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400">
              {" "}
              سوريانا التعليمية
            </span>
          </h1>
          <p className="text-lg text-foreground mb-8 max-w-3xl mx-auto">
            منصة تعليمية سوريّة تساهم في دعم ومساعدة آلاف الطلاب في رحلتهم
            الدراسية من خلال الملفات الدراسية والنصائح الهامة ونشر القرارات
            والأخبار الموثوقة
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#about">
              <Button size="lg" className="gap-2">
                تابع حساباتنا
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </a>
            <a href={"#contact"}>
              <Button variant="outline" size="lg">
                اتصل بنا
              </Button>
            </a>
          </div>
        </div>
      </div>

      {/* Background decoration */}
      {/* <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-teal-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
      </div> */}
    </section>
  );
}
