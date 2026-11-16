import { Resend } from "resend";
import { SITE } from "@/lib/site";
import {
  companyNotificationHtml,
  companyNotificationText,
  customerConfirmationHtml,
  customerConfirmationText,
  type EnquiryPayload,
} from "@/lib/email-templates";

function getResend() {
  const key = process.env.RESEND_API_KEY?.trim();
  if (!key) return null;
  return new Resend(key);
}

function fromAddress() {
  // After domain verify in Resend, set e.g. "PJ Industries <enquiries@pjindustries.in>"
  return (
    process.env.RESEND_FROM?.trim() ||
    `PJ Industries <onboarding@resend.dev>`
  );
}

function companyInbox() {
  return process.env.ENQUIRY_TO?.trim() || SITE.email;
}

export type MailResult =
  | { ok: true; mode: "sent" | "logged" }
  | { ok: false; message: string };

/**
 * Sends branded confirmation to the customer and full enquiry details to the company.
 * Without RESEND_API_KEY, logs payloads (local/dev) and still returns ok for UX testing.
 */
export async function sendEnquiryEmails(
  data: EnquiryPayload,
  attachment?: { filename: string; content: Buffer },
): Promise<MailResult> {
  const resend = getResend();
  const from = fromAddress();
  const toCompany = companyInbox();

  if (!resend) {
    console.info("[PJ Enquiry] RESEND_API_KEY missing — logging only", {
      toCompany,
      customer: data.email,
      name: data.name,
      product: data.product,
      hasFile: data.hasFile,
    });
    return { ok: true, mode: "logged" };
  }

  const company = await resend.emails.send({
    from,
    to: [toCompany],
    replyTo: data.email,
    subject: `New enquiry — ${data.name}${data.product ? ` — ${data.product}` : ""}`,
    html: companyNotificationHtml(data),
    text: companyNotificationText(data),
    attachments: attachment
      ? [{ filename: attachment.filename, content: attachment.content }]
      : undefined,
  });

  if (company.error) {
    console.error("[PJ Enquiry] company mail failed", company.error);
    return {
      ok: false,
      message: company.error.message || "Unable to deliver enquiry email.",
    };
  }

  const customer = await resend.emails.send({
    from,
    to: [data.email],
    replyTo: SITE.email,
    subject: "We received your enquiry — PJ Industries",
    html: customerConfirmationHtml(data),
    text: customerConfirmationText(data),
  });

  if (customer.error) {
    // Company already got the lead — don't fail the request hard
    console.error("[PJ Enquiry] customer confirmation failed", customer.error);
  }

  return { ok: true, mode: "sent" };
}
