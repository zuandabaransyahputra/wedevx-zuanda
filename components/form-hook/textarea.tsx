"use client";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Textarea } from "../ui/textarea";

const TextareaWithForm = ({
  name,
  label,
  className,
  classNameWrapper,
  placeholder,
  classNameTextArea,
  rows,
  disabled,
}: {
  name: string;
  label?: string;
  type?: string;
  className?: string;
  classNameWrapper?: string;
  placeholder?: string;
  classNameTextArea?: string;
  rows?: number;
  disabled?: boolean;
}) => {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("flex flex-col gap-1 text-black", classNameWrapper)}>
          {label && <FormLabel className="font-medium">{label}</FormLabel>}
          <FormControl className={cn("w-full", className)}>
            <Textarea
              {...field}
              className={cn(
                "h-[200px] w-full rounded-[8px] border border-black p-[10px]",
                classNameTextArea,
              )}
              placeholder={placeholder}
              rows={rows}
              disabled={disabled}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default TextareaWithForm;
