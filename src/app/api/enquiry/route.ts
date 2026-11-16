import { NextResponse } from "next/server";
import { SITE } from "@/lib/site";

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

    // [PLACEHOLDER] Wire to email provider (Resend / SMTP) to deliver to SITE.email
    // Until configured, accept the payload and log for development.
    console.info("[PJ Enquiry — placeholder mail delivery]", {
      to: SITE.email,
      name,
      company,
      phone,
      email,
      product,
      quantity,
      requirements,
      hasFile: Boolean(file && typeof file !== "string" && file.size > 0),
    });

    return NextResponse.json({
      ok: true,
      message: "Enquiry received. We will get back to you shortly.",
    });
  } catch {
    return NextResponse.json(
      { ok: false, message: "Unable to process enquiry." },
      { status: 500 },
    );
  }
}
