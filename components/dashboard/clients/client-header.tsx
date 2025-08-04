"use client";

import { createCampaignAction } from "@/actions/campaign/create-campaign";
import { CampaignForm } from "@/components/forms/campaign-form";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { ArrowRight, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type Props = {
  imageUrl: string | null;
  name: string;
  clientId: number;
};
export function ClientHeader({ imageUrl, name, clientId }: Props) {
  const [openCreateModal, setOpenCreateModal] = useState(false);

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <Link href="/clients">
          <Button variant="ghost" size="icon">
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>

        <div className="flex items-center space-x-3">
          <div className="w-16 h-16 bg-slate-800 rounded-lg flex items-center justify-center overflow-hidden">
            <Image
              src={imageUrl || "/placeholder.svg"}
              alt={name}
              width={20}
              height={20}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h1 className="text-base md:text-2xl font-bold text-white">
              {name}
            </h1>
          </div>
        </div>
      </div>

      <Modal
        trigger={
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            إضافة حملة
          </Button>
        }
        open={openCreateModal}
        setOpen={setOpenCreateModal}
      >
        <CampaignForm
          buttonLabel="إضافة"
          clientId={clientId}
          setOpenModal={setOpenCreateModal}
          onSubmit={createCampaignAction}
        />
      </Modal>
    </div>
  );
}
