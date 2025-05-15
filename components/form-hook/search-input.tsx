"use client";
import { useState, useEffect } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { FormField, FormItem, FormControl, FormMessage, FormLabel } from "../ui/form";

const DEBOUNCE_DELAY = 400;

const SearchInput = ({
  label,
  placeholder,
  name,
  className,
  classNameWrapper,
  classNameLabel,
  disabled = false,
}: {
  label?: string;
  placeholder?: string;
  name: string; // name of the hidden field in the form
  className?: string;
  classNameWrapper?: string;
  classNameLabel?: string;
  disabled?: boolean;
}) => {
  const form = useFormContext();
  const { setValue } = form;
  const [inputValue, setInputValue] = useState("");
  const [results, setResults] = useState([]);
  // const [selected, setSelected] = useState('')
  const selected = useWatch({ name, control: form.control });

  // Debounce input
  useEffect(() => {
    const handler = setTimeout(() => {
      // Call your API here
      const fetchData = async () => {
        try {
          const response = await fetch(`/api/search-education-service?q=${inputValue}`);
          const data = await response.json();
          console.log("API result:", data.results);

          setResults(data.results);
        } catch (error) {
          console.error("API error:", error);
        }
      };

      fetchData();
    }, DEBOUNCE_DELAY);

    return () => clearTimeout(handler);
  }, [inputValue]);

  // Simulate selection from suggestions
  const handleSelect = (selectedEducationService: string) => {
    setResults([]);
    setValue(name, selectedEducationService); // Store in hidden field
  };

  const handleChange = () => {
    setInputValue("");
    setValue(name, "");
    return false;
  };

  return (
    <div className={cn("flex flex-col gap-2 w-full", classNameWrapper)}>
      {label && (
        <FormLabel className={cn("font-medium text-sm text-gray-500", classNameLabel)}>
          {label}
        </FormLabel>
      )}

      {!selected && (
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={placeholder}
          autoComplete="off"
          className={cn("w-full", className)}
          disabled={disabled}
        />
      )}

      {/* Display selected value as text */}
      {selected && (
        <div className="mt-2 text-sm text-gray-700">
          <p className="ml-4">
            <strong>{selected}</strong>
            <button
              type="button"
              className="rounded-full border-1 border-primary bg-primary px-4 py-2 mx-2 text-white"
              onClick={handleChange}
            >
              Change
            </button>
          </p>
        </div>
      )}

      {results.length > 0 && (
        <div className="m-2">
          {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            results.map((result: any, idx) => (
              <div
                key={idx}
                className="cursor-pointer px-3 py-2 hover:bg-gray-100 text-sm"
                onClick={() => handleSelect(result.school_name)}
              >
                {result.school_name}
              </div>
            ))
          }
        </div>
      )}

      {/* Hidden field that ties into react-hook-form */}
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem className="hidden">
            <FormControl>
              <input type="hidden" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default SearchInput;
