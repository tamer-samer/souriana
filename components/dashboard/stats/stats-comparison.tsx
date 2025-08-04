"use client";
import { format } from "date-fns";
import { FiFacebook, FiInstagram } from "react-icons/fi";
import { LiaTelegram } from "react-icons/lia";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Social, TrackedProfileSelect } from "@/types";

type Props = {
  pages: (TrackedProfileSelect & {
    trends: Social;
    followers: Social;
    recordDate: Date;
  })[];
};

export function StatsComparison({ pages }: Props) {
  return (
    <Card className="bg-secondary/50 border-accent">
      <CardHeader>
        <CardTitle className="text-white"></CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="border-accent hover:bg-accent/50">
              <TableHead className="text-slate-300">الصفحة</TableHead>
              <TableHead className="text-slate-300">فيسبوك</TableHead>
              <TableHead className="text-slate-300">تلغرام</TableHead>
              <TableHead className="text-slate-300">انستغرام</TableHead>
              <TableHead className="text-slate-300">التاريخ</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pages.map((page) => (
              <TableRow
                key={page.id}
                className="border-accent hover:bg-accent/30"
              >
                <TableCell>
                  <div className="font-medium relative">
                    <span className="relative">
                      {page.name}

                      <div className="flex items-center gap-1 justify-center absolute top-[100%] right-0">
                        {page.facebookUrl &&
                          page.trends.facebook != 0 &&
                          page.trends.facebook ===
                            Math.max(
                              ...pages.map((page) => page.trends.facebook)
                            ) && (
                            <span className="bg-blue-500/20 rounded p-0.5">
                              <FiFacebook className="h-3 w-3 text-blue-400" />
                            </span>
                          )}
                        {page.telegramUrl &&
                          page.trends.telegram != 0 &&
                          page.trends.telegram ===
                            Math.max(
                              ...pages.map((page) => page.trends.telegram)
                            ) && (
                            <span className="bg-cyan-500/20 rounded p-0.5">
                              <LiaTelegram className="h-3 w-3 text-cyan-400" />
                            </span>
                          )}
                        {page.instagramUrl &&
                          page.trends.instagram != 0 &&
                          page.trends.instagram ===
                            Math.max(
                              ...pages.map((page) => page.trends.instagram)
                            ) && (
                            <span className="bg-pink-500/20 rounded p-0.5">
                              <FiInstagram className="h-3 w-3 text-pink-400" />
                            </span>
                          )}
                      </div>
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  {page.facebookUrl ? (
                    <div className="flex flex-col items-center justify-center gap-2">
                      <span className="text-white">
                        {page.followers.facebook.toLocaleString()}
                      </span>
                      <Badge
                        variant={
                          page.trends.facebook >= 0 ? "default" : "destructive"
                        }
                      >
                        {Math.abs(page.trends.facebook).toLocaleString()}
                      </Badge>
                    </div>
                  ) : (
                    "-"
                  )}
                </TableCell>
                <TableCell>
                  {page.telegramUrl ? (
                    <div className="flex flex-col items-center justify-center gap-2">
                      <span className="text-white">
                        {page.followers.telegram.toLocaleString()}
                      </span>
                      <Badge
                        variant={
                          page.trends.telegram >= 0 ? "default" : "destructive"
                        }
                      >
                        {Math.abs(page.trends.telegram).toLocaleString()}
                      </Badge>
                    </div>
                  ) : (
                    "-"
                  )}
                </TableCell>
                <TableCell>
                  {page.instagramUrl ? (
                    <div className="flex flex-col items-center justify-center gap-2">
                      <span className="text-white">
                        {page.followers.instagram.toLocaleString()}
                      </span>

                      <Badge
                        variant={
                          page.trends.instagram >= 0 ? "default" : "destructive"
                        }
                      >
                        {Math.abs(page.trends.instagram).toLocaleString()}
                      </Badge>
                    </div>
                  ) : (
                    "-"
                  )}
                </TableCell>

                <TableCell>
                  <div className="flex flex-col items-center justify-center gap-2">
                    {page.recordDate
                      ? format(page.recordDate, "dd/MM/yyyy")
                      : "-"}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
