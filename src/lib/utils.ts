import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getOffset = (desktopOffset:number, mobileOffset:number): number => {
  return window.innerWidth >= 1024 ? desktopOffset : mobileOffset;
};