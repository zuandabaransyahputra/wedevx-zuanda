import { z } from "zod";

export const leadFormSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  email: z.string().min(1, "Email is required").email("Invalid email"),
  country: z.string().min(1, "Country is required"),
  linkedIn_profile: z.string().min(1, "LinkedIn profile is required"),
  visas: z
    .array(z.string().min(1))
    .min(1, "Please select at least one visa category"),
  cv: z.any().refine((file) => file instanceof File, {
    message: "CV is required",
  }),
  additional_information: z
    .string()
    .min(1, "Please provide additional information"),
});

export type LeadFormSchema = z.infer<typeof leadFormSchema>;
