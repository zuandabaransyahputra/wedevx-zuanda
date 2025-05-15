"use client";
import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import PasswordInputWithForm from "@/components/form-hook/password-input";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import InputGroupWithForm from "@/components/form-hook/input-group";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, SignUpSchema } from "./schema";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";

const RegisterForm = () => {
  const form = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: SignUpSchema) => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        toast.error(result.error || "Registration failed");
        return;
      }

      toast.success("Registration successful");
      router.push("/login");
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="relative h-screen w-full flex items-center gap-20 justify-between pl-20 pr-7 py-7">
      <div className="max-w-[498px] w-full flex flex-col gap-4 p-4">
        <div className="flex flex-col gap-3">
          <h2 className="text-4xl font-extrabold">Create Account</h2>
          <p className="text-black font-semibold text-2xl">
            Please fill in the form to register
          </p>
        </div>
        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <InputGroupWithForm
              icons={
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20 4H4C2.89543 4 2 4.89543 2 6V18C2 19.1046 2.89543 20 4 20H20C21.1045 20 22 19.1046 22 18V6C22 4.89543 21.1045 4 20 4Z"
                    stroke="#0A0D12"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2 5.85603L10.8028 12.3866C11.5101 12.9114 12.4775 12.9117 13.1851 12.3873L22 5.85603"
                    stroke="#0A0D12"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              }
              name="email"
              type="email"
              label="Email"
              placeholder="Enter your email address"
            />
            <PasswordInputWithForm
              name="password"
              label="Password"
              placeholder="Enter your password"
            />
            <PasswordInputWithForm
              name="confirmPassword"
              label="Confirm Password"
              placeholder="Re-enter your password"
            />
            <Button disabled={isLoading}>
              {isLoading && <Icons.spinner className="size-6 animate-spin" />}
              Sign Up
            </Button>
            <Link href={"/login"} className="w-full">
              <Button disabled={isLoading} className="w-full">
                Sign In
              </Button>
            </Link>
          </form>
        </FormProvider>
      </div>
    </main>
  );
};

export default RegisterForm;
