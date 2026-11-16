"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { SITE } from "@/lib/site";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError("");
    const form = e.currentTarget;
    const data = new FormData(form);
    data.set("product", "General contact");
    data.set("quantity", "");
    try {
      const res = await fetch("/api/enquiry", { method: "POST", body: data });
      const json = (await res.json()) as { ok?: boolean; message?: string };
      if (!res.ok || !json.ok) {
        throw new Error(json.message || "Unable to send message");
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
        <h3 className="font-heading text-xl font-semibold text-navy">
          Message sent
        </h3>
        <p className="mt-2 text-steel">
          Thank you. Call us on{" "}
          <a href={`tel:${SITE.phoneTel}`} className="text-teal">
            {SITE.phoneDisplay}
          </a>{" "}
          if you need a faster response.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-navy">Name</span>
        <input
          name="name"
          required
          className="min-h-11 w-full border border-steel/25 px-3 outline-none focus:border-teal"
        />
      </label>
      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-navy">
          Company
        </span>
        <input
          name="company"
          className="min-h-11 w-full border border-steel/25 px-3 outline-none focus:border-teal"
        />
      </label>
      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-navy">Phone</span>
        <input
          name="phone"
          type="tel"
          required
          className="min-h-11 w-full border border-steel/25 px-3 outline-none focus:border-teal"
        />
      </label>
      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-navy">Email</span>
        <input
          name="email"
          type="email"
          required
          className="min-h-11 w-full border border-steel/25 px-3 outline-none focus:border-teal"
        />
      </label>
      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-navy">
          Message
        </span>
        <textarea
          name="requirements"
          required
          rows={4}
          className="w-full border border-steel/25 px-3 py-2 outline-none focus:border-teal"
        />
      </label>
      {status === "error" ? (
        <p className="text-sm text-red-700" role="alert">
          {error}
        </p>
      ) : null}
      <Button type="submit" variant="primary" disabled={status === "loading"}>
        {status === "loading" ? "Sending…" : "Send message"}
      </Button>
    </form>
  );
}
