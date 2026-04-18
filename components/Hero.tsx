import { useTranslations } from "next-intl";
import ClaimForm from "./ClaimForm";
import ParallaxLayer from "./ParallaxLayer";

export default function Hero() {
  const t = useTranslations("hero");

  const title = t.rich("title", {
    accent: (chunks) => (
      <span className="bg-gradient-to-r from-brand-600 to-brand-400 bg-clip-text text-transparent">
        {chunks}
      </span>
    ),
  });

  return (
    <section className="relative isolate overflow-hidden pt-10 pb-16 sm:pt-16 sm:pb-24">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-hero-gradient"
      />
      <Clouds />

      <div className="container-p grid items-start gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
        <div className="pt-6">
          <span className="pill">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
            {t("eyebrow")}
          </span>
          <h1 className="mt-5 text-4xl font-semibold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-600">
            {t("subtitle")}
          </p>
          <p className="mt-6 text-sm text-slate-500">{t("trust")}</p>
        </div>

        <div className="relative">
          <ParallaxLayer speed={0.05} className="absolute -right-6 -top-6 -z-10 hidden lg:block">
            <div className="h-40 w-40 rounded-full bg-brand-200/60 blur-3xl" />
          </ParallaxLayer>
          <ClaimForm />
        </div>
      </div>
    </section>
  );
}

function Clouds() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      <ParallaxLayer speed={0.12} className="absolute left-[5%] top-16">
        <Cloud className="h-14 w-28 text-white/90 cloud" />
      </ParallaxLayer>
      <ParallaxLayer speed={0.08} className="absolute left-[60%] top-6">
        <Cloud className="h-20 w-40 text-white/80 cloud" />
      </ParallaxLayer>
      <ParallaxLayer speed={0.16} className="absolute right-[8%] top-28">
        <Cloud className="h-16 w-32 text-white/70 cloud" />
      </ParallaxLayer>
      <ParallaxLayer speed={0.22} className="absolute left-[-2%] bottom-10">
        <Cloud className="h-24 w-56 text-white/80 cloud" />
      </ParallaxLayer>
      <ParallaxLayer speed={0.3} className="absolute right-[15%] bottom-4">
        <Plane className="h-10 w-10 text-brand-700/70" />
      </ParallaxLayer>
    </div>
  );
}

function Cloud({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 100" className={className} fill="currentColor">
      <ellipse cx="60" cy="60" rx="50" ry="28" />
      <ellipse cx="110" cy="52" rx="44" ry="30" />
      <ellipse cx="150" cy="62" rx="34" ry="22" />
      <ellipse cx="95" cy="70" rx="55" ry="20" />
    </svg>
  );
}

function Plane({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 16 22 7l-5 15-5-6-3 3-1-3-6-0Z" />
    </svg>
  );
}
