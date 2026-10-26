"use client";

import { useState } from "react";
import Glass from "@/components/Glass";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// 目前只做前端驗證與成功提示，尚未把 Email 存到任何地方
export default function SubscribeForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const value = email.trim();
    if (!value) {
      setError("請先輸入你的 Email");
    } else if (!EMAIL_PATTERN.test(value)) {
      setError("Email 格式不正確，請確認後再試一次（例如 name@example.com）");
    } else {
      setError("");
      setDone(true);
    }
  };

  if (done) {
    return (
      <Glass className="animate-pop-in mx-auto mt-8 max-w-lg px-6 py-6 sm:mt-10">
        <p className="text-3xl">🥭</p>
        <p className="mt-3 font-serif text-xl text-amber-200">訂閱成功！</p>
        <p className="mt-2 text-sm leading-relaxed text-stone-300">
          請靜候好消息，開賣時我們會第一時間通知你。
        </p>
      </Glass>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="mx-auto mt-8 max-w-lg sm:mt-10">
      <Glass
        className={`flex items-center gap-2 rounded-full p-1.5 transition sm:p-2 ${error ? "outline-1 outline-rose-300/70" : ""}`}
      >
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (error) setError("");
          }}
          placeholder="輸入你的 Email"
          aria-label="Email"
          aria-invalid={!!error}
          aria-describedby={error ? "subscribe-error" : undefined}
          className="min-w-0 flex-1 bg-transparent px-4 py-2 text-base placeholder:text-stone-500 focus:outline-none sm:px-5 sm:text-sm"
        />
        <button
          type="submit"
          className="shrink-0 rounded-full bg-amber-300 px-5 py-2.5 text-sm font-medium text-stone-900 transition hover:bg-amber-200 sm:px-6"
        >
          訂閱通知
        </button>
      </Glass>
      {error && (
        <p id="subscribe-error" role="alert" className="animate-fade-in mt-3 text-sm text-rose-300">
          {error}
        </p>
      )}
    </form>
  );
}
