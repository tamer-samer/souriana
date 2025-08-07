"use client";

import { PageTitle } from "@/components/common";
import { Button } from "@/components/ui/button";
import { ActivePlatforms } from "@/types";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type Props = {
  imageUrl: string | null;
  name: string;
};
export function PageHeader({ imageUrl, name }: Props) {
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
    </div>
  );
}
