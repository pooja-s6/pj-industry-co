import { NextResponse } from "next/server";
import { sendEnquiryEmails } from "@/lib/mail";
import type { EnquiryPayload } from "@/lib/email-templates";

const MAX_FILE_BYTES = 8 * 1024 * 1024; // 8 MB

export async function POST(request: Request) {
  try {
    const form = await request.formData();
    const name = String(form.get("name") || "").trim();
    const company = String(form.get("company") || "").trim();
    const phone = String(form.get("phone") || "").trim();
    const email = String(form.get("email") || "").trim();
    const product = String(form.get("product") || "").trim();
    const quantity = String(form.get("quantity") || "").trim();
    const requirements = String(form.get("requirements") || "").trim();
    const file = form.get("file");

    if (!name || !phone || !email || !requirements) {
      return NextResponse.json(
        { ok: false, message: "Please fill in the required fields." },
        { status: 400 },
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { ok: false, message: "Please enter a valid email address." },
        { status: 400 },
      );
    }

    let attachment:
      | { filename: string; content: Buffer }
      | undefined;
    let hasFile = false;
    let fileName: string | undefined;

    if (file && typeof file !== "string" && file.size > 0) {
      if (file.size > MAX_FILE_BYTES) {
        return NextResponse.json(
          { ok: false, message: "Attachment must be under 8 MB." },
          { status: 400 },
        );
      }
      hasFile = true;
      fileName = file.name || "attachment";
      const bytes = Buffer.from(await file.arrayBuffer());
      attachment = { filename: fileName, content: bytes };
    }

    const payload: EnquiryPayload = {
      name,
      company,
      phone,
      email,
      product,
      quantity,
      requirements,
      hasFile,
      fileName,
    };

    const result = await sendEnquiryEmails(payload, attachment);
    if (!result.ok) {
      return NextResponse.json(
        { ok: false, message: result.message },
        { status: 502 },
      );
    }

    return NextResponse.json({
      ok: true,
      message: "Enquiry received. We will get back to you shortly.",
    });
  } catch (err) {
    console.error("[PJ Enquiry] unexpected error", err);
    return NextResponse.json(
      { ok: false, message: "Unable to process enquiry." },
      { status: 500 },
    );
  }
}
