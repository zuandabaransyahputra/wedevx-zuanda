"use client";
import { FileCheck } from "lucide-react";
import Hero from "./_components/hero";
import LeadForm from "./_components/lead-form";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/stores/useUserStore";

export default function Home() {
  const { user } = useUserStore();
  return (
    <main className="flex flex-col">
      {user !== null ? (
        <Link href={"/admin"}>
          <Button className="fixed right-10 top-10">Admin Dashboard</Button>
        </Link>
      ) : (
        <Link href={"/login"}>
          <Button className="fixed right-10 top-10">Login to leads</Button>
        </Link>
      )}
      <Hero />
      <div className="flex flex-col max-w-lg mx-auto text-center mt-10 justify-center items-center gap-3 px-4">
        <FileCheck size={40} />
        <h2 className="text-2xl font-semibold">
          Want to understand your visa options?
        </h2>
        <p className="font-light">
          Submit the form below and our team of experienced attorneys will
          review your information and send a preliminary assesment of your case
          based on your goals.
        </p>
      </div>
      <LeadForm />
    </main>
  );
}
