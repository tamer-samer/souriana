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

import { Platform, Social, TrackedProfileSelect } from "@/types";

type Props = {
  pages: {
    id: number;
    name: string;
    currentStat: number | null;
    trend: number;
    currentDate: Date;
  }[];
  platformName: Platform;
};

export function StatsComparison({ pages, platformName }: Props) {
  return (
    <Card className="bg-secondary/50 border-accent w-full max-w-[550px] mx-auto py-5 gap-1">
      <CardHeader>
        <CardTitle className="text-white text-center">
          {platformName.toUpperCase()}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="border-accent hover:bg-accent/50">
              <TableHead className="text-slate-300">الصفحة</TableHead>
              <TableHead className="text-slate-300">المتابعين</TableHead>
              <TableHead className="text-slate-300">الفرق</TableHead>
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
                  <div className="font-medium text-xs md:text-sm">
                    <span
                      className={
                        Math.max(...pages.map((page) => page.trend)) ===
                        page.trend
                          ? "text-green-500"
                          : ""
                      }
                    >
                      {page.name}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  {page.currentStat ? (
                    <div className="flex flex-col items-center justify-center gap-2">
                      <span className="text-white">
                        {page.currentStat.toLocaleString()}
                      </span>
                    </div>
                  ) : (
                    "-"
                  )}
                </TableCell>

                <TableCell>
                  {page.trend ? (
                    <div className="flex flex-col items-center justify-center gap-2">
                      <span
                        className={
                          page.trend > 0
                            ? "text-green-500"
                            : page.trend < 0
                            ? "text-red-500"
                            : "text-white"
                        }
                      >
                        {page.trend.toLocaleString()}
                      </span>
                    </div>
                  ) : (
                    "-"
                  )}
                </TableCell>

                <TableCell>
                  <div className="flex flex-col items-center justify-center gap-2 text-xs md:text-sm">
                    {page.currentDate
                      ? format(page.currentDate, "dd/MM/yyyy")
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
