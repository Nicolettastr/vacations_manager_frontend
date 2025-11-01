import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = (fechaStr?: string) => {
  if (!fechaStr) return new Date();
  const [year, month, day] = fechaStr.split(/[-/]/).map(Number);
  return new Date(year, month - 1, day, 12, 0, 0);
};
