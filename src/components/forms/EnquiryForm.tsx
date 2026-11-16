"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { listedProducts } from "@/lib/products";
import { SITE } from "@/lib/site";

type Props = {
  defaultProduct?: string;
  compact?: boolean;
};

export function EnquiryForm({ defaultProduct = "", compact = false }: Props) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [error, setError] = useState("");

  const productOptions = useMemo(
    () => [
      { value: "", label: "Select a product / topic" },
      ...listedProducts().map((p) => ({ value: p.name, label: p.name })),
      { value: "Other / Custom", label: "Other / Custom" },
    ],
    [],
  );

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError("");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        body: data,
      });
      const json = (await res.json()) as { ok?: boolean; message?: string };
      if (!res.ok || !json.ok) {
        throw new Error(json.message || "Unable to send enquiry");
      }
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-lg border border-teal/30 bg-light p-6">
        <h3 className="font-heading text-2xl font-semibold text-navy">
          Enquiry received
        </h3>
        <p className="mt-2 text-steel">
          Thank you. A confirmation email is on its way, and our team will
          contact you shortly. For urgent needs, call{" "}
          <a href={`tel:${SITE.phoneTel}`} className="font-medium text-teal">
            {SITE.phoneDisplay}
          </a>
          .
        </p>
        <Button
          className="mt-4"
          variant="secondary"
          onClick={() => setStatus("idle")}
        >
          Send another enquiry
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4" encType="multipart/form-data">
      <div className={compact ? "grid gap-4" : "grid gap-4 md:grid-cols-2"}>
        <Field label="Name" name="name" required />
        <Field label="Company" name="company" required />
        <Field label="Phone" name="phone" type="tel" required />
        <Field label="Email" name="email" type="email" required />
      </div>

      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-navy">
          Product
        </span>
        <select
          name="product"
          defaultValue={defaultProduct}
          className="min-h-11 w-full border border-steel/25 bg-white px-3 text-charcoal outline-none focus:border-teal"
        >
          {productOptions.map((opt) => (
            <option key={opt.value || "empty"} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </label>

      <Field label="Quantity" name="quantity" />

      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-navy">
          Requirements
        </span>
        <textarea
          name="requirements"
          required
          rows={5}
          className="w-full border border-steel/25 bg-white px-3 py-2 text-charcoal outline-none focus:border-teal"
          placeholder="Describe pressure, size, application, or drawings available…"
        />
      </label>

      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-navy">
          Optional file upload
        </span>
        <input
          type="file"
          name="file"
          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.dwg"
          className="block w-full text-sm text-steel file:mr-3 file:border-0 file:bg-light file:px-3 file:py-2 file:text-navy"
        />
      </label>

      {status === "error" ? (
        <p className="text-sm text-red-700" role="alert">
          {error}
        </p>
      ) : null}

      <Button type="submit" variant="quote" disabled={status === "loading"}>
        {status === "loading" ? "Sending…" : "Send Enquiry"}
      </Button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-navy">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        className="min-h-11 w-full border border-steel/25 bg-white px-3 text-charcoal outline-none focus:border-teal"
      />
    </label>
  );
}
