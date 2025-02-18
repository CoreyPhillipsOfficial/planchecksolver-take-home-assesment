
"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [processing, setProcessing] = useState(false);
  const [status, setStatus] = useState<{
    total: number;
    completed: number;
    failed: number;
    individual: Record<string, string>;
  }>({ total: 0, completed: 0, failed: 0, individual: {} });

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <main className="text-center">
        <button
          className="inline-flex items-center bg-black justify-center gap-2 rounded-lg text-sm font-medium focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-white hover:bg-black/80 h-11 px-8 py-2 shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5"
        >
          Start Process
        </button>
      </main>
    </div>
  );
}