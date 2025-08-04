import { Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function Contact() {
  return (
    <section id="contact" className="py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            تواصل معنا
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="bg-accent/50 border-slate-700">
            <CardContent className="p-8">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      الاسم الأول
                    </label>
                    <Input
                      className="bg-secondary border-slate-600 text-white placeholder:text-slate-400"
                      placeholder="اسمك الأول"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      اسم العائلة
                    </label>
                    <Input
                      className="bg-secondary border-slate-600 text-white placeholder:text-slate-400"
                      placeholder="اسم عائلتك"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    البريد الإلكتروني
                  </label>
                  <Input
                    type="email"
                    className="bg-secondary border-slate-600 text-white placeholder:text-slate-400"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    الشركة
                  </label>
                  <Input
                    className="bg-secondary border-slate-600 text-white placeholder:text-slate-400"
                    placeholder="اسم شركتك"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    الرسالة
                  </label>
                  <Textarea
                    className="bg-secondary border-slate-600 text-white placeholder:text-slate-400 min-h-[120px]"
                    placeholder="أخبرنا عن مشروعك..."
                  />
                </div>
                <Button type="submit" className="w-full">
                  إرسال الرسالة
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div>
            <h3 className="text-2xl font-semibold text-white mb-6">
              معلومات الاتصال
            </h3>
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-teal-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="h-6 w-6 text-teal-400" />
                </div>
                <h4 className="text-lg font-medium text-white mb-1">
                  info@syr-edu.com
                </h4>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-teal-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="h-6 w-6 text-teal-400" />
                </div>
                <h4
                  style={{ direction: "ltr" }}
                  className="text-lg font-medium text-white mb-1"
                >
                  +963999999999
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
