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

export const getInitials = (name: string | undefined | null) => {
  if (!name) return "";
  const nameCharacters = name.trim().split(" ");
  return nameCharacters[0].charAt(0).toUpperCase();
};
