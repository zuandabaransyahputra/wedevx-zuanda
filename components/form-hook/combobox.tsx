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
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Check, ChevronDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { useState } from "react";

const ComboboxWithForm = ({
  options,
  label,
  name,
  placeholder,
  classNameWrapper,
  className,
  classNameLabel,
  classNameInput,
  isMultiple = false,
}: {
  options: {
    value: string;
    label: string;
  }[];
  label?: string;
  name: string;
  placeholder?: string;
  classNameWrapper?: string;
  className?: string;
  classNameLabel?: string;
  classNameInput?: string;
  isMultiple?: boolean;
}) => {
  const form = useFormContext();
  const [open, setOpen] = useState(false);

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => {
        const selected = isMultiple ? field.value || [] : field.value;

        const isSelected = (key: string) =>
          isMultiple
            ? Array.isArray(selected) && selected.includes(key)
            : selected === key;

        const toggleOption = (key: string) => {
          if (isMultiple) {
            const current: string[] = Array.isArray(selected)
              ? [...selected]
              : [];
            const exists = current.includes(key);
            const newValue = exists
              ? current.filter((item) => item !== key)
              : [...current, key];

            form.setValue(name, newValue);
            form.trigger(name);
          } else {
            form.setValue(name, key);
            form.trigger(name);
            setOpen(false);
          }
        };

        const displayLabel = () => {
          if (!selected || (Array.isArray(selected) && selected.length === 0)) {
            return placeholder;
          }

          if (isMultiple && Array.isArray(selected)) {
            return selected
              .map((key) => options.find((o) => o.value === key)?.label)
              .filter(Boolean)
              .join(", ");
          }

          return (
            options.find((o) => o.value === selected)?.label || placeholder
          );
        };

        return (
          <FormItem
            className={cn(
              "flex flex-col gap-2 text-black w-full",
              classNameWrapper
            )}
          >
            {label && (
              <FormLabel className={cn("w-fit font-medium", classNameLabel)}>
                {label}
              </FormLabel>
            )}
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant="outline"
                    role="combobox"
                    className={cn(
                      "h-10 w-full border hover:bg-transparent rounded-lg flex items-center justify-between",
                      className
                    )}
                    onClick={() => setOpen(true)}
                  >
                    <p
                      className={cn(
                        "font-normal text-sm text-left truncate",
                        !selected ||
                          (Array.isArray(selected) && selected.length === 0)
                          ? "text-muted-foreground"
                          : "text-black"
                      )}
                    >
                      {displayLabel()}
                    </p>
                    <ChevronDown className="text-black" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className={cn(classNameInput)}>
                <Command>
                  <CommandInput
                    placeholder={placeholder}
                    className="h-9 placeholder:text-muted-foreground text-muted-foreground text-sm"
                  />
                  <CommandList>
                    <CommandEmpty>Data not found</CommandEmpty>
                    <CommandGroup>
                      {options.map((option) => (
                        <CommandItem
                          value={option.label}
                          key={option.value}
                          onSelect={() => toggleOption(option.value)}
                        >
                          {option.label}
                          <Check
                            className={cn(
                              "ml-auto",
                              isSelected(option.value)
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};

export default ComboboxWithForm;
