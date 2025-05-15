"use client";
import CheckboxGroupWithForm from "@/components/form-hook/checkbox";
import ComboboxWithForm from "@/components/form-hook/combobox";
import InputWithForm from "@/components/form-hook/input";
import TextareaWithForm from "@/components/form-hook/textarea";
import UploadFileWithForm from "@/components/form-hook/upload-file";
import { Button } from "@/components/ui/button";
import { COUNTRIES } from "@/constants/countries";
import { visaOptions } from "@/constants/visas";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { LeadFormSchema, leadFormSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Icons } from "@/components/ui/icons";

const LeadForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(leadFormSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      country: "",
      linkedIn_profile: "",
      visas: [],
      cv: undefined,
      additional_information: "",
    },
  });
  const router = useRouter();

  const onSubmit = async (data: LeadFormSchema) => {
    setIsLoading(true);
    const jsonBody = {
      firstName: data.first_name,
      lastName: data.last_name,
      email: data.email,
      country: COUNTRIES.find((item) => item.value === data.country)?.label,
      linkedIn: data.linkedIn_profile,
      additionalInfo: data.additional_information,
      visas: data.visas,
      resumeUrl: `/resumes/${data.cv?.name}`,
    };
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonBody),
      });
      const responseData = await res.json();
      if (!res.ok) {
        toast.error(responseData.error || "Failed to submit lead.");
        setIsLoading(false);
        return;
      }

      form.reset();
      toast.success("Submission successful!");
      router.push("/success");
    } catch {
      toast.error("Failed to submit lead.");
      setIsLoading(false);
    }
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="py-10 max-w-lg mx-auto flex flex-col gap-4 w-full px-4"
      >
        <InputWithForm
          name="first_name"
          label="First Name"
          placeholder="Please enter your first name"
        />
        <InputWithForm
          name="last_name"
          label="Last Name"
          placeholder="Please enter your last name"
        />
        <InputWithForm
          name="email"
          type="email"
          label="Email"
          placeholder="Please enter your email"
        />
        <ComboboxWithForm
          name="country"
          options={COUNTRIES}
          label="Country"
          placeholder="Please enter your country"
        />
        <InputWithForm
          name="linkedIn_profile"
          label="LinkedIn Profile"
          placeholder="Please enter your linkedIn profile"
        />
        <div className="flex flex-col gap-4">
          <h2 className="text-center text-3xl font-semibold">
            Visa categories of interest?
          </h2>
          <CheckboxGroupWithForm name="visas" options={visaOptions} />
        </div>
        <UploadFileWithForm
          name="cv"
          label="Resume/CV Upload"
          accept="application/pdf"
        />
        <div className="flex flex-col gap-4">
          <h2 className="text-center text-3xl font-semibold">
            How can we help you?
          </h2>
          <TextareaWithForm name="additional_information" rows={8} />
        </div>
        <Button disabled={isLoading}>
          {isLoading && <Icons.spinner className="size-6 animate-spin" />}
          Submit
        </Button>
      </form>
    </FormProvider>
  );
};

export default LeadForm;
