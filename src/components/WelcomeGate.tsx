"use client";

import { useEffect, useState } from "react";
import Glass from "@/components/Glass";
import {
  cancelEditVisitorName,
  saveVisitorName,
  useEditingVisitorName,
  useVisitorName,
} from "@/lib/visitor";

const DEFAULT_NAME = "貴賓";
const MAX_LENGTH = 12;

export default function WelcomeGate() {
  const name = useVisitorName();
  const editing = useEditingVisitorName();
  const open = name === null || editing;

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;
  return <WelcomeDialog initialName={name ?? ""} />;
}

function WelcomeDialog({ initialName }: { initialName: string }) {
  const [value, setValue] = useState(initialName === DEFAULT_NAME ? "" : initialName);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    saveVisitorName(value.trim() || DEFAULT_NAME);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="welcome-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <div className="animate-fade-in absolute inset-0 bg-black/70 backdrop-blur-md" />

      <Glass className="animate-pop-in relative w-full max-w-sm p-6 text-center sm:p-8">
        <span className="text-5xl">🥭</span>
        <p className="mt-4 text-xs tracking-[0.4em] text-amber-200/80">WELCOME</p>
        <h2 id="welcome-title" className="mt-3 font-serif text-2xl">
          歡迎來到金穗果園
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-stone-400">該怎麼稱呼你呢？</p>

        <form onSubmit={submit} className="mt-6 space-y-3">
          <input
            autoFocus
            value={value}
            onChange={(e) => setValue(e.target.value)}
            maxLength={MAX_LENGTH}
            placeholder="輸入你的稱呼"
            aria-label="你的稱呼"
            className="w-full rounded-full border border-white/15 bg-white/5 px-5 py-3 text-center text-base placeholder:text-stone-500 focus:border-amber-200/60 focus:outline-none"
          />
          <button
            type="submit"
            className="w-full rounded-full bg-linear-to-r from-amber-300 to-orange-400 py-3 font-medium text-stone-900 shadow-lg shadow-orange-500/30 transition hover:brightness-110"
          >
            {value.trim() ? "進入官網" : `以「${DEFAULT_NAME}」身分進入`}
          </button>
          {initialName && (
            <button
              type="button"
              onClick={cancelEditVisitorName}
              className="w-full py-2 text-sm text-stone-400 transition hover:text-stone-200"
            >
              取消
            </button>
          )}
        </form>
      </Glass>
    </div>
  );
}
