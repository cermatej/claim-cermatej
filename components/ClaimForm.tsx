"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import AirportAutocomplete from "./AirportAutocomplete";
import CompensationCard from "./CompensationCard";
import { type Airport } from "@/lib/airports";
import { haversineKm } from "@/lib/distance";
import { computeCompensation } from "@/lib/eu261";

export default function ClaimForm() {
  const t = useTranslations("form");
  const [from, setFrom] = useState<Airport | null>(null);
  const [to, setTo] = useState<Airport | null>(null);
  const [delay, setDelay] = useState(3);

  const distanceKm = useMemo(() => {
    if (!from || !to) return null;
    return haversineKm(from.lat, from.lon, to.lat, to.lon);
  }, [from, to]);

  const eligibility = useMemo(
    () =>
      computeCompensation({
        distanceKm,
        delayHours: delay,
        bothEU: !!(from?.eu && to?.eu),
      }),
    [distanceKm, delay, from, to],
  );

  const swap = () => {
    setFrom(to);
    setTo(from);
  };

  return (
    <div id="claim" className="grid gap-4 md:grid-cols-[1.3fr_1fr]">
      <div className="card">
        <div className="grid gap-4">
          <AirportAutocomplete
            value={from}
            onChange={setFrom}
            label={t("from")}
            placeholder={t("fromPlaceholder")}
          />
          <div className="flex items-center justify-center">
            <button
              type="button"
              onClick={swap}
              className="btn-ghost -my-2"
              aria-label={t("swap")}
            >
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
                <path d="M7 7h14M7 7l4-4M7 7l4 4M17 17H3M17 17l-4-4M17 17l-4 4" />
              </svg>
              {t("swap")}
            </button>
          </div>
          <AirportAutocomplete
            value={to}
            onChange={setTo}
            label={t("to")}
            placeholder={t("toPlaceholder")}
          />
          <div>
            <div className="flex items-end justify-between">
              <label htmlFor="delay" className="label-base">
                {t("delay")}
              </label>
              <span className="text-sm font-semibold text-brand-700">
                {t("delayHours", { hours: delay })}
              </span>
            </div>
            <input
              id="delay"
              type="range"
              min={0}
              max={12}
              step={1}
              value={delay}
              onChange={(e) => setDelay(Number(e.target.value))}
              className="w-full accent-brand-600"
            />
            <div className="mt-1 flex justify-between text-[10px] uppercase tracking-wide text-slate-400">
              <span>0 h</span>
              <span>3 h</span>
              <span>6 h</span>
              <span>9 h</span>
              <span>12 h</span>
            </div>
          </div>
        </div>
      </div>

      <CompensationCard
        eligibility={eligibility}
        distanceKm={distanceKm}
      />
    </div>
  );
}
