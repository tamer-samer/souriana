import { FiFacebook, FiInstagram } from "react-icons/fi";
import { LiaTelegram } from "react-icons/lia";
import { getSyrPageFollowers } from "@/db/queries";
import { FOLLOWERS } from "@/constants";
import { Card, CardContent } from "../ui/card";

export async function About() {
  const followers = await getSyrPageFollowers();

  const accounts = [
    {
      icon: FiFacebook,
      title: "فيسبوك",
      followers: (
        followers.facebookCount || FOLLOWERS.facebookCount
      ).toLocaleString(),
      color: "text-blue-400",
    },
    {
      icon: FiInstagram,
      title: "انستغرام",
      followers: (
        followers.instagramCount || FOLLOWERS.instagramCount
      ).toLocaleString(),
      color: "text-pink-400",
    },
    {
      icon: LiaTelegram,
      title: "تلغرام",
      followers: (
        followers.telegramCount || FOLLOWERS.telegramCount
      ).toLocaleString(),
      color: "text-cyan-400",
    },
  ];
  return (
    <section id="about" className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            حول
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {accounts.map((account, index) => (
            <Card
              key={index}
              className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all duration-300 group"
            >
              <CardContent className="p-6">
                <div className="flex justify-center items-center mb-4">
                  <div className="w-12 h-12 bg-slate-700 rounded-lg flex items-center justify-center group-hover:bg-slate-600 transition-colors">
                    <account.icon className={`h-6 w-6 ${account.color}`} />
                  </div>
                </div>
                <h3 className="text-white text-center text-2xl font-semibold leading-relaxed flex items-center justify-center gap-2">
                  {account.followers} {followers.isInit && "+"}
                  <p className="text-center text-xl font-semibold">متابع</p>
                </h3>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
