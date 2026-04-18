"use client";

import { useEffect } from "react";

export default function RootRedirect() {
  useEffect(() => {
    const preferred =
      typeof navigator !== "undefined" && navigator.language?.toLowerCase().startsWith("cs")
        ? "cs"
        : "en";
    const path = window.location.pathname;
    const base = path.endsWith("/") ? path : path + "/";
    window.location.replace(base + preferred + "/");
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <p className="text-sm text-slate-500">Loading…</p>
    </div>
  );
}
