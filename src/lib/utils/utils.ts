import clsx from "clsx"; // Correct import
import { twMerge } from "tailwind-merge";
import type { ClassValue } from "clsx";

// Utility function to combine class names and resolve conflicts
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(...inputs));
}
