"use client";

import type React from "react";

import { Dispatch, SetStateAction, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Delete, Info, Pen, Plus } from "lucide-react";

interface Props {
  children: React.ReactNode;
  trigger: React.ReactNode;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export function Modal({
  children,
  trigger,

  open = false,
  setOpen,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="bg-secondary border-accent text-white w-[90%] max-w-[550px] mx-auto max-h-[90vh] overflow-y-auto pt-10">
        {/* <DialogHeader className="border-b border-accent p-4 pr-0">
          <div className="flex items-center justify-center w-full pb-2">
            <DialogTitle>
              <IconComponent />
            </DialogTitle>
          </div>
        </DialogHeader> */}
        {children}
      </DialogContent>
    </Dialog>
  );
}
