import React, { Dispatch, SetStateAction } from "react";
import { format } from "date-fns";
import { Button } from "./button";
import { Calendar } from "./calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  value: Date | undefined | null;
  setValue: Dispatch<SetStateAction<Date | undefined>>;
  className?: string;
};

export function DatePicker({ value, setValue, className }: Props) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"secondaryOutline"}
          className={cn(
            "w-[240px] pl-3 text-left font-normal",
            value && "text-muted-foreground",
            className
          )}
        >
          {value ? format(value, "PPP") : <span>التاريخ</span>}
          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={value ?? undefined}
          onSelect={setValue}
          // disabled={(date) =>
          //   date > new Date() || date < new Date("1900-01-01")
          // }
          captionLayout="dropdown"
        />
      </PopoverContent>
    </Popover>
  );
}
