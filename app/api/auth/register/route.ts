import { users } from "@/constants/user";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  const existingUser = users.find((u) => u.email === email);
  if (existingUser) {
    return NextResponse.json(
      { error: "Email is already in use" },
      { status: 400 }
    );
  }

  users.push({ email, password });

  return NextResponse.json(
    { message: "User registered successfully" },
    { status: 201 }
  );
}
