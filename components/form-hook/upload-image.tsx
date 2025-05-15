import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { CloudUploadIcon } from "lucide-react";

const UploadImageWithForm = ({
  name,
  label,
  className,
  classNameWrapper,
}: {
  name: string;
  label?: string;
  className?: string;
  classNameWrapper?: string;
}) => {
  const form = useFormContext();
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileSelect = (file: File | undefined, onChange: (file: File) => void) => {
    if (file) {
      setPreview(URL.createObjectURL(file));
      onChange(file);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    onChange: (file: File) => void,
  ) => {
    const file = e.target.files?.[0];
    handleFileSelect(file, onChange);
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>, onChange: (file: File) => void) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    handleFileSelect(file, onChange);
  };

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field: { onChange, ...rest } }) => (
        <FormItem className={cn("flex flex-col gap-2", classNameWrapper)}>
          {label && <FormLabel className="font-medium text-black">{label}</FormLabel>}
          <FormControl className={cn("w-full", className)}>
            <label
              className={cn(
                "flex cursor-pointer flex-col items-center justify-center gap-2 rounded-md border p-3 transition",
                isDragging ? "border-blue-500 bg-blue-100" : "border-black",
              )}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(e) => handleDrop(e, onChange)}
            >
              {preview ? (
                <img
                  src={preview}
                  alt="Selected image"
                  width={100}
                  height={100}
                  className="rounded-md object-cover"
                />
              ) : (
                <>
                  <CloudUploadIcon />
                  <p className="text-center">
                    画像をドラッグ＆ドロップ <br /> またはクリックして選択
                  </p>
                  <div className="rounded-md bg-gray-200 px-4 py-2 text-sm">ファイルを選択</div>
                </>
              )}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleInputChange(e, onChange)}
                {...rest}
              />
            </label>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default UploadImageWithForm;
