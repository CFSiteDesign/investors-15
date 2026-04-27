import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "15 Years of Mad Monkey" },
      {
        name: "description",
        content:
          "15 Years of Mad Monkey — data, secure growth, ethical impact, and adventure hospitality.",
      },
    ],
  }),
  component: Index,
});

const heroUrl = "https://i.imghippo.com/files/wei8466Qpo.jpg";
const experienceUrl = "https://i.imghippo.com/files/idSb4836m.JPG";
const networkUrl = "https://i.imghippo.com/files/rUB1888Pd.png";
const impactUrl = "https://i.imghippo.com/files/Iifo4464TY.jpg";

const reviews = [
  ["Google", "Guest Review", "Best hostel experience in SE Asia! The staff are amazing and the vibe is unmatched.", "10/10"],
  ["Hostelworld", "Guest Review", "Mad Monkey Koh Rong Samloem is literally paradise. Met the best people here.", "9.5/10"],
  ["Google", "Guest Review", "The social atmosphere is incredible. If you're traveling solo, this is the place to be.", "10/10"],
  ["Hostelworld", "Guest Review", "Clean, safe, and so much fun. The tours are well organized and the food is great.", "9/10"],
  ["Google", "Guest Review", "15 years of excellence shows. Mad Monkey knows how to host a perfect stay.", "10/10"],
];

const loyalty = [8, 12, 17, 23, 29, 35, 41, 47, 53, 58, 62, 68];
const guests = [2.6, 4.1, 5.3, 6.4, 7.8, 8.9, 10.8, 11.6, 10.1, 9.4, 12.3, 13.4];
const ages = [1.1, 3.4, 5.9, 7.4, 6.8, 5.2, 3.7, 2.3, 1.2, 0.7, 0.4];

function Index() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />
      <Hero />
      <Manifesto />
      <DataInnovation />
      <ReviewTicker />
      <Network />
      <Performance />
      <Ethical />
      <EmailBar />
    </main>
  );
}

function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background">
      <div className="mx-auto flex h-[98px] max-w-[1184px] items-center justify-between px-6">
        <a href="/" aria-label="Mad Monkey home" className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-full border-2 border-foreground text-[26px] leading-none">☻</span>
          <span className="text-[24px] font-black lowercase leading-[0.82] tracking-normal">mad<br />monkey</span>
        </a>
        <nav className="hidden items-center gap-8 text-[13px] font-black uppercase tracking-[0.18em] lg:flex">
          <a href="#data" className="transition-opacity hover:opacity-60">Data + Innovation</a>
          <a href="#secure" className="transition-opacity hover:opacity-60">Secure</a>
          <a href="#ethical" className="transition-opacity hover:opacity-60">Ethical</a>
        </nav>
        <div className="flex items-center gap-3">
          <a href="https://www.youtube.com/watch?v=nmfMDvkykGg" className="hidden border border-foreground px-6 py-5 text-[12px] font-black uppercase tracking-[0.16em] transition-colors hover:bg-foreground hover:text-background md:inline-flex">Watch The Film</a>
          <a href="mailto:FOUNDERS@MADMONKEYHOSTELS.COM" className="bg-foreground px-6 py-5 text-[12px] font-black uppercase tracking-[0.16em] text-background transition-opacity hover:opacity-80">Contact Us</a>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative min-h-[1048px] overflow-hidden bg-background pt-[98px]">
      <img src={heroUrl} alt="Mad Monkey Hero" className="absolute left-1/2 top-[98px] h-[140px] w-[1280px] max-w-none -translate-x-1/2 object-cover opacity-[0.03]" />
      <div className="mx-auto max-w-[1088px] px-6 pt-[96px]">
        <span className="inline-flex bg-foreground px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.08em] text-background">EST. 2011</span>
        <h1 className="mt-[44px] max-w-[1030px] font-display text-[clamp(78px,13.2vw,190px)] uppercase leading-[0.86] tracking-normal">
          15 Years<br />of<br />Mad<br />Monkey
        </h1>
        <p className="mt-[58px] max-w-[710px] text-[clamp(24px,2.5vw,42px)] font-light leading-[1.22] text-muted-foreground">
          Born in Cambodia, today a market-leading experience-led socially responsible business.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <a href="https://www.youtube.com/watch?v=nmfMDvkykGg" className="inline-flex bg-foreground px-8 py-5 text-[18px] font-black uppercase tracking-[0.12em] text-background">Watch the Film</a>
          <a href="mailto:FOUNDERS@MADMONKEYHOSTELS.COM" className="inline-flex border border-foreground px-8 py-5 text-[18px] font-black uppercase tracking-[0.12em]">Join the Story</a>
        </div>
      </div>
    </section>
  );
}

function Manifesto() {
  return (
    <section className="bg-background pb-[116px] pt-[72px]">
      <div className="mx-auto max-w-[1088px] px-6">
        <h2 className="max-w-[1030px] font-display text-[clamp(48px,6.2vw,98px)] uppercase leading-[0.92] tracking-normal">
          As a leading adventure hostel brand, it isn't just about beds it’s about experiences.
          <span className="block text-muted/70">Our expansion isn’t just about size; it’s about impact.</span>
        </h2>
        <div className="mt-[58px] grid gap-9 text-[20px] font-light leading-[1.55] text-muted-foreground md:grid-cols-2">
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

function DataInnovation() {
  return (
    <section id="data" className="bg-background py-[120px]">
      <div className="mx-auto grid max-w-[1088px] gap-14 px-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div>
          <p className="text-[14px] font-black uppercase tracking-[0.16em] text-muted-foreground">Pillar 01: DATA + INNOVATION</p>
          <h2 className="mt-8 font-display text-[clamp(62px,8.6vw,128px)] uppercase leading-[0.84]">Data-Driven<br />Operations</h2>
          <p className="mt-8 text-[25px] font-light leading-[1.22] text-muted-foreground">We combine tech excellence with human experience to drive industry-leading conversion and loyalty.</p>
          <div className="mt-14 grid gap-10 sm:grid-cols-2">
            <Metric value="1 in 3" label="Guest convert to our gamified and tech powered loyalty programme - keeping their data behaviour part of an ongoing journey" />
            <Metric value="50k+" label="ACTIVE ENGAGED SIGN UPS" />
          </div>
          <a href="mailto:FOUNDERS@MADMONKEYHOSTELS.COM" className="mt-12 inline-flex bg-foreground px-8 py-5 text-[14px] font-black uppercase tracking-[0.16em] text-background">Request Info Pack</a>
        </div>
        <img src={experienceUrl} alt="Mad Monkey Experience" loading="lazy" className="h-[620px] w-full object-cover grayscale" />
      </div>
    </section>
  );
}

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div className="border-t border-border pt-6">
      <p className="font-display text-[clamp(54px,6vw,86px)] uppercase leading-none">{value}</p>
      <p className="mt-4 text-[13px] font-black uppercase leading-[1.35] tracking-[0.12em] text-muted-foreground">{label}</p>
    </div>
  );
}

function ReviewTicker() {
  return (
    <section className="overflow-hidden border-y border-border bg-background py-8">
      <div className="flex w-max animate-ticker gap-5">
        {[...reviews, ...reviews, ...reviews].map(([brand, type, quote, rating], index) => (
          <article key={`${brand}-${index}`} className="w-[360px] shrink-0 border border-border bg-background p-5">
            <p className="text-[12px] font-black uppercase tracking-[0.16em] text-muted-foreground">{brand}</p>
            <p className="mt-1 text-[12px] font-black uppercase tracking-[0.16em]">{type}</p>
            <p className="mt-5 text-[17px] font-semibold leading-snug">"{quote}"</p>
            <p className="mt-5 font-display text-[44px] leading-none">{rating}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Network() {
  return (
    <section className="bg-background py-[120px]">
      <div className="mx-auto max-w-[1088px] px-6">
        <img src={networkUrl} alt="Mad Monkey Global Network" loading="lazy" className="h-auto w-full grayscale" />
        <div className="mt-8 flex items-end justify-between border-t border-border pt-8">
          <p className="text-[14px] font-black uppercase tracking-[0.16em] text-muted-foreground">Regional Demand</p>
          <p className="font-display text-[88px] leading-none">+12.4%</p>
        </div>
      </div>
    </section>
  );
}

function Performance() {
  return (
    <section id="secure" className="bg-secondary py-[96px] text-secondary-foreground">
      <div className="mx-auto max-w-[1184px] px-6">
        <p className="text-[14px] font-black uppercase tracking-[0.16em]">Pillar 02: SECURE</p>
        <h2 className="mt-8 font-display text-[clamp(78px,11vw,170px)] uppercase leading-[0.78]">MADMONKEY</h2>
        <p className="mt-6 max-w-[680px] text-[25px] font-light leading-[1.22]">A proven track record of scaling adventure-focused hospitality across the region.</p>
        <div className="mt-12 max-w-[360px] border-t border-secondary-foreground pt-6">
          <p className="font-display text-[92px] leading-none">75%</p>
          <p className="mt-4 text-[13px] font-black uppercase tracking-[0.12em]">INCREASE IN ADVENTURE INTEREST</p>
        </div>

        <div className="mt-[104px] flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="text-[14px] font-black uppercase tracking-[0.16em]">Performance & Growth</p>
            <h3 className="mt-6 font-display text-[clamp(58px,7vw,110px)] uppercase leading-[0.86]">Data-Driven<br />Excellence</h3>
          </div>
          <div className="border border-secondary-foreground px-6 py-5 text-right">
            <p className="text-[12px] font-black uppercase tracking-[0.16em] opacity-70">Last Updated</p>
            <p className="mt-2 text-[14px] font-black uppercase tracking-[0.14em]">APRIL 2026</p>
          </div>
        </div>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          <Chart title="Loyalty Members" subtitle="Cumulative Growth 2025-26" data={loyalty} x="Jan 25 Feb Mar Apr May Jun Jul Aug Sep Oct Nov Jan 26" y="0k 15k 30k 45k 60k" />
          <Chart title="Guests Per Month" subtitle="2025 Performance" data={guests} x="Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec" y="0k 3.5k 7k 10.5k 14k" />
          <Chart title="Age Distribution" subtitle="2025 Guest Demographics" data={ages} x="18 21 24 27 30 33 36 39 42 45 48" y="0k 2k 4k 6k 8k" />
        </div>
      </div>
    </section>
  );
}

function Chart({ title, subtitle, data, x, y }: { title: string; subtitle: string; data: number[]; x: string; y: string }) {
  const max = Math.max(...data);
  return (
    <article className="bg-background p-6 text-foreground">
      <h4 className="text-[22px] font-black">{title}</h4>
      <p className="mt-1 text-[14px] font-semibold text-muted-foreground">{subtitle}</p>
      <div className="chart-grid mt-8 flex h-[260px] items-end gap-2 border-b border-l border-border px-3 pb-3">
        {data.map((value, index) => (
          <span
            key={`${title}-${index}`}
            className="block flex-1 origin-bottom bg-foreground animate-bar-grow"
            style={{ height: `${(value / max) * 100}%`, animationDelay: `${index * 80}ms` }}
          />
        ))}
      </div>
      <p className="mt-4 text-[10px] font-black uppercase tracking-[0.04em] text-muted-foreground">{x}</p>
      <p className="mt-2 text-[10px] font-black uppercase tracking-[0.08em] text-muted-foreground">{y}</p>
    </article>
  );
}

function Ethical() {
  return (
    <section id="ethical" className="bg-background py-[120px]">
      <div className="mx-auto grid max-w-[1088px] gap-14 px-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div>
          <p className="text-[14px] font-black uppercase tracking-[0.16em] text-muted-foreground">Pillar 03: Ethical</p>
          <h2 className="mt-8 font-display text-[clamp(58px,8vw,124px)] uppercase leading-[0.84]">Local Growth &<br />Sustainability</h2>
          <p className="mt-8 text-[25px] font-light leading-[1.22] text-muted-foreground">Focus on the human element. Transparent social responsibility is at our core.</p>
          <div className="mt-14 grid gap-10 sm:grid-cols-2">
            <Metric value="93%" label="Local Workforce" />
            <Metric value="450" label="WATER WELLS BUILT" />
          </div>
          <a href="mailto:FOUNDERS@MADMONKEYHOSTELS.COM" className="mt-12 inline-flex bg-foreground px-8 py-5 text-[14px] font-black uppercase tracking-[0.16em] text-background">Request Info Pack</a>
        </div>
        <img src={impactUrl} alt="Impact 1" loading="lazy" className="h-[620px] w-full object-cover grayscale" />
      </div>
    </section>
  );
}

function EmailBar() {
  return (
    <footer className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-foreground py-3 text-center text-[11px] font-black uppercase tracking-[0.42em] text-background">
      <a href="mailto:FOUNDERS@MADMONKEYHOSTELS.COM">FOUNDERS@MADMONKEYHOSTELS.COM</a>
    </footer>
  );
}