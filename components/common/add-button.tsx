import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";

export function AddButton({ title }: { title: string }) {
  const isMobile = useIsMobile();

  return (
    <Button size={isMobile ? "icon" : "default"} className="gap-2">
      <Plus className="h-4 w-4" />
      <span className="hidden lg:block">إضافة {title}</span>
    </Button>
  );
}
