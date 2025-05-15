import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";
import { ReactElement } from "react";
import { InputGroup } from "../ui/input-group";

const InputGroupWithForm = ({
  name,
  label,
  className,
  classNameWrapper,
  placeholder,
  icons,
  isStart,
  isCurrency = false,
  classNameLabel,
  type,
}: {
  name: string;
  label?: string;
  type?: string;
  className?: string;
  classNameWrapper?: string;
  placeholder?: string;
  icons: ReactElement<{ className?: string }>;
  isStart?: boolean;
  isCurrency?: boolean;
  classNameLabel?: string;
}) => {
  const form = useFormContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (isCurrency && value) {
      value = new Intl.NumberFormat("en-US").format(parseInt(value, 10));
    }
    form.setValue(name, value);
  };

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem
          className={cn("flex flex-col gap-2 text-black", classNameWrapper)}
        >
          {label && (
            <FormLabel className={cn("font-medium text-sm", classNameLabel)}>
              {label}
            </FormLabel>
          )}
          <FormControl className={cn("w-full", className)}>
            <InputGroup
              {...field}
              autoComplete="off"
              placeholder={placeholder}
              icons={icons}
              isStart={isStart}
              onChange={isCurrency ? handleChange : field.onChange}
              type={type}
              value={field.value || ""}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default InputGroupWithForm;
