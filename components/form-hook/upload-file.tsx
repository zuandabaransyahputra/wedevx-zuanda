import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { CloudUploadIcon } from "lucide-react";

const UploadFileWithForm = ({
  name,
  label,
  className,
  classNameWrapper,
  accept,
}: {
  name: string;
  label?: string;
  className?: string;
  classNameWrapper?: string;
  accept?: string;
}) => {
  const form = useFormContext();
  const [fileName, setFileName] = useState<string | null>(null);

  useEffect(() => {
    const subscription = form.watch((value) => {
      if (!value[name]) {
        setFileName(null);
      }
    });
    return () => subscription.unsubscribe();
  }, [form, name]);

  const handleFileSelect = (
    file: File | undefined,
    onChange: (file: File) => void
  ) => {
    if (file) {
      setFileName(file.name);
      onChange(file);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    onChange: (file: File) => void
  ) => {
    const file = e.target.files?.[0];
    handleFileSelect(file, onChange);
  };

  const handleDrop = (
    e: React.DragEvent<HTMLLabelElement>,
    onChange: (file: File) => void
  ) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    handleFileSelect(file, onChange);
  };

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field: { onChange } }) => (
        <FormItem className={cn("flex flex-col gap-2", classNameWrapper)}>
          {label && (
            <FormLabel className="font-medium text-black">{label}</FormLabel>
          )}
          <FormControl className={cn("w-full", className)}>
            <label
              onDragOver={(e) => {
                e.preventDefault();
              }}
              onDrop={(e) => handleDrop(e, onChange)}
              className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-md border border-black p-3"
            >
              {fileName ? (
                <span>{fileName}</span>
              ) : (
                <>
                  <CloudUploadIcon />
                  <p className="text-center">
                    Drop the file here <br />
                    or
                  </p>
                  <div className="inline-flex h-10 items-center justify-center whitespace-nowrap rounded-md border border-black bg-white px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-gray-950 hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
                    Choose File
                  </div>
                </>
              )}
              <input
                type="file"
                accept={accept}
                className="hidden"
                onChange={(e) => handleInputChange(e, onChange)}
                name={name}
              />
            </label>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default UploadFileWithForm;
