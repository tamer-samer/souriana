/**
 * UI component related types
 */

import { ReactNode } from "react";

export interface LayoutProps {
  children: ReactNode;
}

export interface ButtonProps {
  type?: "button" | "submit" | "reset";
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
  children: ReactNode;
  disabled?: boolean;
  isLoading?: boolean;
  onClick?: () => void;
}

export interface InputProps {
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  className?: string;
  error?: string;
  required?: boolean;
}

export interface SelectOption {
  label: string;
  value: string | number;
}

export interface SelectProps {
  options: SelectOption[];
  value?: string | number;
  onChange?: (value: string | number) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  error?: string;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode;
}

export interface CardProps {
  title?: string;
  description?: string;
  className?: string;
  children: ReactNode;
}

export interface TableColumn<T> {
  header: string;
  accessorKey: keyof T;
  cell?: (info: { row: { original: T } }) => ReactNode;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export interface ToastProps {
  title: string;
  description?: string;
  type?: "default" | "success" | "error" | "warning";
}
