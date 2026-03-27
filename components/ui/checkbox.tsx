"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface CheckboxProps extends Omit<React.HTMLAttributes<HTMLButtonElement>, "onChange"> {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

const Checkbox = React.forwardRef<HTMLButtonElement, CheckboxProps>(
  ({ className, checked = false, onCheckedChange, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        role="checkbox"
        aria-checked={checked}
        onClick={() => onCheckedChange?.(!checked)}
        className={cn(
          "peer h-4 w-4 shrink-0 rounded-sm border border-[#C4613A] ring-offset-[#1A1714] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C4613A] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          checked && "bg-[#C4613A] text-[#F5EDE0]",
          className
        )}
        {...props}
      >
        {checked && (
          <div className="flex items-center justify-center text-current">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-3 w-3"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
        )}
      </button>
    );
  }
);
Checkbox.displayName = "Checkbox";

export { Checkbox };
