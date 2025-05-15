import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <main className="h-screen max-w-lg mx-auto w-full flex items-center justify-center flex-col gap-10">
      <div className="flex flex-col gap-3">
        <h1 className="text-4xl text-center">Thank You</h1>
        <p className="font-light text-center">
          Your information was submitted to our team of immigration attorneys.
          Expect an email from hello@tryalma.ai
        </p>
      </div>
      <Link href={"/"}>
        <Button>Go Back To Homepage</Button>
      </Link>
    </main>
  );
};

export default page;
