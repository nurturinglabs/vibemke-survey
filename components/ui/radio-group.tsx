"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface RadioGroupContextValue {
  value: string;
  onValueChange: (value: string) => void;
}

const RadioGroupContext = React.createContext<RadioGroupContextValue>({
  value: "",
  onValueChange: () => {},
});

interface RadioGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string;
  onValueChange?: (value: string) => void;
}

const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ className, value = "", onValueChange = () => {}, children, ...props }, ref) => (
    <RadioGroupContext.Provider value={{ value, onValueChange }}>
      <div
        ref={ref}
        className={cn("grid gap-2", className)}
        role="radiogroup"
        {...props}
      >
        {children}
      </div>
    </RadioGroupContext.Provider>
  )
);
RadioGroup.displayName = "RadioGroup";

interface RadioGroupItemProps extends React.HTMLAttributes<HTMLButtonElement> {
  value: string;
}

const RadioGroupItem = React.forwardRef<HTMLButtonElement, RadioGroupItemProps>(
  ({ className, value, ...props }, ref) => {
    const context = React.useContext(RadioGroupContext);
    const checked = context.value === value;

    return (
      <button
        ref={ref}
        type="button"
        role="radio"
        aria-checked={checked}
        onClick={() => context.onValueChange(value)}
        className={cn(
          "aspect-square h-4 w-4 rounded-full border border-[#C4613A] text-[#E8A838] ring-offset-[#1A1714] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C4613A] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      >
        {checked && (
          <div className="flex items-center justify-center">
            <div className="h-2.5 w-2.5 rounded-full bg-current" />
          </div>
        )}
      </button>
    );
  }
);
RadioGroupItem.displayName = "RadioGroupItem";

export { RadioGroup, RadioGroupItem };
