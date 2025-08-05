"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight } from "lucide-react";

import { createCampaignAction } from "@/actions/campaign/create-campaign";
import { AddButton } from "@/components/common";
import { CampaignForm } from "@/components/forms/campaign-form";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";

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
          <div className="w-10 h-10 md:w-16 md:h-16 bg-slate-800 rounded-lg flex items-center justify-center overflow-hidden">
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
        trigger={<AddButton title="حملة" />}
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
