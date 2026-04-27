import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, BarChart3, Globe2, HeartHandshake, Play, ShieldCheck, Sparkles } from "lucide-react";

import heroImage from "../assets/mad-monkey-adventure-hero.jpg";
import experienceImage from "../assets/mad-monkey-experience-generated.jpg";
import impactImage from "../assets/mad-monkey-impact-generated.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "15 Years of Mad Monkey Adventure" },
      {
        name: "description",
        content: "A 15-year Mad Monkey marketing page celebrating growth, guest loyalty, ESG impact, and adventure hospitality.",
      },
      { property: "og:title", content: "15 Years of Mad Monkey Adventure" },
      {
        property: "og:description",
        content: "Animated growth story for Mad Monkey's adventure hostel legacy across Asia.",
      },
    ],
  }),
  component: Index,
});

const growthBars = [32, 44, 51, 58, 65, 72, 79, 86, 92, 100, 111, 124];
const guestBars = [42, 55, 48, 64, 70, 86, 92, 88, 76, 84, 96, 108];
const ageBars = [34, 72, 95, 82, 57, 39, 26, 18];
const linePoints = "20,155 78,132 136,118 194,94 252,88 310,62 368,52 426,38 484,24";

function Index() {
  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <HeroSection />
      <StorySection />
      <PillarSection />
      <PerformanceSection />
      <ImpactSection />
      <FooterCta />
    </main>
  );
}

function HeroSection() {
  return (
    <section className="relative min-h-[92vh] bg-[var(--deep-ink)] text-[var(--hero-ink)]">
      <img
        src={heroImage}
        alt="Backpackers celebrating at a tropical beach hostel at sunset"
        width={1600}
        height={1000}
        className="absolute inset-0 h-full w-full object-cover opacity-70"
      />
      <div className="hero-mask absolute inset-0" />
      <header className="relative z-10 mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-7 sm:px-8">
        <a href="/" className="group flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background">
          <span className="grid h-12 w-12 place-items-center rounded-full border border-primary bg-primary text-xl font-black text-primary-foreground transition-transform duration-300 group-hover:rotate-6 group-hover:scale-105">m</span>
          <span className="text-xl font-black uppercase leading-none tracking-normal">mad<br />monkey</span>
        </a>
        <nav className="hidden items-center gap-7 text-xs font-black uppercase tracking-[0.18em] md:flex">
          <a className="transition-colors hover:text-primary" href="#data">Data + Innovation</a>
          <a className="transition-colors hover:text-primary" href="#secure">Secure</a>
          <a className="transition-colors hover:text-primary" href="#ethical">Ethical</a>
        </nav>
        <a href="mailto:FOUNDERS@MADMONKEYHOSTELS.COM" className="inline-flex min-h-11 items-center gap-2 border border-primary bg-primary px-5 text-xs font-black uppercase tracking-[0.16em] text-primary-foreground shadow-adventure transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-lift focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background">
          Contact us
        </a>
      </header>

      <div className="relative z-10 mx-auto grid max-w-7xl gap-8 px-5 pb-16 pt-14 sm:px-8 lg:grid-cols-[1fr_360px] lg:pt-20">
        <div className="animate-reveal-up">
          <span className="inline-flex bg-card px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-card-foreground">Est. 2011</span>
          <h1 className="mt-8 max-w-5xl font-display text-[clamp(4.8rem,15vw,13rem)] uppercase leading-[0.82] tracking-normal text-balance">
            15 Years<br />of Mad<br />Monkey
          </h1>
          <p className="mt-7 max-w-2xl text-xl font-semibold leading-relaxed text-[var(--sand)] sm:text-2xl">
            Born in Cambodia, now a market-leading experience-led and socially responsible adventure hostel brand.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a href="https://www.youtube.com/watch?v=nmfMDvkykGg" className="inline-flex min-h-12 items-center gap-3 border border-primary bg-primary px-6 text-sm font-black uppercase tracking-[0.15em] text-primary-foreground transition-transform duration-300 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background">
              <Play className="h-4 w-4 fill-current" /> Watch the film
            </a>
            <a href="mailto:FOUNDERS@MADMONKEYHOSTELS.COM" className="inline-flex min-h-12 items-center gap-3 border border-[var(--hero-ink)] px-6 text-sm font-black uppercase tracking-[0.15em] transition-colors duration-300 hover:bg-card hover:text-card-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background">
              Join the story <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
        <aside className="self-end border border-border bg-card/90 p-5 text-card-foreground shadow-adventure backdrop-blur animate-drift">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-muted-foreground">Regional demand</p>
          <p className="mt-2 font-display text-6xl leading-none text-primary">+12.4%</p>
          <p className="mt-3 text-sm font-semibold leading-relaxed text-muted-foreground">Momentum across high-growth Asian youth travel corridors.</p>
        </aside>
      </div>
    </section>
  );
}

function StorySection() {
  const reviews = [
    "Best hostel experience in SE Asia. The staff are amazing and the vibe is unmatched.",
    "Mad Monkey is literally paradise. Met the best people here.",
    "The social atmosphere is incredible. If you're traveling solo, this is the place.",
    "Clean, safe, and so much fun. The tours are well organized.",
  ];

  return (
    <section className="bg-[var(--sand)] py-20 text-foreground sm:py-28">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-primary">15 year legacy</p>
          <h2 className="mt-5 max-w-3xl font-display text-6xl uppercase leading-[0.9] sm:text-8xl">Beds are only the beginning.</h2>
        </div>
        <div className="space-y-6 text-lg font-semibold leading-relaxed text-muted-foreground">
          <p>As a leading adventure hostel brand, Mad Monkey is built around experiences, community, safety, and measurable impact.</p>
          <p>We’re seeking strategic investment partnerships from aligned investors who value triple-bottom-line value creation across economic, social, and environmental outcomes.</p>
          <div className="grid gap-4 pt-4 sm:grid-cols-3">
            {[
              ["24", "hostels"],
              ["50k+", "active sign ups"],
              ["1 in 3", "loyalty conversion"],
            ].map(([value, label]) => (
              <div key={label} className="border-t-4 border-primary bg-card p-5 shadow-lift transition-transform duration-300 hover:-translate-y-1">
                <p className="font-display text-5xl uppercase leading-none text-primary">{value}</p>
                <p className="mt-2 text-xs font-black uppercase tracking-[0.16em] text-muted-foreground">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-16 overflow-hidden border-y border-border bg-card py-5">
        <div className="flex w-max animate-ticker gap-4">
          {[...reviews, ...reviews].map((review, index) => (
            <div key={`${review}-${index}`} className="w-80 shrink-0 border border-border bg-background p-4 shadow-lift">
              <p className="text-sm font-bold leading-relaxed">“{review}”</p>
              <p className="mt-3 text-xs font-black uppercase tracking-[0.16em] text-primary">Guest review · 10/10</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PillarSection() {
  return (
    <section id="data" className="bg-background py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 sm:px-8 lg:grid-cols-[1fr_0.9fr]">
        <div className="relative overflow-hidden border border-border bg-card shadow-adventure">
          <img src={experienceImage} alt="Tropical hostel courtyard with backpackers and murals" width={1400} height={1000} loading="lazy" className="h-[520px] w-full object-cover transition-transform duration-700 hover:scale-105" />
          <div className="absolute bottom-5 left-5 right-5 bg-card/90 p-5 backdrop-blur">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-primary">Pillar 01: Data + Innovation</p>
            <p className="mt-2 text-2xl font-black">Tech excellence with human experience.</p>
          </div>
        </div>
        <div>
          <Sparkles className="h-10 w-10 text-primary" />
          <h2 className="mt-6 font-display text-6xl uppercase leading-[0.9] sm:text-8xl">Data-driven operations</h2>
          <p className="mt-6 text-lg font-semibold leading-relaxed text-muted-foreground">Gamified loyalty, direct booking conversion, and operational dashboards turn every stay into a measurable relationship.</p>
          <a href="mailto:FOUNDERS@MADMONKEYHOSTELS.COM" className="mt-8 inline-flex min-h-12 items-center gap-3 bg-secondary px-6 text-sm font-black uppercase tracking-[0.15em] text-secondary-foreground transition-transform duration-300 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background">Request info pack <ArrowRight className="h-4 w-4" /></a>
        </div>
      </div>
    </section>
  );
}

function PerformanceSection() {
  return (
    <section id="secure" className="bg-[var(--deep-ink)] py-20 text-[var(--hero-ink)] sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-primary">Pillar 02: Secure</p>
            <h2 className="mt-5 font-display text-6xl uppercase leading-[0.9] sm:text-8xl">Performance & growth</h2>
          </div>
          <p className="max-w-2xl text-lg font-semibold leading-relaxed text-[var(--sand)]">A proven track record of scaling adventure-focused hospitality, powered by animated operating signals and repeatable playbooks.</p>
        </div>
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          <LineChartCard />
          <BarChartCard title="Guests per month" subtitle="2025 performance" data={guestBars} icon={<Globe2 className="h-5 w-5" />} />
          <BarChartCard title="Age distribution" subtitle="guest demographics" data={ageBars} icon={<BarChart3 className="h-5 w-5" />} compact />
        </div>
      </div>
    </section>
  );
}

function LineChartCard() {
  return (
    <article className="chart-grid border border-border bg-card p-5 text-card-foreground shadow-adventure lg:col-span-1">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-primary">Loyalty members</p>
          <h3 className="mt-2 text-2xl font-black">Cumulative Growth 2025–26</h3>
        </div>
        <ShieldCheck className="h-8 w-8 text-primary" />
      </div>
      <svg viewBox="0 0 520 210" role="img" aria-label="Animated upward loyalty member growth line chart" className="mt-8 h-56 w-full overflow-visible">
        <polyline points={linePoints} fill="none" stroke="var(--color-primary)" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="620" className="animate-line-draw" />
        {linePoints.split(" ").map((point, index) => {
          const [cx, cy] = point.split(",");
          return <circle key={point} cx={cx} cy={cy} r="7" fill="var(--color-accent)" style={{ animationDelay: `${index * 90}ms` }} className="animate-reveal-up" />;
        })}
      </svg>
      <div className="flex justify-between text-xs font-black uppercase tracking-[0.12em] text-muted-foreground"><span>Jan 25</span><span>60k</span><span>Jan 26</span></div>
    </article>
  );
}

function BarChartCard({ title, subtitle, data, icon, compact = false }: { title: string; subtitle: string; data: number[]; icon: React.ReactNode; compact?: boolean }) {
  const max = Math.max(...data);
  return (
    <article className="chart-grid border border-border bg-card p-5 text-card-foreground shadow-adventure">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-primary">{title}</p>
          <h3 className="mt-2 text-2xl font-black capitalize">{subtitle}</h3>
        </div>
        <span className="text-primary">{icon}</span>
      </div>
      <div className="mt-8 flex h-56 items-end gap-2 border-b border-l border-border px-3 pb-3">
        {data.map((value, index) => (
          <div key={`${title}-${index}`} className="flex h-full flex-1 items-end">
            <div
              className="w-full origin-bottom bg-primary shadow-adventure animate-bar-grow transition-colors duration-300 hover:bg-accent"
              style={{ height: `${(value / max) * (compact ? 84 : 100)}%`, animationDelay: `${index * 80}ms` }}
            />
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-between text-xs font-black uppercase tracking-[0.12em] text-muted-foreground"><span>0k</span><span>{compact ? "18–48" : "Jan–Dec"}</span><span>{compact ? "8k" : "14k"}</span></div>
    </article>
  );
}

function ImpactSection() {
  return (
    <section id="ethical" className="relative overflow-hidden bg-[var(--sand)] py-20 sm:py-28">
      <div className="adventure-grain absolute inset-0 text-primary" />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-primary">Pillar 03: Ethical</p>
          <h2 className="mt-5 font-display text-6xl uppercase leading-[0.9] sm:text-8xl">Local growth & sustainability</h2>
          <p className="mt-6 text-lg font-semibold leading-relaxed text-muted-foreground">Transparent social responsibility is at the core: local teams, community investment, and environmental accountability.</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <StatCard value="93%" label="Local workforce" />
            <StatCard value="450" label="Water wells built" />
          </div>
        </div>
        <div className="relative border border-border bg-card p-3 shadow-adventure">
          <img src={impactImage} alt="Community clean water project supported by travel hospitality impact work" width={1400} height={900} loading="lazy" className="h-[560px] w-full object-cover" />
          <div className="absolute right-7 top-7 grid h-24 w-24 place-items-center rounded-full bg-primary text-center text-xs font-black uppercase leading-tight tracking-[0.12em] text-primary-foreground animate-drift">ESG<br />Built in</div>
        </div>
      </div>
    </section>
  );
}

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="border border-border bg-card p-6 shadow-lift transition-transform duration-300 hover:-translate-y-1">
      <HeartHandshake className="h-7 w-7 text-primary" />
      <p className="mt-5 font-display text-6xl uppercase leading-none text-primary">{value}</p>
      <p className="mt-2 text-xs font-black uppercase tracking-[0.16em] text-muted-foreground">{label}</p>
    </div>
  );
}

function FooterCta() {
  return (
    <footer className="bg-[var(--deep-ink)] px-5 py-16 text-[var(--hero-ink)] sm:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-primary">Ready for the next chapter</p>
          <h2 className="mt-3 font-display text-5xl uppercase leading-none sm:text-7xl">Join the story.</h2>
        </div>
        <a href="mailto:FOUNDERS@MADMONKEYHOSTELS.COM" className="inline-flex min-h-12 items-center justify-center gap-3 bg-primary px-6 text-sm font-black uppercase tracking-[0.15em] text-primary-foreground transition-transform duration-300 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background">FOUNDERS@MADMONKEYHOSTELS.COM <ArrowRight className="h-4 w-4" /></a>
      </div>
    </footer>
  );
}