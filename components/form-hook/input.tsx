"use client";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Input } from "../ui/input";

const InputWithForm = ({
  name,
  label,
  type = "text",
  className,
  classNameWrapper,
  placeholder,
  isCurrency = false,
  disabled = false,
  classNameLabel,
  readOnly,
  isPhone = false,
}: {
  name: string;
  label?: string;
  type?: string;
  className?: string;
  classNameWrapper?: string;
  placeholder?: string;
  isCurrency?: boolean;
  disabled?: boolean;
  classNameLabel?: string;
  readOnly?: boolean;
  isPhone?: boolean;
}) => {
  const form = useFormContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (isPhone) {
      value = value.replace(/[^0-9-]/g, "");
      const parts = value.split("-").map((part) => part.replace(/\D/g, ""));
      value = parts.join("-");
    }
    if (isCurrency && value) {
      value = new Intl.NumberFormat("en-US").format(parseInt(value, 10));
    }
    form.setValue(name, isPhone ? value : value);
  };

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem
          className={cn(
            "flex flex-col gap-2 text-black w-full",
            classNameWrapper
          )}
        >
          {label && (
            <FormLabel className={cn("font-medium text-sm", classNameLabel)}>
              {label}
            </FormLabel>
          )}
          <FormControl className={cn("w-full", className)}>
            <Input
              type={type}
              {...field}
              value={field.value || ""}
              autoComplete="off"
              placeholder={placeholder}
              onChange={isCurrency || isPhone ? handleChange : field.onChange}
              disabled={disabled}
              readOnly={readOnly}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default InputWithForm;
