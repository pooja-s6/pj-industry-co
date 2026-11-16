import { SITE } from "@/lib/site";

export type EnquiryPayload = {
  name: string;
  company: string;
  phone: string;
  email: string;
  product: string;
  quantity: string;
  requirements: string;
  hasFile: boolean;
  fileName?: string;
};

const brand = {
  navy: "#1a1220",
  teal: "#e2187a",
  blue: "#0088cc",
  steel: "#5f6b7a",
  light: "#fdf4f8",
  white: "#ffffff",
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function shell(opts: {
  preheader: string;
  title: string;
  bodyHtml: string;
}) {
  const logoUrl = `${SITE.url}/images/about/logo.jpeg`;
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeHtml(opts.title)}</title>
</head>
<body style="margin:0;padding:0;background:${brand.light};font-family:Arial,Helvetica,sans-serif;color:${brand.navy};">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(opts.preheader)}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${brand.light};padding:24px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:${brand.white};border-radius:8px;overflow:hidden;border:1px solid #eed6e3;">
          <tr>
            <td style="background:${brand.navy};padding:20px 24px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td width="52" valign="middle">
                    <img src="${logoUrl}" width="44" height="44" alt="PJ Industries" style="display:block;border-radius:22px;background:${brand.white};object-fit:cover;" />
                  </td>
                  <td valign="middle" style="padding-left:12px;">
                    <div style="font-size:18px;font-weight:700;color:${brand.white};letter-spacing:0.02em;">PJ <span style="color:${brand.teal};">Industries</span></div>
                    <div style="font-size:12px;color:rgba(255,255,255,0.75);margin-top:2px;">${escapeHtml(SITE.tagline)}</div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="height:4px;background:${brand.teal};font-size:0;line-height:0;">&nbsp;</td>
          </tr>
          <tr>
            <td style="padding:28px 24px 8px;font-size:16px;line-height:1.55;color:${brand.navy};">
              ${opts.bodyHtml}
            </td>
          </tr>
          <tr>
            <td style="padding:8px 24px 28px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${brand.light};border-radius:6px;">
                <tr>
                  <td style="padding:14px 16px;font-size:13px;line-height:1.5;color:${brand.steel};">
                    <strong style="color:${brand.navy};">PJ Industries</strong><br />
                    Mannurpet &amp; Ambattur, Chennai<br />
                    <a href="tel:${SITE.phoneTel}" style="color:${brand.blue};text-decoration:none;">${escapeHtml(SITE.phoneDisplay)}</a>
                    &nbsp;·&nbsp;
                    <a href="mailto:${SITE.email}" style="color:${brand.blue};text-decoration:none;">${escapeHtml(SITE.email)}</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="background:${brand.navy};padding:14px 24px;font-size:11px;color:rgba(255,255,255,0.65);text-align:center;">
              Hydraulic equipment manufacturer since ${SITE.foundedYear}
              ${SITE.indiamart ? ` · <a href="${SITE.indiamart}" style="color:${brand.teal};text-decoration:none;">IndiaMART</a>` : ""}
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/** Confirmation to the person who submitted the enquiry */
export function customerConfirmationHtml(data: EnquiryPayload) {
  const first = escapeHtml(data.name.split(" ")[0] || data.name);
  const productLine = data.product
    ? `<p style="margin:0 0 12px;">Topic: <strong>${escapeHtml(data.product)}</strong></p>`
    : "";

  return shell({
    preheader: "We received your enquiry. Our team will contact you shortly.",
    title: "Enquiry received — PJ Industries",
    bodyHtml: `
      <h1 style="margin:0 0 12px;font-size:22px;line-height:1.25;color:${brand.navy};">Thank you, ${first}</h1>
      <p style="margin:0 0 14px;color:${brand.steel};">
        We have received your enquiry for <strong style="color:${brand.navy};">PJ Industries</strong>.
        Our team will review your requirement and contact you soon.
      </p>
      ${productLine}
      <p style="margin:0 0 18px;color:${brand.steel};">
        For urgent needs, call us on
        <a href="tel:${SITE.phoneTel}" style="color:${brand.teal};font-weight:700;text-decoration:none;">${escapeHtml(SITE.phoneDisplay)}</a>
        or WhatsApp the same number listed on our website.
      </p>
      <a href="${SITE.url}/products" style="display:inline-block;background:${brand.teal};color:${brand.white};text-decoration:none;padding:12px 18px;border-radius:4px;font-size:14px;font-weight:700;">
        View our products
      </a>
    `,
  });
}

/** Internal notification to the company inbox with submitted fields */
export function companyNotificationHtml(data: EnquiryPayload) {
  const rows: [string, string][] = [
    ["Name", data.name],
    ["Company", data.company || "—"],
    ["Phone", data.phone],
    ["Email", data.email],
    ["Product / topic", data.product || "—"],
    ["Quantity", data.quantity || "—"],
    ["Attachment", data.hasFile ? data.fileName || "Yes" : "None"],
  ];

  const table = rows
    .map(
      ([label, value], i) => `
      <tr style="background:${i % 2 === 0 ? brand.white : brand.light};">
        <td style="padding:10px 12px;font-size:13px;color:${brand.steel};width:34%;border-bottom:1px solid #eed6e3;">${escapeHtml(label)}</td>
        <td style="padding:10px 12px;font-size:13px;color:${brand.navy};border-bottom:1px solid #eed6e3;">${escapeHtml(value)}</td>
      </tr>`,
    )
    .join("");

  return shell({
    preheader: `New enquiry from ${data.name}${data.company ? ` (${data.company})` : ""}`,
    title: "New website enquiry — PJ Industries",
    bodyHtml: `
      <h1 style="margin:0 0 8px;font-size:20px;color:${brand.navy};">New website enquiry</h1>
      <p style="margin:0 0 16px;color:${brand.steel};font-size:14px;">Submitted via ${escapeHtml(SITE.url)}</p>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #eed6e3;border-radius:6px;overflow:hidden;">
        ${table}
      </table>
      <p style="margin:18px 0 6px;font-size:13px;font-weight:700;color:${brand.navy};">Requirements</p>
      <div style="padding:12px 14px;background:${brand.light};border-radius:6px;font-size:14px;line-height:1.55;color:${brand.navy};white-space:pre-wrap;">${escapeHtml(data.requirements)}</div>
      <p style="margin:18px 0 0;">
        <a href="mailto:${escapeHtml(data.email)}" style="color:${brand.blue};">Reply to customer</a>
        &nbsp;·&nbsp;
        <a href="tel:${escapeHtml(data.phone)}" style="color:${brand.blue};">Call ${escapeHtml(data.phone)}</a>
      </p>
    `,
  });
}

export function customerConfirmationText(data: EnquiryPayload) {
  return [
    `Hi ${data.name},`,
    "",
    "We have received your enquiry for PJ Industries. Our team will contact you shortly.",
    data.product ? `Topic: ${data.product}` : "",
    "",
    `For urgent needs call ${SITE.phoneDisplay}.`,
    "",
    "PJ Industries — Ambattur / Mannurpet, Chennai",
  ]
    .filter(Boolean)
    .join("\n");
}

export function companyNotificationText(data: EnquiryPayload) {
  return [
    "New website enquiry",
    `Name: ${data.name}`,
    `Company: ${data.company || "—"}`,
    `Phone: ${data.phone}`,
    `Email: ${data.email}`,
    `Product: ${data.product || "—"}`,
    `Quantity: ${data.quantity || "—"}`,
    `Attachment: ${data.hasFile ? data.fileName || "Yes" : "None"}`,
    "",
    "Requirements:",
    data.requirements,
  ].join("\n");
}
