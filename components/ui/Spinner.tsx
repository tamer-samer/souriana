import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";

type Props = {
  className?: string;
};
export default function Spinner({ className }: Props) {
  return (
    <Loader
      className={cn(
        "animate-spin h-5 w-5 text-muted-foreground dark:text-white",
        className
      )}
    />
  );
}
