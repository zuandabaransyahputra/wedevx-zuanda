import { cn } from "@/lib/utils";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import React, { forwardRef, useState } from "react";

const PasswordInput = forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => {
  const [isOpenEye, setIsOpenEye] = useState(false);
  const [isFocus, setIsFocus] = useState(false);

  return (
    <div
      onFocus={() => setIsFocus(true)}
      onBlur={() => setIsFocus(false)}
      className={cn(
        "flex h-14 w-full items-center justify-between gap-2 rounded-[12px] border bg-transparent px-3",
        isFocus ? "" : "border"
      )}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M17.0174 10.1715V7.0174C17.0174 4.24637 14.7711 2 12.0001 2V2C9.22903 2 6.98267 4.24636 6.98267 7.01739V10.1715"
          stroke="#0A0D12"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M17.8797 10.2275H6.12036C5.01579 10.2275 4.12036 11.123 4.12036 12.2275V19.9999C4.12036 21.1045 5.01579 21.9999 6.12036 21.9999H17.8797C18.9843 21.9999 19.8797 21.1045 19.8797 19.9999V12.2275C19.8797 11.123 18.9843 10.2275 17.8797 10.2275Z"
          stroke="#0A0D12"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 16.2332C12.7563 16.2332 13.3694 15.6201 13.3694 14.8638C13.3694 14.1075 12.7563 13.4944 12 13.4944C11.2437 13.4944 10.6306 14.1075 10.6306 14.8638C10.6306 15.6201 11.2437 16.2332 12 16.2332Z"
          fill="#0A0D12"
        />
        <path
          d="M12 15.7506V17.9731"
          stroke="#0A0D12"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <input
        type={isOpenEye ? "text" : "password"}
        className={cn(
          "focus-visible:ring-none flex h-full w-full bg-transparent text-sm text-black transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
      <button
        tabIndex={1}
        type="button"
        className="rounded-full bg-white"
        onClick={() => setIsOpenEye((prev) => !prev)}
      >
        {isOpenEye ? (
          <EyeIcon size={20} className="text-[#7F7D83]" />
        ) : (
          <EyeOffIcon size={20} className="text-[#7F7D83]" />
        )}
      </button>
    </div>
  );
});

PasswordInput.displayName = "PasswordInput";

export { PasswordInput };
