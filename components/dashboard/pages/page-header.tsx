"use client";

import { createStatsAction } from "@/actions/stats/create-stat";
import { StatsForm } from "@/components/forms/stats-form";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { ActivePlatforms } from "@/types";
import { ArrowRight, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type Props = {
  imageUrl: string | null;
  name: string;
  pageId: number;
  activePlatforms: ActivePlatforms;
};
export function PageHeader({ imageUrl, name, pageId, activePlatforms }: Props) {
  const [openCreateModal, setOpenCreateModal] = useState(false);

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <Link href="/stats">
          <Button variant="ghost" size="icon">
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>

        <div className="flex items-center space-x-3">
          <div className="w-16 h-16 bg-slate-800 rounded-lg flex items-center justify-center overflow-hidden">
            <Image
              src={imageUrl || "/placeholder.svg"}
              alt={name}
              fill
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">{name}</h1>
          </div>
        </div>
      </div>

      <Modal
        trigger={
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            إضافة إحصائيات
          </Button>
        }
        open={openCreateModal}
        setOpen={setOpenCreateModal}
      >
        <StatsForm
          buttonLabel="إضافة"
          pageId={pageId}
          setOpenModal={setOpenCreateModal}
          activePlatforms={activePlatforms}
          onSubmit={createStatsAction}
        />
      </Modal>
    </div>
  );
}
