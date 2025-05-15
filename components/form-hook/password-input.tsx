import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";
import { PasswordInput } from "../ui/password-input";

const PasswordInputWithForm = ({
  name,
  label,
  placeholder,
  isLoading,
  classNameWrapper,
  className,
  classNameLabel,
  optionText,
  classNameOptionText,
}: {
  name: string;
  label?: string;
  placeholder?: string;
  isLoading?: boolean;
  classNameWrapper?: string;
  className?: string;
  classNameLabel?: string;
  optionText?: string;
  classNameOptionText?: string;
}) => {
  const form = useFormContext();
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem
          className={cn("flex flex-col gap-2 text-black", classNameWrapper)}
        >
          {label && (
            <div className="flex items-center justify-between">
              <FormLabel className={cn("font-medium text-sm", classNameLabel)}>
                {label}
              </FormLabel>
              {optionText && (
                <p className={cn(classNameOptionText)}>{optionText}</p>
              )}
            </div>
          )}
          <div className="flex w-full flex-col gap-1">
            <FormControl className={cn(className)}>
              <PasswordInput
                id={name}
                placeholder={placeholder}
                autoCapitalize="none"
                autoComplete="off"
                autoCorrect="off"
                disabled={!!isLoading}
                {...field}
                value={field.value || ""}
              />
            </FormControl>
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  );
};

export default PasswordInputWithForm;
