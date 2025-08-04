import { Dispatch, SetStateAction, useState } from "react";
import { Check, ChevronsUpDown, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { clients } from "@/db/schema";
import { ControllerRenderProps } from "react-hook-form";
import { TTransactionsForm } from "@/validations/transactions.schema";
import { FormControl } from "@/components/ui/form";

type Props = {
  clients: (typeof clients.$inferSelect)[];
  field: ControllerRenderProps<TTransactionsForm, "clientId">;
  setIsNewClient: Dispatch<SetStateAction<boolean>>;
  handleResetField: (name: "newClient" | "clientId") => void;
};
export function TransactionsClientsSelect({
  clients,
  field,
  setIsNewClient,
  handleResetField,
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <FormControl>
        <PopoverTrigger asChild>
          <Button
            variant="secondaryOutline"
            role="combobox"
            aria-expanded={open}
            className="justify-between"
          >
            {field.value
              ? clients.find((client) => client.id === field.value)?.name
              : "اختر معلن..."}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
      </FormControl>
      <PopoverContent className="w-[200px] p-0 overflow-hidden">
        <Command value={field.value?.toString() || ""}>
          <CommandInput placeholder="بحث..." className="h-9" />
          <CommandList>
            <CommandEmpty>لا يوجد معلنين</CommandEmpty>
            <CommandGroup>
              {clients.map((client) => (
                <CommandItem
                  key={client.id}
                  keywords={[client.name]}
                  value={client.id.toString() || undefined}
                  onSelect={(currentValue) => {
                    const isDeselecting =
                      field.value?.toString() === currentValue;

                    field.onChange(
                      isDeselecting ? undefined : Number(currentValue)
                    );
                    setOpen(false);
                  }}
                >
                  {client.name}
                  <Check
                    className={cn(
                      "ml-auto",
                      field.value === client.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
        <Button
          variant={"default"}
          className="w-full mt-2 rounded-none active:scale-100"
          onClick={() => {
            handleResetField("clientId");
            setIsNewClient(true);
          }}
        >
          إضافة جهة
        </Button>
      </PopoverContent>
    </Popover>
  );
}
