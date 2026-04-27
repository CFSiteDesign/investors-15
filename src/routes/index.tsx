import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
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

const loyalty = [6.975, 8.738, 10.941, 12.757, 13.858, 15.558, 16.966, 18.486, 20.668, 22.902, 26.459, 30.353, 36.434, 43.757, 51.575];
const guests = [12.6, 12.3, 14, 13.9, 13.2, 10.9, 10.4, 10.1, 9.6, 11.8, 12.4, 12.5];
const ages = [0.2, 1.8, 5.6, 4.2, 4.8, 6.8, 7.2, 6.6, 6.1, 5.4, 4.5, 3.9, 3.4, 2.7, 2.1, 1.8, 1.5, 1.2, 1.0, 0.8, 0.65, 0.55, 0.42, 0.31, 0.22, 0.16, 0.12, 0.08, 0.05, 0.03, 0.02];

function useScrollReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasEntered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3, rootMargin: "0px 0px -10% 0px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return { ref, hasEntered };
}

function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add("premium-reveal-in");
          observer.disconnect();
        }
      },
      { threshold: 0.3, rootMargin: "0px 0px -10% 0px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`premium-reveal ${className}`} style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}>
      {children}
    </div>
  );
}

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
      <Footer />
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
          <a href="#data" className="transition-opacity hover:opacity-60">Proven</a>
          <a href="#secure" className="transition-opacity hover:opacity-60">Scale</a>
          <a href="#ethical" className="transition-opacity hover:opacity-60">Integrity</a>
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
          <span className="hero-title-mask">
            <span className="hero-title-line hero-title-center-reveal whitespace-nowrap">15 Years Of</span>
          </span>
          <span className="hero-title-mask hero-title-mask-second">
            <span className="hero-title-line hero-title-center-reveal whitespace-nowrap">Mad Monkey</span>
          </span>
        </h1>
        <p className="hero-copy mt-[34px] max-w-[760px] text-[clamp(16px,1.75vw,28px)] font-light leading-[1.28] text-muted-foreground lg:mt-[42px]">
          Founded by backpackers for backpackers, we are Southeast Asia’s market-leading, socially responsible travel platform headquartered in Singapore and operating across Southeast Asia.
        </p>
        <div className="hero-copy mt-8 flex flex-wrap gap-4">
          <a href="https://www.youtube.com/watch?v=nmfMDvkykGg" className="inline-flex bg-foreground px-6 py-4 text-[13px] font-black uppercase tracking-[0.12em] text-background lg:px-8 lg:py-5 lg:text-[18px]">Watch the Film</a>
          <a href="mailto:FOUNDERS@MADMONKEYHOSTELS.COM" className="inline-flex border border-foreground px-6 py-4 text-[13px] font-black uppercase tracking-[0.12em] lg:px-8 lg:py-5 lg:text-[18px]">Get in Touch</a>
        </div>
      </div>
    </section>
  );
}

function Manifesto() {
  return (
    <section className="bg-background pb-[82px] pt-[56px] lg:pb-[116px] lg:pt-[72px]">
      <div className="mx-auto max-w-[1088px] px-5 lg:px-6">
        <div>
          <h2 className="max-w-[940px] font-display text-[clamp(26px,4.4vw,68px)] uppercase leading-[1.04] tracking-normal text-balance">
            While Southeast Asia is among the world's fastest-growing travel markets, it remains highly fragmented and underserved by branded operators.
            <span className="block text-muted-foreground">Mad Monkey provides a proven, scalable model for adventure-led hospitality across the region.</span>
          </h2>
        </div>
        <div className="mt-[36px] max-w-[760px] lg:mt-[52px]">
          <div className="space-y-6 text-[16px] font-light leading-[1.7] text-muted-foreground lg:text-[18px]">
            <p>We’re seeking strategic investment partnerships who strongly value unit level profitability since inception, and are passionate about making a difference.</p>
          </div>
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
    <div className="premium-metric">
      <p className="font-display text-[44px] uppercase leading-none tracking-normal sm:text-[60px]">{value}</p>
      <p className="mt-[10px] text-[12px] font-black uppercase leading-[1.58] tracking-[0.12em] text-muted-foreground sm:text-[13px]">{label}</p>
    </div>
  );
}

function LoyaltyChart() {
  const { ref, hasEntered } = useScrollReveal<HTMLElement>();
  const points = loyalty.map((value, index) => {
    const x = 55 + (index / (loyalty.length - 1)) * 390;
    const y = 330 - (value / 55) * 250;
    return `${x},${y}`;
  });
  const line = points.join(" ");
  const area = `55,330 ${line} 445,330`;

  return (
    <article ref={ref} className="relative h-full min-h-[408px] overflow-hidden bg-background px-[30px] py-[28px] text-foreground">
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
        {['55k', '41k', '28k', '14k', '0k'].map((label, index) => (
          <text key={label} x="26" y={84 + index * 62.5} className="fill-muted-foreground text-[12px] font-bold">{label}</text>
        ))}
        <polygon points={area} fill="url(#loyaltyFill)" />
        <polyline points={line} fill="none" className={`${hasEntered ? "animate-line-draw" : ""} stroke-graph-purple`} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="620" strokeDashoffset={hasEntered ? undefined : "620"} />
        {['Jan 25', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan 26', 'Feb', 'Mar'].map((label, index) => (
          <text key={`${label}-${index}`} x={55 + (index / (loyalty.length - 1)) * 390} y="354" className="fill-muted-foreground text-[11px] font-bold" textAnchor="middle">{label}</text>
        ))}
      </svg>
    </article>
  );
}

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div className="premium-metric border-t border-border pt-6">
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
        <Reveal>
          <img src={networkUrl} alt="Mad Monkey Global Network" loading="lazy" className="premium-image h-auto w-full grayscale" />
        </Reveal>
        <Reveal delay={110}>
          <div className="mt-8 flex items-end justify-between border-t border-border pt-8">
            <p className="text-[14px] font-black uppercase tracking-[0.16em] text-muted-foreground">Regional Demand</p>
            <p className="font-display text-[58px] leading-none lg:text-[88px]">+12.4%</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Performance() {
  return (
    <section id="secure" className="bg-secondary py-[74px] text-secondary-foreground lg:py-[96px]">
      <div className="mx-auto max-w-[1184px] px-5 lg:px-6">
        <Reveal>
          <p className="text-[14px] font-black uppercase tracking-[0.16em]">Pillar 02: SECURE</p>
          <h2 className="premium-headline mt-8 max-w-full font-display text-[clamp(50px,9.4vw,138px)] uppercase leading-[0.84]">MAD MONKEY</h2>
          <p className="mt-6 max-w-[680px] text-[18px] font-light leading-[1.3] lg:text-[25px] lg:leading-[1.22]">A proven track record of scaling adventure-focused hospitality across the region.</p>
        </Reveal>
        <Reveal delay={140}>
          <div className="mt-12 max-w-[360px] border-t border-secondary-foreground pt-6">
            <p className="font-display text-[62px] leading-none lg:text-[92px]">75%</p>
            <p className="mt-4 text-[13px] font-black uppercase tracking-[0.12em]">INCREASE IN ADVENTURE INTEREST</p>
          </div>
        </Reveal>

        <Reveal delay={80} className="mt-[104px]">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="text-[14px] font-black uppercase tracking-[0.16em]">Performance & Growth</p>
            <h3 className="mt-6 max-w-[680px] font-display text-[clamp(38px,6.2vw,92px)] uppercase leading-[1] text-balance">Data-Driven Excellence</h3>
          </div>
          <div className="border border-secondary-foreground px-6 py-5 text-right">
            <p className="text-[12px] font-black uppercase tracking-[0.16em] opacity-70">Last Updated</p>
            <p className="mt-2 text-[14px] font-black uppercase tracking-[0.14em]">APRIL 2026</p>
          </div>
        </div>
        </Reveal>
        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          <Chart type="line" title="Loyalty Members" subtitle="Cumulative Growth 2025-26" data={loyalty} maxValue={55} x="Jan 25,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec,Jan 26,Feb,Mar" y="55k,41k,28k,14k,0k" />
          <Chart type="bar" title="Guests Per Month" subtitle="2025 Performance" data={guests} maxValue={14} x="Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec" y="14k,10.5k,7k,3.5k,0k" />
          <Chart type="bar" wide title="Age Distribution" subtitle="2025 Guest Demographics" data={ages} maxValue={8} x="18,21,24,27,30,33,36,39,42,45,48" y="8k,6k,4k,2k,0k" />
        </div>
      </div>
    </section>
  );
}

function Chart({ title, subtitle, data, x, y, type, maxValue, wide = false }: { title: string; subtitle: string; data: number[]; x: string; y: string; type: "line" | "bar"; maxValue: number; wide?: boolean }) {
  const { ref, hasEntered } = useScrollReveal<HTMLElement>();
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
    <article ref={ref} className={`border border-border bg-background px-7 py-6 text-foreground ${wide ? "lg:col-span-2" : ""}`}>
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
            <polyline points={points.join(" ")} fill="none" className={`${hasEntered ? "animate-line-draw" : ""} stroke-graph-purple`} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="620" strokeDashoffset={hasEntered ? undefined : "620"} />
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
            return <rect key={`${title}-${index}`} x={xPos} y={292 - height} width={barWidth} height={height} rx="2" className={`${hasEntered ? "animate-bar-grow" : "chart-bar-hidden"} fill-graph-purple odd:fill-graph-blue`} style={{ transformOrigin: `${xPos + barWidth / 2}px 292px`, animationDelay: hasEntered ? `${index * 55}ms` : "0ms" }} onMouseEnter={() => setHoveredIndex(index)} onMouseLeave={() => setHoveredIndex(null)} />;
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
        <Reveal>
          <p className="text-[14px] font-black uppercase tracking-[0.16em] text-muted-foreground">Pillar 03: Ethical</p>
          <h2 className="mt-8 max-w-[760px] font-display text-[clamp(36px,7vw,104px)] uppercase leading-[1] text-balance">Local Growth&nbsp;&amp; Sustainability</h2>
          <p className="mt-8 max-w-[560px] text-[17px] font-light leading-[1.48] text-muted-foreground lg:text-[22px] lg:leading-[1.35]">Focus on the human element. Transparent social responsibility is at our core.</p>
        </Reveal>
        <Reveal delay={120}>
          <div className="mt-14 grid gap-10 sm:grid-cols-2">
            <Metric value="93%" label="Local Workforce" />
            <Metric value="450" label="WATER WELLS BUILT" />
          </div>
        </Reveal>
        <Reveal delay={180}>
          <a href="mailto:FOUNDERS@MADMONKEYHOSTELS.COM" className="mt-12 inline-flex bg-foreground px-8 py-5 text-[14px] font-black uppercase tracking-[0.16em] text-background">Request Info Pack</a>
        </Reveal>
      </div>
    </section>
  );
}

const footerLinks = ["About Us", "Locations", "Investors", "Sustainability", "Press", "Careers"];

function Footer() {
  return (
    <footer className="border-t border-border bg-background px-6 pb-20 pt-10 text-foreground md:px-12 md:py-16 md:pb-24 lg:px-24">
      <div className="mb-8 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <img src={madMonkeyLogo} alt="Mad Monkey Hostels" loading="lazy" className="mb-8 h-12 w-auto object-contain md:h-16" />
          <div className="space-y-4">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Navigation</p>
            <ul className="grid grid-cols-2 gap-4 text-[14px] font-black uppercase tracking-[0.16em]">
              {footerLinks.map((label) => (
                <li key={label}>
                  <a href="#" className="transition-opacity hover:opacity-60">{label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="lg:col-span-8">
          <p className="mb-6 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Latest from LinkedIn</p>
          <div className="h-[400px] w-full overflow-hidden border border-border bg-muted/20">
            <iframe src="https://www.linkedin.com/embed/feed/update/urn:li:activity:7437354283815165954" height="400" width="100%" frameBorder="0" allowFullScreen title="Embedded LinkedIn Post" className="h-full w-full grayscale transition-all duration-500 hover:grayscale-0" />
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-between gap-8 border-t border-border pt-12 md:flex-row">
        <p className="text-[10px] font-black uppercase tracking-[0.16em] text-muted-foreground">© 2026 Mad Monkey Hostels. All Rights Reserved.</p>
        <div className="flex gap-8 text-[10px] font-black uppercase tracking-[0.16em] text-muted-foreground">
          <a href="#" className="transition-opacity hover:opacity-100">Privacy Policy</a>
          <a href="#" className="transition-opacity hover:opacity-100">Terms of Service</a>
        </div>
      </div>
    </footer>
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