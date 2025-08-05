import { clsx, type ClassValue } from "clsx";
import { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type Params<T> = {
  startTransition: (callback: () => void) => void;
  setOpenDeleteModal: Dispatch<SetStateAction<boolean>>;
  deleteAction: (values: T) => Promise<{ success: boolean; message: string }>;
  data: T;
};

export function handleDelete<T>({
  startTransition,
  setOpenDeleteModal,
  deleteAction,
  data,
}: Params<T>) {
  startTransition(async () => {
    await deleteAction(data).then((res) => {
      if (res.success) {
        toast(res.message);
        setOpenDeleteModal(false);
      } else {
        toast.error(res.message);
      }
    });
  });
}
