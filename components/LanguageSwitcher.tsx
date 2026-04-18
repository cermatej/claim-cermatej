"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("language");

  const switchTo = (next: "cs" | "en") => {
    if (next === locale) return;
    router.replace(pathname, { locale: next });
  };

  return (
    <div
      className="inline-flex rounded-full bg-white/80 p-1 text-xs font-medium ring-1 ring-slate-200 backdrop-blur"
      role="group"
      aria-label={t("label")}
    >
      {(["cs", "en"] as const).map((l) => {
        const active = l === locale;
        return (
          <button
            key={l}
            type="button"
            onClick={() => switchTo(l)}
            aria-pressed={active}
            className={
              active
                ? "rounded-full bg-brand-600 px-3 py-1 text-white shadow-sm"
                : "rounded-full px-3 py-1 text-slate-600 hover:text-slate-900"
            }
          >
            {l.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
}
