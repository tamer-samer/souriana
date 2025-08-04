"use client";
import { Dispatch, SetStateAction, useMemo, useRef, useState } from "react";
import { ControllerRenderProps } from "react-hook-form";
import { TTransactionsForm } from "@/validations/transactions.schema";
import { clients } from "@/db/schema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { FormControl } from "@/components/ui/form";
import { PlusCircle, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  clients: (typeof clients.$inferSelect)[];
  field: ControllerRenderProps<TTransactionsForm, "clientId">;
  setIsNewClient: Dispatch<SetStateAction<boolean>>;
  handleResetField: (name: "clientId") => void;
};

export function TransactionsClientsSelect({
  clients,
  field,
  setIsNewClient,
  handleResetField,
}: Props) {
  const [clientSearch, setClientSearch] = useState("");
  // const [isSelectOpen, setIsSelectOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const filteredClients = useMemo(() => {
    if (!clientSearch) return clients;
    return clients.filter((client) =>
      client.name.toLowerCase().includes(clientSearch.toLowerCase())
    );
  }, [clientSearch]);

  const handleSelectOpenChange = (open: boolean) => {
    // setIsSelectOpen(open);
    if (!open) {
      setClientSearch("");
    }
  };
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    setClientSearch(e.target.value);
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.stopPropagation();
  };

  const handleSearchClick = (e: React.MouseEvent<HTMLInputElement>) => {
    e.stopPropagation();
  };

  return (
    <div>
      <Select
        onValueChange={(value) => {
          const numValue = Number(value);
          field.onChange(numValue);
        }}
        value={field.value ? field.value?.toString() : undefined}
        onOpenChange={handleSelectOpenChange}
      >
        <FormControl>
          <SelectTrigger className="bg-slate-800 border-slate-700 text-white transition-colors duration-200 hover:border-slate-600 focus:border-teal-500">
            <SelectValue placeholder="اختر معلناً" />
          </SelectTrigger>
        </FormControl>

        <SelectContent className="bg-slate-800 border-slate-700">
          <div className="sticky top-0 p-2 border-b border-slate-700 bg-slate-800">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                ref={searchInputRef}
                placeholder="بحث..."
                value={clientSearch}
                onChange={handleSearchChange}
                onKeyDown={handleSearchKeyDown}
                onClick={handleSearchClick}
                className="bg-slate-900 border-slate-600 text-white placeholder:text-slate-400 h-8 pl-10"
                autoComplete="off"
                id="search"
              />
            </div>
          </div>
          <div className="max-h-48 overflow-y-auto">
            {filteredClients.length === 0 ? (
              <div className="p-3 text-center text-slate-400 text-sm">
                لا يوجد معلنين
              </div>
            ) : (
              filteredClients.map((client) => (
                <SelectItem
                  key={client.id}
                  value={client.id.toString()}
                  className="cursor-pointer"
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="flex flex-col items-start">
                      <span className="font-medium">{client.name}</span>
                    </div>
                  </div>
                </SelectItem>
              ))
            )}
          </div>
        </SelectContent>
      </Select>
      <Button
        variant="link"
        className="p-0 h-auto text-teal-400 mt-3"
        onClick={() => {
          handleResetField("clientId");
          setIsNewClient(true);
        }}
      >
        <PlusCircle className="h-4 w-4" />
        قم بإضافة جهة جديدة
      </Button>
    </div>
  );
}
