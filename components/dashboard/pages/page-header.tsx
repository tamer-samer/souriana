"use client";

import { createStatsAction } from "@/actions/stats/create-stat";
import { PageTitle, AddButton } from "@/components/common";
import { StatsForm } from "@/components/forms/stats-form";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { ActivePlatforms } from "@/types";
import { ArrowRight } from "lucide-react";
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
          <div className="w-10 h-10 md:w-16 md:h-16 bg-slate-800 rounded-lg  items-center justify-center overflow-hidden">
            <Image
              src={imageUrl || "/placeholder.svg"}
              alt={name}
              width={40}
              height={40}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <PageTitle title={name} />
          </div>
        </div>
      </div>

      <Modal
        trigger={<AddButton title="إحصائية" />}
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
