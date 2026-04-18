"use client";

import { useTranslations, useLocale } from "next-intl";
import type { Eligibility } from "@/lib/eu261";
import { cn } from "@/lib/cn";

type Props = {
  eligibility: Eligibility;
  distanceKm: number | null;
};

export default function CompensationCard({ eligibility, distanceKm }: Props) {
  const t = useTranslations("compensation");
  const tForm = useTranslations("form");
  const tNav = useTranslations("nav");
  const locale = useLocale();
  const { eligible, amount, reason } = eligibility;

  const formattedAmount = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(amount);

  return (
    <div
      className={cn(
        "flex h-full flex-col justify-between rounded-3xl p-6 ring-1 transition",
        eligible
          ? "bg-gradient-to-br from-brand-600 to-brand-500 text-white shadow-float ring-brand-500"
          : "bg-white text-slate-700 shadow-card ring-slate-100",
      )}
      aria-live="polite"
    >
      <div>
        <p
          className={cn(
            "text-xs font-medium uppercase tracking-wide",
            eligible ? "text-brand-100" : "text-slate-500",
          )}
        >
          {t("title")}
        </p>
        <div className="mt-4 flex items-baseline gap-2">
          {reason === "missing" ? (
            <span
              className={cn(
                "text-4xl font-semibold",
                eligible ? "text-white" : "text-slate-400",
              )}
            >
              —
            </span>
          ) : (
            <>
              <span className="text-5xl font-semibold tracking-tight sm:text-6xl">
                {formattedAmount}
              </span>
              <span
                className={cn(
                  "text-sm",
                  eligible ? "text-brand-100" : "text-slate-500",
                )}
              >
                / {t("perPassenger")}
              </span>
            </>
          )}
        </div>
        <p
          className={cn(
            "mt-3 text-sm leading-relaxed",
            eligible ? "text-brand-50" : "text-slate-600",
          )}
        >
          {eligible
            ? t("eligible")
            : reason === "missing"
              ? t("reason.missing")
              : t("notEligible")}
        </p>
        <p
          className={cn(
            "mt-2 text-xs leading-relaxed",
            eligible ? "text-brand-100/90" : "text-slate-500",
          )}
        >
          {reason !== "missing" && t(`reason.${reason}`)}
        </p>
        {distanceKm != null && (
          <p
            className={cn(
              "mt-3 text-xs",
              eligible ? "text-brand-100/80" : "text-slate-400",
            )}
          >
            {tForm("distance", { km: Math.round(distanceKm).toLocaleString(locale) })}
          </p>
        )}
      </div>
      <div className="mt-6">
        <button
          type="button"
          disabled={!eligible}
          className={cn(
            "inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition",
            eligible
              ? "bg-white text-brand-700 hover:bg-brand-50"
              : "bg-slate-100 text-slate-400",
          )}
        >
          {tNav("cta")}
          <svg
            viewBox="0 0 24 24"
            aria-hidden
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14M13 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
