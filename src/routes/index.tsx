import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

import madMonkeyLogo from "../assets/mad-monkey-logo.webp";

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

const reviews = [
  ["Google", "Guest Review", "Best hostel experience in SE Asia! The staff are amazing and the vibe is unmatched.", "10/10"],
  ["Hostelworld", "Guest Review", "Mad Monkey Koh Rong Samloem is literally paradise. Met the best people here.", "10/10"],
  ["Google", "Guest Review", "The social atmosphere is incredible. If you're traveling solo, this is the place to be.", "10/10"],
  ["Hostelworld", "Guest Review", "Clean, safe, and so much fun. The tours are well organized and the food is great.", "10/10"],
  ["Google", "Guest Review", "15 years of excellence shows. Mad Monkey knows how to host a perfect stay.", "10/10"],
];

const loyalty = [7, 9.5, 13, 15.5, 17, 18.5, 20, 21.5, 23.5, 26, 31, 60];
const guests = [12.6, 12.3, 14, 13.9, 13.2, 10.9, 10.4, 10.1, 9.6, 11.8, 12.4, 12.5];
const ages = [0.2, 1.8, 5.6, 4.2, 4.8, 6.8, 7.2, 6.6, 6.1, 5.4, 4.5, 3.9, 3.4, 2.7, 2.1, 1.8, 1.5, 1.2, 1.0, 0.8, 0.65, 0.55, 0.42, 0.31, 0.22, 0.16, 0.12, 0.08, 0.05, 0.03, 0.02];

function Index() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />
      <Hero />
      <Manifesto />
      <DataInnovation />
      <ReviewTicker />
      <Performance />
      <Ethical />
      <EmailBar />
    </main>
  );
}

function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background">
      <div className="mx-auto grid h-[76px] max-w-[1184px] grid-cols-[auto_1fr_auto] items-center gap-5 px-5 lg:h-[98px] lg:gap-8 lg:px-6">
        <a href="/" aria-label="Mad Monkey home" className="flex items-center gap-3">
          <img src={madMonkeyLogo} alt="Mad Monkey" width={360} height={180} className="h-[44px] w-auto object-contain lg:h-[58px]" />
        </a>
        <nav className="hidden items-center justify-end gap-8 text-[13px] font-black uppercase tracking-[0.18em] lg:flex">
          <a href="#data" className="transition-opacity hover:opacity-60">Data + Innovation</a>
          <a href="#secure" className="transition-opacity hover:opacity-60">Secure</a>
          <a href="#ethical" className="transition-opacity hover:opacity-60">Ethical</a>
        </nav>
        <div className="flex items-center gap-3">
          <a href="https://www.youtube.com/watch?v=nmfMDvkykGg" className="hidden h-[40px] items-center border border-foreground px-6 text-[12px] font-black uppercase tracking-[0.16em] transition-colors hover:bg-foreground hover:text-background md:inline-flex">Watch The Film</a>
          <a href="mailto:FOUNDERS@MADMONKEYHOSTELS.COM" className="inline-flex h-[38px] items-center bg-foreground px-4 text-[11px] font-black uppercase tracking-[0.14em] text-background transition-opacity hover:opacity-80 md:h-[40px] md:px-6 md:text-[12px]">Contact Us</a>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative min-h-[780px] overflow-hidden bg-background pt-[76px] lg:min-h-[980px] lg:pt-[98px]">
      <img src={heroUrl} alt="Mad Monkey Hero" className="absolute left-1/2 top-[98px] h-[140px] w-[1280px] max-w-none -translate-x-1/2 object-cover opacity-[0.03]" />
      <div className="mx-auto max-w-[1088px] overflow-hidden px-5 pt-[72px] sm:pt-[88px] lg:px-6 lg:pt-[96px]">
        <span className="inline-flex bg-foreground px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.08em] text-background">EST. 2011</span>
        <h1 className="hero-title mt-[38px] max-w-[1030px] font-display text-[clamp(46px,10.2vw,190px)] font-black uppercase leading-[0.86] tracking-normal lg:mt-[42px]">
          <span className="hero-title-group hero-title-up">
            <span className="hero-title-line whitespace-nowrap">15 Years</span>
            <span className="hero-title-line whitespace-nowrap">of</span>
          </span>
          <span className="hero-title-group hero-title-down">
            <span className="hero-title-line whitespace-nowrap">Mad</span>
            <span className="hero-title-line whitespace-nowrap">Monkey</span>
          </span>
        </h1>
        <p className="hero-copy mt-[34px] max-w-[760px] text-[clamp(16px,1.75vw,28px)] font-light leading-[1.28] text-muted-foreground lg:mt-[42px]">
          Born in Cambodia, today a market-leading experience-led socially responsible business.
        </p>
        <div className="hero-copy mt-8 flex flex-wrap gap-4">
          <a href="https://www.youtube.com/watch?v=nmfMDvkykGg" className="inline-flex bg-foreground px-6 py-4 text-[13px] font-black uppercase tracking-[0.12em] text-background lg:px-8 lg:py-5 lg:text-[18px]">Watch the Film</a>
          <a href="mailto:FOUNDERS@MADMONKEYHOSTELS.COM" className="inline-flex border border-foreground px-6 py-4 text-[13px] font-black uppercase tracking-[0.12em] lg:px-8 lg:py-5 lg:text-[18px]">Join the Story</a>
        </div>
      </div>
    </section>
  );
}

function Manifesto() {
  return (
    <section className="bg-background pb-[82px] pt-[56px] lg:pb-[116px] lg:pt-[72px]">
      <div className="mx-auto max-w-[1088px] px-5 lg:px-6">
        <h2 className="max-w-[940px] font-display text-[clamp(26px,4.4vw,68px)] uppercase leading-[1.04] tracking-normal text-balance">
          As a leading adventure hostel brand, it isn't just about beds it’s about experiences.
          <span className="block text-muted-foreground">Our expansion isn’t just about size; it’s about impact.</span>
        </h2>
        <div className="mt-[36px] max-w-[760px] space-y-6 text-[16px] font-light leading-[1.7] text-muted-foreground lg:mt-[52px] lg:text-[18px]">
          <p>We’re seeking strategic investment partnerships from aligned investors who strongly value triple-bottom-line value creation, and are passionate about making a difference.</p>
          <p>Our commitment to Environmental and Social Governance (ESG) isn’t just talk — it’s woven into our business model, ensuring we create value at every level: economic, social, and environmental.</p>
          <p>Mad Monkey boasts a 15 year legacy of delivering consistent triple-bottom-line value alongside an exceptional customer experience. Our adept management team has skillfully bootstrapped the company through various stages of expansion, culminating in securing Series A and B funding with our esteemed partner, EXS Capital.</p>
          <p>Leveraging this investment, we’ve significantly expanded our footprint, growing from seven to 24 hostels. This expansion cements our status as a dominant force in Asia’s rapidly evolving market and positions us as a leading player globally.</p>
        </div>
      </div>
    </section>
  );
}

function DataInnovation() {
  return (
    <section id="data" className="scroll-mt-[96px] border-y border-border bg-background py-[32px] lg:scroll-mt-[118px] lg:py-[39px]">
      <div className="mx-auto max-w-[1045px] px-5 sm:px-[51px]">
        <div className="relative z-10 max-w-[760px] bg-background">
          <p className="flex items-center gap-2 text-[12px] font-black uppercase leading-none tracking-[0.18em] text-muted-foreground">
            <span className="text-[19px] leading-none text-foreground">↯</span>
            PILLAR 01: PROVEN
          </p>
          <h2 className="mt-[16px] max-w-[410px] font-display text-[clamp(34px,7vw,56px)] uppercase leading-[1.08] tracking-normal text-balance">
            DATA-DRIVEN OPERATIONS
          </h2>
          <p className="mt-[21px] max-w-[520px] text-[15px] font-light leading-[1.52] text-muted-foreground sm:text-[16px]">
            We combine tech excellence with human experience to drive industry-leading conversion and brand loyalty.
          </p>
          <div className="mt-[28px] grid max-w-[620px] grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-[40px]">
            <BriefMetric value="1 in 3" label="Guests convert to our gamified, tech-powered loyalty programme — keeping their behaviour data part of an ongoing journey." />
            <BriefMetric value="55k+" label="Actively engaged loyalty members. Launched in 2025, the program now drives over 40% of all bookings." />
          </div>
        </div>
      </div>
    </section>
  );
}

function BriefMetric({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="font-display text-[44px] uppercase leading-none tracking-normal sm:text-[60px]">{value}</p>
      <p className="mt-[10px] text-[12px] font-black uppercase leading-[1.58] tracking-[0.12em] text-muted-foreground sm:text-[13px]">{label}</p>
    </div>
  );
}

function LoyaltyChart() {
  const points = loyalty.map((value, index) => {
    const x = 55 + index * 32.5;
    const y = 330 - (value / 60) * 250;
    return `${x},${y}`;
  });
  const line = points.join(" ");
  const area = `55,330 ${line} 445,330`;

  return (
    <article className="relative h-full min-h-[408px] overflow-hidden bg-background px-[30px] py-[28px] text-foreground">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-[21px] font-black uppercase leading-none tracking-normal">LOYALTY MEMBERS</h3>
          <p className="mt-[9px] text-[12px] font-black uppercase leading-none tracking-[0.22em] text-muted-foreground">CUMULATIVE GROWTH 2025-26</p>
        </div>
        <span className="grid size-[32px] place-items-center rounded-full bg-muted/25 text-muted-foreground" aria-hidden="true">⌁</span>
      </div>
      <svg viewBox="0 0 480 330" className="mt-[22px] h-[285px] w-full overflow-visible" role="img" aria-label="Loyalty members cumulative growth line chart">
        <defs>
          <linearGradient id="loyaltyFill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="var(--color-graph-purple)" stopOpacity="0.72" />
            <stop offset="100%" stopColor="var(--color-graph-purple)" stopOpacity="0.06" />
          </linearGradient>
        </defs>
        {[80, 142, 205, 267, 330].map((y) => (
          <line key={y} x1="55" x2="445" y1={y} y2={y} className="stroke-border/50" strokeDasharray="3 4" />
        ))}
        {['60k', '45k', '30k', '15k', '0k'].map((label, index) => (
          <text key={label} x="26" y={84 + index * 62.5} className="fill-muted-foreground text-[12px] font-bold">{label}</text>
        ))}
        <polygon points={area} fill="url(#loyaltyFill)" />
        <polyline points={line} fill="none" className="animate-line-draw stroke-graph-purple" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="620" strokeDashoffset="620" />
        {['Jan 25', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Jan 26'].map((label, index) => (
          <text key={label} x={55 + index * 35.5} y="354" className="fill-muted-foreground text-[11px] font-bold" textAnchor="middle">{label}</text>
        ))}
      </svg>
    </article>
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
    <section className="bg-background py-[82px] lg:py-[120px]">
      <div className="mx-auto max-w-[1088px] px-5 lg:px-6">
        <img src={networkUrl} alt="Mad Monkey Global Network" loading="lazy" className="h-auto w-full grayscale" />
        <div className="mt-8 flex items-end justify-between border-t border-border pt-8">
          <p className="text-[14px] font-black uppercase tracking-[0.16em] text-muted-foreground">Regional Demand</p>
          <p className="font-display text-[58px] leading-none lg:text-[88px]">+12.4%</p>
        </div>
      </div>
    </section>
  );
}

function Performance() {
  return (
    <section id="secure" className="bg-secondary py-[74px] text-secondary-foreground lg:py-[96px]">
      <div className="mx-auto max-w-[1184px] px-5 lg:px-6">
        <p className="text-[14px] font-black uppercase tracking-[0.16em]">Pillar 02: SECURE</p>
        <h2 className="mt-8 font-display text-[clamp(50px,11vw,170px)] uppercase leading-[0.78]">MADMONKEY</h2>
        <p className="mt-6 max-w-[680px] text-[18px] font-light leading-[1.3] lg:text-[25px] lg:leading-[1.22]">A proven track record of scaling adventure-focused hospitality across the region.</p>
        <div className="mt-12 max-w-[360px] border-t border-secondary-foreground pt-6">
          <p className="font-display text-[62px] leading-none lg:text-[92px]">75%</p>
          <p className="mt-4 text-[13px] font-black uppercase tracking-[0.12em]">INCREASE IN ADVENTURE INTEREST</p>
        </div>

        <div className="mt-[104px] flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="text-[14px] font-black uppercase tracking-[0.16em]">Performance & Growth</p>
            <h3 className="mt-6 max-w-[680px] font-display text-[clamp(38px,6.2vw,92px)] uppercase leading-[1] text-balance">Data-Driven Excellence</h3>
          </div>
          <div className="border border-secondary-foreground px-6 py-5 text-right">
            <p className="text-[12px] font-black uppercase tracking-[0.16em] opacity-70">Last Updated</p>
            <p className="mt-2 text-[14px] font-black uppercase tracking-[0.14em]">APRIL 2026</p>
          </div>
        </div>
        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          <Chart type="line" title="Loyalty Members" subtitle="Cumulative Growth 2025-26" data={loyalty} maxValue={60} x="Jan 25,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Jan 26" y="60k,45k,30k,15k,0k" />
          <Chart type="bar" title="Guests Per Month" subtitle="2025 Performance" data={guests} maxValue={14} x="Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec" y="14k,10.5k,7k,3.5k,0k" />
          <Chart type="bar" wide title="Age Distribution" subtitle="2025 Guest Demographics" data={ages} maxValue={8} x="18,21,24,27,30,33,36,39,42,45,48" y="8k,6k,4k,2k,0k" />
        </div>
      </div>
    </section>
  );
}

function Chart({ title, subtitle, data, x, y, type, maxValue, wide = false }: { title: string; subtitle: string; data: number[]; x: string; y: string; type: "line" | "bar"; maxValue: number; wide?: boolean }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const xLabels = x.split(",");
  const yLabels = y.split(",");
  const pointPositions = data.map((value, index) => {
    const xPos = 58 + (index / (data.length - 1)) * 392;
    const yPos = 292 - (value / maxValue) * 238;
    return { x: xPos, y: yPos, value, label: xLabels[index] ?? String(index + 1) };
  });
  const points = pointPositions.map((point) => `${point.x},${point.y}`);
  const area = `58,292 ${points.join(" ")} 450,292`;
  const hovered = hoveredIndex === null ? null : pointPositions[hoveredIndex];
  const formatValue = (value: number) => {
    if (title === "Loyalty Members") return Math.round(value * 1000).toLocaleString();
    if (title === "Guests Per Month") return Math.round(value * 1000).toLocaleString();
    return Math.round(value * 1000).toLocaleString();
  };

  return (
    <article className={`border border-border bg-background px-7 py-6 text-foreground ${wide ? "lg:col-span-2" : ""}`}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h4 className="text-[23px] font-black uppercase leading-none">{title}</h4>
          <p className="mt-3 text-[13px] font-black uppercase leading-none tracking-[0.22em] text-muted-foreground">{subtitle}</p>
        </div>
        <span className="grid size-9 shrink-0 place-items-center rounded-full bg-muted/35 text-muted-foreground" aria-hidden="true">⌁</span>
      </div>
      <svg viewBox="0 0 500 360" className="mt-8 h-[330px] w-full overflow-visible" role="img" aria-label={`${title} chart`}>
        <defs>
          <linearGradient id={`${title.replace(/\s+/g, "-")}-fill`} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="var(--color-graph-purple)" stopOpacity="0.72" />
            <stop offset="100%" stopColor="var(--color-graph-blue)" stopOpacity="0.04" />
          </linearGradient>
        </defs>
        {[54, 113.5, 173, 232.5, 292].map((lineY) => (
          <line key={lineY} x1="58" x2="450" y1={lineY} y2={lineY} className="stroke-border/50" strokeDasharray="3 5" />
        ))}
        {yLabels.map((label, index) => (
          <text key={label} x="18" y={58 + index * 59.5} className="fill-muted-foreground text-[12px] font-bold">{label}</text>
        ))}
        {type === "line" ? (
          <>
            <polygon points={area} fill={`url(#${title.replace(/\s+/g, "-")}-fill)`} />
            <polyline points={points.join(" ")} fill="none" className="animate-line-draw stroke-graph-purple" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="620" strokeDashoffset="620" />
            {pointPositions.map((point, index) => (
              <circle key={`${title}-hit-${index}`} cx={point.x} cy={point.y} r="12" className="fill-transparent" onMouseEnter={() => setHoveredIndex(index)} onMouseLeave={() => setHoveredIndex(null)} />
            ))}
          </>
        ) : (
          data.map((value, index) => {
            const barWidth = wide ? 10 : 30;
            const gap = (392 - data.length * barWidth) / Math.max(data.length - 1, 1);
            const xPos = 58 + index * (barWidth + gap);
            const height = (value / maxValue) * 238;
            return <rect key={`${title}-${index}`} x={xPos} y={292 - height} width={barWidth} height={height} rx="2" className="animate-bar-grow fill-graph-purple odd:fill-graph-blue" style={{ transformOrigin: `${xPos + barWidth / 2}px 292px`, animationDelay: `${index * 55}ms` }} onMouseEnter={() => setHoveredIndex(index)} onMouseLeave={() => setHoveredIndex(null)} />;
          })
        )}
        {hovered ? (
          <g className="pointer-events-none">
            {type === "line" ? <line x1={hovered.x} x2={hovered.x} y1="54" y2="292" className="stroke-foreground/70" /> : null}
            {type === "line" ? <circle cx={hovered.x} cy={hovered.y} r="5" className="fill-graph-purple stroke-foreground" strokeWidth="2" /> : null}
            <rect x={Math.min(hovered.x + 10, 360)} y={Math.max(hovered.y - 50, 66)} width="112" height="48" className="fill-background stroke-border" />
            <text x={Math.min(hovered.x + 20, 370)} y={Math.max(hovered.y - 29, 87)} className="fill-muted-foreground text-[11px] font-bold uppercase">{hovered.label}</text>
            <text x={Math.min(hovered.x + 20, 370)} y={Math.max(hovered.y - 8, 108)} className="fill-foreground text-[13px] font-black">value : {formatValue(hovered.value)}</text>
          </g>
        ) : null}
        {xLabels.map((label, index) => (
          <text key={`${label}-${index}`} x={58 + (index / (xLabels.length - 1)) * 392} y="330" className="fill-muted-foreground text-[12px] font-bold" textAnchor="middle">{label}</text>
        ))}
      </svg>
    </article>
  );
}

function Ethical() {
  return (
    <section id="ethical" className="bg-background py-[82px] lg:py-[120px]">
      <div className="mx-auto max-w-[1088px] px-5 lg:px-6">
        <div>
          <p className="text-[14px] font-black uppercase tracking-[0.16em] text-muted-foreground">Pillar 03: Ethical</p>
          <h2 className="mt-8 max-w-[620px] font-display text-[clamp(36px,7vw,104px)] uppercase leading-[1] text-balance">Local Growth & Sustainability</h2>
          <p className="mt-8 max-w-[560px] text-[17px] font-light leading-[1.48] text-muted-foreground lg:text-[22px] lg:leading-[1.35]">Focus on the human element. Transparent social responsibility is at our core.</p>
          <div className="mt-14 grid gap-10 sm:grid-cols-2">
            <Metric value="93%" label="Local Workforce" />
            <Metric value="450" label="WATER WELLS BUILT" />
          </div>
          <a href="mailto:FOUNDERS@MADMONKEYHOSTELS.COM" className="mt-12 inline-flex bg-foreground px-8 py-5 text-[14px] font-black uppercase tracking-[0.16em] text-background">Request Info Pack</a>
        </div>
      </div>
    </section>
  );
}

function EmailBar() {
  return (
    <footer className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-foreground text-[11px] font-black uppercase tracking-[0.42em] text-background">
      <div className="mx-auto flex h-[32px] max-w-[1184px] items-center justify-end px-6">
        <a href="mailto:FOUNDERS@MADMONKEYHOSTELS.COM">FOUNDERS@MADMONKEYHOSTELS.COM</a>
      </div>
    </footer>
  );
}