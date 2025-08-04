import { create } from "zustand";

type ModalState = {
  isOpen: boolean;
  setOpen: () => void;
  setClose: () => void;
  toggleModal: () => void;
};

export const useModal = create<ModalState>((set, get) => ({
  isOpen: false,
  setOpen: () => set({ isOpen: true }),
  setClose: () => set({ isOpen: false }),
  toggleModal: () => {
    const currentIsOpen = get().isOpen;
    if (currentIsOpen) {
      set({ isOpen: false });
    } else {
      set({ isOpen: true });
    }
  },
}));
