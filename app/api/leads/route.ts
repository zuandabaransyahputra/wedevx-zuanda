import { mockLeads } from "@/constants/mock-leads";
import { Lead } from "@/type/lead";
import { NextResponse } from "next/server";

const leads: Lead[] = [...mockLeads];

export async function GET() {
  return NextResponse.json(leads);
}

export async function POST(request: Request) {
  const body = await request.json();

  const emailExists = leads.some(
    (lead) => lead.email.toLowerCase() === body.email.toLowerCase()
  );

  if (emailExists) {
    return NextResponse.json(
      { error: "Email already exists" },
      { status: 400 }
    );
  }

  const newLead: Lead = {
    id: (leads.length + 1).toString(),
    ...body,
    resumeUrl: body.resumeUrl ?? "/resumes/default.pdf",
    status: "PENDING",
    created_at: new Date().toISOString(),
  };

  leads.unshift(newLead);

  return NextResponse.json(newLead, { status: 201 });
}

export async function PUT(request: Request) {
  const body = await request.json();

  const { id, status } = body;

  if (!id || !status) {
    console.log("Missing id or status");
    return NextResponse.json(
      { error: "Missing id or status" },
      { status: 400 }
    );
  }

  const leadIndex = leads.findIndex((lead) => lead.id === id);
  if (leadIndex === -1) {
    console.log("Lead not found:", id);
    return NextResponse.json({ error: "Lead not found" }, { status: 404 });
  }

  leads[leadIndex].status = status;

  console.log("Updated lead:", leads[leadIndex]);

  return NextResponse.json(leads[leadIndex]);
}
