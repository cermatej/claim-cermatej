import { useTranslations } from "next-intl";

export default function HowItWorks() {
  const t = useTranslations("howItWorks");
  const steps = ["check", "submit", "getPaid"] as const;

  return (
    <section id="how" className="py-20">
      <div className="container-p">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-3 text-slate-600">{t("subtitle")}</p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((key, i) => (
            <div
              key={key}
              className="card relative overflow-hidden"
            >
              <span
                aria-hidden
                className="absolute right-4 top-4 text-6xl font-bold text-brand-100"
              >
                {i + 1}
              </span>
              <h3 className="text-lg font-semibold text-slate-900">
                {t(`steps.${key}.title`)}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {t(`steps.${key}.text`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
