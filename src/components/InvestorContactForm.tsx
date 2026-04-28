import { useState, type FormEvent } from "react";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Enter a valid email address").max(255, "Email must be less than 255 characters"),
});

export function ContactForm() {
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const result = contactSchema.safeParse({ name: form.get("name"), email: form.get("email") });

    if (!result.success) {
      const fields = result.error.flatten().fieldErrors;
      setErrors({ name: fields.name?.[0], email: fields.email?.[0] });
      return;
    }

    setErrors({});
    setStatus("sending");

    try {
      const response = await fetch("/api/public/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      });

      if (!response.ok) throw new Error("Request failed");
      setStatus("sent");
      event.currentTarget.reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="mt-10 grid gap-4 md:grid-cols-[1fr_1fr_auto] md:items-start">
      <label className="block">
        <span className="text-[11px] font-black uppercase tracking-[0.18em] text-muted-foreground">Name</span>
        <input name="name" type="text" maxLength={100} className="mt-3 h-[54px] w-full border border-border bg-background px-4 text-[15px] font-bold text-foreground outline-none focus:border-foreground" />
        {errors.name ? <span className="mt-2 block text-[12px] font-bold text-destructive">{errors.name}</span> : null}
      </label>
      <label className="block">
        <span className="text-[11px] font-black uppercase tracking-[0.18em] text-muted-foreground">Email</span>
        <input name="email" type="email" maxLength={255} className="mt-3 h-[54px] w-full border border-border bg-background px-4 text-[15px] font-bold text-foreground outline-none focus:border-foreground" />
        {errors.email ? <span className="mt-2 block text-[12px] font-bold text-destructive">{errors.email}</span> : null}
      </label>
      <button type="submit" disabled={status === "sending"} className="mt-[29px] h-[54px] bg-foreground px-7 text-[12px] font-black uppercase tracking-[0.16em] text-background transition-opacity hover:opacity-80 disabled:pointer-events-none disabled:opacity-60">{status === "sending" ? "Sending" : "Request Info"}</button>
      {status === "sent" ? <p className="text-[12px] font-black uppercase tracking-[0.12em] text-muted-foreground md:col-span-3">Request sent.</p> : null}
      {status === "error" ? <p className="text-[12px] font-black uppercase tracking-[0.12em] text-destructive md:col-span-3">Request failed. Please try again.</p> : null}
    </form>
  );
}
