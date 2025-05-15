import { users } from "@/constants/user";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  const user = users.find((u) => u.email === email && u.password === password);
  if (!user) {
    return NextResponse.json(
      { error: "Invalid email or password" },
      { status: 401 }
    );
  }

  const token = `mock-token-${Date.now()}`;

  const response = NextResponse.json(
    { message: "Login successful", user },
    { status: 200 }
  );

  response.cookies.set("token", token, {
    httpOnly: true,
    path: "/",
  });

  return response;
}
