"use client";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StatRow } from "./stat-row";

import { ActivePlatforms, FollowerRecordSelect } from "@/types";

type Props = {
  stats: FollowerRecordSelect[];
  activePlatforms: ActivePlatforms;
};

export function StatsTable({ stats, activePlatforms }: Props) {
  return (
    <Card className="bg-secondary/50 border-accent">
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="border-accent hover:bg-accent/50">
              <TableHead className="text-slate-300">التاريخ</TableHead>
              {activePlatforms.hasFacebook && (
                <TableHead className="text-slate-300">فيسبوك</TableHead>
              )}
              {activePlatforms.hasTelegram && (
                <TableHead className="text-slate-300">تلغرام</TableHead>
              )}
              {activePlatforms.hasInstagram && (
                <TableHead className="text-slate-300">انستغرام</TableHead>
              )}

              <TableHead className="text-slate-300">الاجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {stats.map((stat) => {
              return (
                <StatRow
                  key={stat.id}
                  stat={stat}
                  activePlatforms={activePlatforms}
                />
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
