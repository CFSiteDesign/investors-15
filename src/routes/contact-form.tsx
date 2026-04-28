import { createFileRoute } from "@tanstack/react-router";

import { ContactForm } from "@/components/InvestorContactForm";

export const Route = createFileRoute("/contact-form")({
  head: () => ({
    meta: [
      { title: "Request Investor Info — Mad Monkey" },
      { name: "description", content: "Request investor information from the Mad Monkey founders team." },
      { property: "og:title", content: "Request Investor Info — Mad Monkey" },
      { property: "og:description", content: "Request investor information from the Mad Monkey founders team." },
    ],
  }),
  component: ContactFormPage,
});

function ContactFormPage() {
  return (
    <main className="min-h-screen bg-background px-5 py-8 text-foreground">
      <section className="mx-auto max-w-[980px]">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Contact Founders@madmonkeyhostels.com</p>
        <ContactForm />
      </section>
    </main>
  );
}
