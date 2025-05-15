/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { useFormContext } from "react-hook-form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { cn } from "@/lib/utils";

const SelectWithForm = ({
  options,
  label,
  name,
  placeholder,
  classNameWrapper,
  className,
  classNameLabel,
  disabled,
  customOnChange,
}: {
  options: {
    key: string;
    label: string;
  }[];
  label?: string;
  name: string;
  placeholder?: string;
  classNameWrapper?: string;
  className?: string;
  classNameLabel?: string;
  disabled?: boolean;
  customOnChange?: (e: any) => void;
}) => {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("flex flex-col gap-2 text-accent w-full", classNameWrapper)}>
          {label && (
            <FormLabel className={cn("w-fit font-medium", classNameLabel)}>{label}</FormLabel>
          )}
          <Select
            onValueChange={customOnChange ? customOnChange : field.onChange}
            value={field.value}
          >
            <FormControl>
              <SelectTrigger disabled={disabled} className={cn("w-full", className)}>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options?.map((item) => (
                <SelectItem key={item.key} value={item.key}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default SelectWithForm;
