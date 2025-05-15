import { cn } from "@/lib/utils";
import React, { forwardRef } from "react";

export type InputGroupProps = React.InputHTMLAttributes<HTMLInputElement> & {
  icons: React.ReactElement<{ className?: string }>;
  classNameWrapper?: string;
  isStart?: boolean;
};

const InputGroup = forwardRef<HTMLInputElement, InputGroupProps>(
  ({ isStart = true, icons, className, classNameWrapper, ...props }, ref) => {
    const iconElement = React.cloneElement(icons, {
      className: cn(icons.props.className),
    });

    return (
      <div
        className={cn(
          "flex h-14 items-center justify-between gap-2 rounded-[12px] border bg-white px-3",
          classNameWrapper
        )}
      >
        {isStart && iconElement}
        <input
          className={cn(
            "focus-visible:ring-none w-full flex h-full rounded-md bg-white text-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}
        />
        {!isStart && iconElement}
      </div>
    );
  }
);

InputGroup.displayName = "InputGroup";

export { InputGroup };
