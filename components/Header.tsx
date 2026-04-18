import { useTranslations } from "next-intl";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Header() {
  const t = useTranslations("nav");
  return (
    <header className="sticky top-0 z-40 border-b border-white/50 bg-white/70 backdrop-blur">
      <div className="container-p flex h-16 items-center justify-between">
        <a href="#" className="flex items-center gap-2">
          <span
            aria-hidden
            className="inline-flex h-8 w-8 items-center justify-center rounded-2xl bg-brand-600 text-white shadow-float"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M10 13 2 9.5 4 7l9 2 5-5 2 1-3 6 6 3-1 2-8-1-3 5-2-1 1-7Z" />
            </svg>
          </span>
          <span className="text-base font-semibold tracking-tight text-slate-900">
            FlightRefund
          </span>
        </a>

        <nav className="hidden items-center gap-6 text-sm text-slate-600 md:flex">
          <a href="#how" className="hover:text-slate-900">
            {t("howItWorks")}
          </a>
          <a href="#rights" className="hover:text-slate-900">
            {t("rights")}
          </a>
          <a href="#faq" className="hover:text-slate-900">
            {t("faq")}
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <a href="#claim" className="btn-primary hidden sm:inline-flex">
            {t("cta")}
          </a>
        </div>
      </div>
    </header>
  );
}
