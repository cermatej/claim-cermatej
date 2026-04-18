import { useTranslations } from "next-intl";
import ParallaxLayer from "./ParallaxLayer";

export default function YourRights() {
  const t = useTranslations("rights");
  const tiers = ["short", "medium", "long"] as const;

  return (
    <section id="rights" className="relative isolate overflow-hidden py-24">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-b from-brand-50 via-white to-white"
      />
      <ParallaxLayer
        speed={0.18}
        className="absolute right-[-6%] top-10 -z-10"
      >
        <div className="h-80 w-80 rounded-full bg-brand-200/50 blur-3xl" />
      </ParallaxLayer>
      <ParallaxLayer
        speed={0.1}
        className="absolute left-[-10%] bottom-0 -z-10"
      >
        <div className="h-64 w-64 rounded-full bg-brand-100/60 blur-3xl" />
      </ParallaxLayer>

      <div className="container-p">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-3 text-slate-600">{t("subtitle")}</p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {tiers.map((key, i) => (
            <div
              key={key}
              className="card flex flex-col items-start gap-3"
              style={{ transform: `translateY(${i === 1 ? -8 : 0}px)` }}
            >
              <span className="pill">{t(`tiers.${key}.range`)}</span>
              <p className="text-5xl font-semibold tracking-tight text-brand-700">
                {t(`tiers.${key}.amount`)}
              </p>
              <p className="text-sm leading-relaxed text-slate-600">
                {t(`tiers.${key}.desc`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
