import { createFileRoute } from "@tanstack/react-router";
import { Play } from "lucide-react";

import experienceImage from "../assets/mad-monkey-experience-generated.jpg";
import impactImage from "../assets/mad-monkey-impact-generated.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "15 Years of Mad Monkey" },
      {
        name: "description",
        content: "15 Years of Mad Monkey — adventure hospitality, data-driven operations, secure growth, and ethical impact.",
      },
      { property: "og:title", content: "15 Years of Mad Monkey" },
      {
        property: "og:description",
        content: "A 15-year adventure hostel growth story with animated performance graphs.",
      },
    ],
  }),
  component: Index,
});

const reviews = [
  ["Google", "Best hostel experience in SE Asia! The staff are amazing and the vibe is unmatched.", "10/10"],
  ["Hostelworld", "Mad Monkey Koh Rong Samloem is literally paradise. Met the best people here.", "9.5/10"],
  ["Google", "The social atmosphere is incredible. If you're traveling solo, this is the place to be.", "10/10"],
  ["Hostelworld", "Clean, safe, and so much fun. The tours are well organized and the food is great.", "9/10"],
  ["Google", "15 years of excellence shows. Mad Monkey knows how to host a perfect stay.", "10/10"],
];

const loyalty = [26, 31, 36, 42, 48, 54, 60, 47, 65, 72, 86, 100];
const guests = [34, 48, 41, 57, 63, 73, 92, 88, 78, 84, 96, 90];
const ages = [18, 34, 67, 94, 77, 52, 29, 16, 8];

function Index() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <TopNav />
      <Hero />
      <Intro />
      <DataPillar />
      <Reviews />
      <SecurePillar />
      <GraphSection />
      <EthicalPillar />
      <BottomEmail />
    </main>
  );
}

function TopNav() {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-border bg-background">
      <div className="mx-auto flex h-24 max-w-[1190px] items-center justify-between px-6">
        <a href="/" className="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-ring">
          <span className="grid h-10 w-10 place-items-center rounded-full border-2 border-foreground text-xl font-black leading-none">☻</span>
          <span className="text-2xl font-black lowercase leading-[0.75] tracking-normal">mad<br />monkey</span>
        </a>
        <nav className="hidden items-center gap-8 text-[13px] font-black uppercase tracking-[0.18em] md:flex">
          <a href="#data" className="hover:text-primary">Data + Innovation</a>
          <a href="#secure" className="hover:text-primary">Secure</a>
          <a href="#ethical" className="hover:text-primary">Ethical</a>
        </nav>
        <div className="flex items-center gap-3">
          <a href="https://www.youtube.com/watch?v=nmfMDvkykGg" className="hidden border border-foreground px-6 py-5 text-xs font-black uppercase tracking-[0.16em] hover:bg-foreground hover:text-background sm:inline-flex">Watch the Film</a>
          <a href="mailto:FOUNDERS@MADMONKEYHOSTELS.COM" className="bg-foreground px-6 py-5 text-xs font-black uppercase tracking-[0.16em] text-background hover:bg-primary hover:text-primary-foreground">Contact Us</a>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative bg-background pb-32 pt-48 sm:pb-44 sm:pt-56">
      <div className="mx-auto max-w-[1088px] px-6">
        <p className="mb-16 text-[13px] text-foreground/5">Mad Monkey Hero</p>
        <span className="inline-flex bg-foreground px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.12em] text-background">EST. 2011</span>
        <h1 className="mt-9 max-w-[1040px] font-display text-[clamp(5.1rem,13.2vw,13.4rem)] uppercase leading-[0.78] tracking-normal">
          15 Years of<br />Mad Monkey
        </h1>
        <p className="mt-12 max-w-[760px] text-[clamp(1.6rem,2.4vw,2.75rem)] font-light leading-[1.25] text-muted-foreground">
          Born in Cambodia, today a market-leading experience-led socially responsible business.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <a href="https://www.youtube.com/watch?v=nmfMDvkykGg" className="inline-flex items-center gap-5 bg-foreground px-8 py-5 text-lg font-black uppercase tracking-[0.12em] text-background hover:bg-primary hover:text-primary-foreground">Watch the Film <Play className="h-5 w-5 fill-current" /></a>
          <a href="mailto:FOUNDERS@MADMONKEYHOSTELS.COM" className="inline-flex border border-foreground px-8 py-5 text-lg font-black uppercase tracking-[0.12em] hover:bg-foreground hover:text-background">Join the Story</a>
        </div>
      </div>
    </section>
  );
}

function Intro() {
  return (
    <section className="bg-background pb-28">
      <div className="mx-auto max-w-[1088px] px-6">
        <h2 className="max-w-[980px] font-display text-[clamp(3rem,6vw,6.4rem)] uppercase leading-[0.92] tracking-normal">
          As a leading adventure hostel brand, it isn't just about beds it’s about experiences.<br />
          <span className="text-muted-foreground/45">Our expansion isn’t just about size; it’s about impact.</span>
        </h2>
        <div className="mt-16 grid gap-8 text-xl font-medium leading-relaxed text-muted-foreground md:grid-cols-2">
          <p>We’re seeking strategic investment partnerships from aligned investors who strongly value triple-bottom-line value creation, and are passionate about making a difference.</p>
          <div className="space-y-8">
            <p>Our commitment to Environmental and Social Governance (ESG) isn’t just talk — it’s woven into our business model, ensuring we create value at every level: economic, social, and environmental.</p>
            <p>Mad Monkey boasts a 15 year legacy of delivering consistent triple-bottom-line value alongside an exceptional customer experience. Our adept management team has skillfully bootstrapped the company through various stages of expansion, culminating in securing Series A and B funding with our esteemed partner, EXS Capital.</p>
            <p>Leveraging this investment, we’ve significantly expanded our footprint, growing from seven to 24 hostels. This expansion cements our status as a dominant force in Asia’s rapidly evolving market and positions us as a leading player globally.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function DataPillar() {
  return (
    <section id="data" className="bg-background py-24">
      <div className="mx-auto grid max-w-[1088px] gap-14 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.18em] text-muted-foreground">Pillar 01: DATA + INNOVATION</p>
          <h2 className="mt-7 font-display text-[clamp(4rem,8vw,8.5rem)] uppercase leading-[0.84]">Data-Driven<br />Operations</h2>
          <p className="mt-7 max-w-xl text-2xl font-light leading-snug text-muted-foreground">We combine tech excellence with human experience to drive industry-leading conversion and loyalty.</p>
          <div className="mt-12 grid gap-8 sm:grid-cols-2">
            <Metric value="1 in 3" label="Guest convert to our gamified and tech powered loyalty programme - keeping their data behaviour part of an ongoing journey" />
            <Metric value="50k+" label="ACTIVE ENGAGED SIGN UPS" />
          </div>
          <a href="mailto:FOUNDERS@MADMONKEYHOSTELS.COM" className="mt-10 inline-flex bg-foreground px-8 py-5 text-sm font-black uppercase tracking-[0.16em] text-background hover:bg-primary hover:text-primary-foreground">Request Info Pack</a>
        </div>
        <img src={experienceImage} alt="Mad Monkey Experience" width={1400} height={1000} loading="lazy" className="h-[560px] w-full object-cover grayscale" />
      </div>
    </section>
  );
}

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div className="border-t border-border pt-5">
      <p className="font-display text-7xl uppercase leading-none">{value}</p>
      <p className="mt-4 text-sm font-black uppercase tracking-[0.12em] text-muted-foreground">{label}</p>
    </div>
  );
}

function Reviews() {
  return (
    <section className="overflow-hidden border-y border-border bg-foreground py-6 text-background">
      <div className="flex w-max animate-ticker gap-5">
        {[...reviews, ...reviews, ...reviews].map(([source, quote, score], index) => (
          <article key={`${source}-${index}`} className="w-[340px] shrink-0 border border-background/20 p-5">
            <p className="text-xs font-black uppercase tracking-[0.15em] opacity-70">{source} Guest Review</p>
            <p className="mt-4 text-base font-bold leading-snug">"{quote}"</p>
            <p className="mt-4 font-display text-4xl leading-none">{score}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function SecurePillar() {
  return (
    <section id="secure" className="bg-background py-24">
      <div className="mx-auto grid max-w-[1088px] gap-12 px-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.18em] text-muted-foreground">Pillar 02: SECURE</p>
          <h2 className="mt-7 font-display text-[clamp(5rem,11vw,11rem)] uppercase leading-[0.78]">MADMONKEY</h2>
          <p className="mt-6 max-w-2xl text-2xl font-light leading-snug text-muted-foreground">A proven track record of scaling adventure-focused hospitality across the region.</p>
        </div>
        <Metric value="75%" label="INCREASE IN ADVENTURE INTEREST" />
      </div>
    </section>
  );
}

function GraphSection() {
  return (
    <section className="bg-secondary py-20 text-secondary-foreground">
      <div className="mx-auto max-w-[1180px] px-6">
        <div className="mb-12 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] opacity-70">Performance & Growth</p>
            <h2 className="mt-4 font-display text-[clamp(3.5rem,7vw,7.5rem)] uppercase leading-[0.86]">Data-Driven<br />Excellence</h2>
          </div>
          <div className="border border-secondary-foreground/20 px-5 py-4 text-right">
            <p className="text-xs font-black uppercase tracking-[0.16em] opacity-60">Last Updated</p>
            <p className="mt-1 font-black uppercase tracking-[0.12em]">APRIL 2026</p>
          </div>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          <ChartCard title="Loyalty Members" subtitle="Cumulative Growth 2025-26" data={loyalty} axis="Jan 25 Feb Mar Apr May Jun Jul Aug Sep Oct Nov Jan 26" scale="0k 15k 30k 45k 60k" />
          <ChartCard title="Guests Per Month" subtitle="2025 Performance" data={guests} axis="Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec" scale="0k 3.5k 7k 10.5k 14k" />
          <ChartCard title="Age Distribution" subtitle="2025 Guest Demographics" data={ages} axis="18 21 24 27 30 33 36 39 42 45 48" scale="0k 2k 4k 6k 8k" />
        </div>
      </div>
    </section>
  );
}

function ChartCard({ title, subtitle, data, axis, scale }: { title: string; subtitle: string; data: number[]; axis: string; scale: string }) {
  const max = Math.max(...data);
  return (
    <article className="border border-secondary-foreground/20 bg-background p-5 text-foreground">
      <h3 className="text-2xl font-black">{title}</h3>
      <p className="mt-1 text-sm font-bold text-muted-foreground">{subtitle}</p>
      <div className="chart-grid mt-7 flex h-64 items-end gap-2 border-b border-l border-border px-3 pb-3">
        {data.map((item, index) => (
          <span
            key={`${title}-${index}`}
            className="block flex-1 origin-bottom bg-foreground animate-bar-grow"
            style={{ height: `${(item / max) * 100}%`, animationDelay: `${index * 85}ms` }}
          />
        ))}
      </div>
      <p className="mt-4 text-[10px] font-black uppercase tracking-[0.08em] text-muted-foreground">{axis}</p>
      <p className="mt-2 text-[10px] font-black uppercase tracking-[0.12em] text-muted-foreground">{scale}</p>
    </article>
  );
}

function EthicalPillar() {
  return (
    <section id="ethical" className="bg-background py-24">
      <div className="mx-auto grid max-w-[1088px] gap-14 px-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.18em] text-muted-foreground">Pillar 03: Ethical</p>
          <h2 className="mt-7 font-display text-[clamp(4rem,8vw,8.5rem)] uppercase leading-[0.84]">Local Growth &<br />Sustainability</h2>
          <p className="mt-7 max-w-xl text-2xl font-light leading-snug text-muted-foreground">Focus on the human element. Transparent social responsibility is at our core.</p>
          <div className="mt-12 grid gap-8 sm:grid-cols-2">
            <Metric value="93%" label="Local Workforce" />
            <Metric value="450" label="WATER WELLS BUILT" />
          </div>
          <a href="mailto:FOUNDERS@MADMONKEYHOSTELS.COM" className="mt-10 inline-flex bg-foreground px-8 py-5 text-sm font-black uppercase tracking-[0.16em] text-background hover:bg-primary hover:text-primary-foreground">Request Info Pack</a>
        </div>
        <img src={impactImage} alt="Impact 1" width={1400} height={900} loading="lazy" className="h-[560px] w-full object-cover grayscale" />
      </div>
    </section>
  );
}

function BottomEmail() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-foreground py-3 text-center text-[11px] font-black uppercase tracking-[0.45em] text-background">
      <a href="mailto:FOUNDERS@MADMONKEYHOSTELS.COM">FOUNDERS@MADMONKEYHOSTELS.COM</a>
    </footer>
  );
}