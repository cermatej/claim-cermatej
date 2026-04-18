import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-slate-100 bg-white/70 py-10">
      <div className="container-p grid gap-6 text-sm text-slate-500 md:grid-cols-[1fr_auto] md:items-start">
        <div>
          <div className="flex items-center gap-2 text-slate-900">
            <span
              aria-hidden
              className="inline-flex h-6 w-6 items-center justify-center rounded-xl bg-brand-600 text-white"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-3 w-3"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M10 13 2 9.5 4 7l9 2 5-5 2 1-3 6 6 3-1 2-8-1-3 5-2-1 1-7Z" />
              </svg>
            </span>
            <span className="font-semibold">FlightRefund</span>
          </div>
          <p className="mt-3 max-w-lg leading-relaxed">{t("tagline")}</p>
          <p className="mt-4 max-w-lg text-xs leading-relaxed text-slate-400">
            {t("disclaimer")}
          </p>
        </div>
        <p className="text-xs text-slate-400 md:text-right">
          © {year} FlightRefund. {t("rights")}
        </p>
      </div>
    </footer>
  );
}
