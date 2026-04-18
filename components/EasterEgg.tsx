"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

type Company = {
  key: "google" | "microsoft" | "apple";
  name: string;
  email: string;
  subject: string;
  opening: string;
  pitch: string;
  accent: string;
};

const COMPANIES: Company[] = [
  {
    key: "google",
    name: "Google",
    email: "careers@google.com",
    subject: "Application — C# / .NET Developer",
    opening: "Dear Google Hiring Team,",
    pitch:
      "I've been building production systems on C# and .NET for years — high-throughput services, messaging pipelines, and clean domain models. What draws me to Google is the combination of scale and engineering rigor, and I'd love to contribute to teams working on Ads infrastructure or Google Cloud where C#/.NET meets distributed systems at a scale few other places can match.",
    accent: "from-[#4285F4] via-[#EA4335] to-[#FBBC05]",
  },
  {
    key: "microsoft",
    name: "Microsoft",
    email: "careers@microsoft.com",
    subject: "Application — Senior C# Developer",
    opening: "Dear Microsoft Hiring Team,",
    pitch:
      "C# is the language I grew up on professionally. I've shipped ASP.NET Core APIs, Blazor front-ends and Azure Functions; I follow the language team's work closely and value the craft that goes into the runtime. Joining Microsoft — ideally around .NET platform, Azure App Services, or the Developer Division — would let me give back to the ecosystem I've relied on every day.",
    accent: "from-[#F25022] via-[#7FBA00] to-[#00A4EF]",
  },
  {
    key: "apple",
    name: "Apple",
    email: "jobs@apple.com",
    subject: "Application — C# / .NET Developer (Services)",
    opening: "Dear Apple Recruiting Team,",
    pitch:
      "I know Apple is a Swift-first company, but the services behind the App Store, Apple Music and iCloud run on a polyglot stack where .NET quietly plays a role. I'd bring a decade of C# experience — careful, reliable, well-tested backend work — and a long-standing appreciation for how Apple thinks about product detail. I'd be thrilled to help on a services team.",
    accent: "from-[#a1a1a6] via-[#1d1d1f] to-[#a1a1a6]",
  },
];

const KONAMI = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

export default function EasterEgg() {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<Company["key"]>("google");

  useEffect(() => {
    let buffer: string[] = [];
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      buffer.push(key);
      if (buffer.length > KONAMI.length) buffer = buffer.slice(-KONAMI.length);
      if (
        buffer.length === KONAMI.length &&
        buffer.every((k, i) => k === KONAMI[i])
      ) {
        setOpen(true);
        buffer = [];
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  const active = COMPANIES.find((c) => c.key === tab)!;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="easter-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 px-4 py-8 backdrop-blur-sm"
      onClick={() => setOpen(false)}
    >
      <div
        className="relative w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className={cn("h-1.5 w-full bg-gradient-to-r", active.accent)} />

        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-amber-100 text-sm">
              🥚
            </span>
            <p
              id="easter-title"
              className="text-sm font-semibold tracking-tight text-slate-900"
            >
              A small easter egg — job application
            </p>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close"
            className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
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
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        </div>

        <div className="flex gap-1 border-b border-slate-100 px-4 pt-3">
          {COMPANIES.map((c) => (
            <button
              key={c.key}
              type="button"
              onClick={() => setTab(c.key)}
              className={cn(
                "rounded-t-xl px-4 py-2 text-sm font-medium transition",
                tab === c.key
                  ? "bg-slate-50 text-slate-900"
                  : "text-slate-500 hover:text-slate-700",
              )}
            >
              {c.name}
            </button>
          ))}
        </div>

        <div className="max-h-[65vh] overflow-y-auto bg-slate-50 p-6">
          <div className="space-y-1 text-xs text-slate-500">
            <p>
              <span className="font-semibold text-slate-400">To:</span>{" "}
              <span className="font-mono text-slate-700">{active.email}</span>
            </p>
            <p>
              <span className="font-semibold text-slate-400">From:</span>{" "}
              <span className="font-mono text-slate-700">
                jakub.kastner@example.com
              </span>
            </p>
            <p>
              <span className="font-semibold text-slate-400">Subject:</span>{" "}
              <span className="text-slate-800">{active.subject}</span>
            </p>
          </div>

          <article className="mt-5 rounded-2xl bg-white p-6 text-sm leading-relaxed text-slate-700 shadow-sm ring-1 ring-slate-100">
            <p className="font-medium text-slate-900">{active.opening}</p>
            <p className="mt-4">
              My name is{" "}
              <span className="font-semibold text-slate-900">
                Jakub Kastner
              </span>{" "}
              and I'd like to apply for a C# developer role at {active.name}.
            </p>
            <p className="mt-4">{active.pitch}</p>
            <p className="mt-4">
              I'm comfortable across the .NET stack — ASP.NET Core, EF Core,
              xUnit, gRPC, Dapper, Blazor — and I enjoy the boring-but-correct
              parts: boundaries, observability, tests that actually fail for
              the right reason. I'm happy to share code samples, contributions,
              and references on request.
            </p>
            <p className="mt-4">
              Thank you for considering my application. I'd love to talk.
            </p>
            <p className="mt-6">
              Sincerely,
              <br />
              <span className="font-[cursive] text-xl text-slate-900 [font-family:ui-serif,Georgia,serif] italic">
                Jakub Kastner
              </span>
            </p>
          </article>

          <p className="mt-4 text-center text-xs text-slate-400">
            You found the easter egg. Press{" "}
            <kbd className="rounded border border-slate-200 bg-white px-1.5 py-0.5 font-mono text-[10px]">
              Esc
            </kbd>{" "}
            to close.
          </p>
        </div>
      </div>
    </div>
  );
}
