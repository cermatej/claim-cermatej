"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { type Airport, searchAirports } from "@/lib/airports";
import { cn } from "@/lib/cn";

type Props = {
  value: Airport | null;
  onChange: (a: Airport | null) => void;
  label: string;
  placeholder: string;
};

export default function AirportAutocomplete({
  value,
  onChange,
  label,
  placeholder,
}: Props) {
  const t = useTranslations("form");
  const listId = useId();
  const [query, setQuery] = useState(value ? formatAirport(value) : "");
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setQuery(value ? formatAirport(value) : "");
  }, [value]);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!wrapperRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const results = useMemo(() => {
    const q = value && query === formatAirport(value) ? "" : query;
    return searchAirports(q, 8);
  }, [query, value]);

  const commit = (a: Airport) => {
    onChange(a);
    setQuery(formatAirport(a));
    setOpen(false);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!open && (e.key === "ArrowDown" || e.key === "Enter")) {
      setOpen(true);
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const pick = results[activeIndex];
      if (pick) commit(pick);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  return (
    <div ref={wrapperRef} className="relative">
      <label className="label-base">{label}</label>
      <input
        type="text"
        className="input-base"
        placeholder={placeholder}
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
          setActiveIndex(0);
          if (value) onChange(null);
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={onKeyDown}
        role="combobox"
        aria-expanded={open}
        aria-controls={listId}
        aria-autocomplete="list"
      />
      {open && results.length > 0 && (
        <ul
          id={listId}
          role="listbox"
          className="absolute z-30 mt-2 max-h-80 w-full overflow-auto rounded-2xl bg-white p-1 shadow-float ring-1 ring-slate-100"
        >
          {results.map((a, i) => (
            <li
              key={a.iata}
              role="option"
              aria-selected={i === activeIndex}
              onMouseDown={(e) => {
                e.preventDefault();
                commit(a);
              }}
              onMouseEnter={() => setActiveIndex(i)}
              className={cn(
                "flex cursor-pointer items-center justify-between gap-3 rounded-xl px-3 py-2 text-sm",
                i === activeIndex
                  ? "bg-brand-50 text-brand-900"
                  : "text-slate-700 hover:bg-slate-50",
              )}
            >
              <span className="flex min-w-0 flex-col">
                <span className="truncate font-medium">
                  {a.city}{" "}
                  <span className="text-slate-400">· {a.country}</span>
                </span>
                <span className="truncate text-xs text-slate-500">
                  {a.name}
                </span>
              </span>
              <span className="rounded-md bg-slate-100 px-2 py-0.5 font-mono text-xs text-slate-600">
                {a.iata}
              </span>
            </li>
          ))}
        </ul>
      )}
      {open && results.length === 0 && (
        <div className="absolute z-30 mt-2 w-full rounded-2xl bg-white p-3 text-sm text-slate-500 shadow-float ring-1 ring-slate-100">
          {t("noAirport")}
        </div>
      )}
    </div>
  );
}

function formatAirport(a: Airport): string {
  return `${a.city} (${a.iata})`;
}
