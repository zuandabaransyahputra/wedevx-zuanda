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

const CheckboxGroupWithForm = ({
  name,
  label,
  options,
  classNameWrapper,
  classNameLabel,
}: {
  name: string;
  label?: string;
  options: {
    value: string;
    label: string;
  }[];
  classNameWrapper?: string;
  classNameLabel?: string;
}) => {
  const form = useFormContext();

  return (
    <FormField
      name={name}
      control={form.control}
      render={({ field }) => {
        const selectedValues: string[] = field.value || [];

        const handleChange = (checked: boolean, value: string) => {
          const newValue = checked
            ? [...selectedValues, value]
            : selectedValues.filter((v) => v !== value);

          form.setValue(name, newValue);
          form.trigger(name);
        };

        return (
          <FormItem className={cn("flex flex-col gap-2", classNameWrapper)}>
            {label && (
              <FormLabel className={cn("font-medium", classNameLabel)}>
                {label}
              </FormLabel>
            )}
            <FormControl>
              <div className="flex flex-col gap-2">
                {options.map((option) => (
                  <label
                    key={option.value}
                    className="flex items-center gap-2 text-sm"
                  >
                    <input
                      type="checkbox"
                      value={option.value}
                      checked={selectedValues.includes(option.value)}
                      onChange={(e) =>
                        handleChange(e.target.checked, option.value)
                      }
                      className="accent-black h-4 w-4"
                    />
                    <span>{option.label}</span>
                  </label>
                ))}
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};

export default CheckboxGroupWithForm;
