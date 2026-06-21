import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";

/**
 * Contact form validation schema.
 * `subject` defaults to "General Inquiry" when missing, but any value
 * provided must still satisfy the length constraints.
 */
const contactSchema = z.object({
  name: z.string().min(2).max(80),
  email: z.email(),
  subject: z.string().min(2).max(120).default("General Inquiry"),
  message: z.string().min(10).max(2000),
});

export async function GET() {
  return NextResponse.json({ ok: true, service: "contact", method: "POST" });
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body" },
      { status: 400 },
    );
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: "Invalid input",
        issues: parsed.error.flatten(),
      },
      { status: 422 },
    );
  }

  const { name, email, subject, message } = parsed.data;

  try {
    await db.contactMessage.create({
      data: { name, email, subject, message },
    });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Server error" },
      { status: 500 },
    );
  }

  return NextResponse.json(
    {
      ok: true,
      message: "Message received. Jibril will get back to you soon.",
    },
    { status: 201 },
  );
}
