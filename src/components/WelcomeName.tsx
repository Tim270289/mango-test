"use client";

import { editVisitorName, useVisitorName } from "@/lib/visitor";

// 導覽列上的小招呼，點擊可以修改稱呼
export function HeaderGreeting() {
  const name = useVisitorName();
  if (!name) return null;

  return (
    <button
      type="button"
      onClick={editVisitorName}
      title="修改稱呼"
      className="hidden max-w-[10rem] truncate text-sm text-stone-300 transition hover:text-amber-200 lg:block"
    >
      嗨，{name} 👋
    </button>
  );
}

// 首頁主視覺上方的歡迎標語
export function HeroWelcome() {
  const name = useVisitorName();

  return (
    <p
      className={`mb-6 font-serif text-lg text-amber-100 transition duration-700 sm:text-xl ${name ? "opacity-100" : "invisible opacity-0"}`}
    >
      歡迎你，<span className="text-amber-300">{name || "　"}</span>
      <button
        type="button"
        onClick={editVisitorName}
        className="ml-3 align-middle text-xs text-stone-500 underline-offset-4 transition hover:text-amber-200 hover:underline"
      >
        修改
      </button>
    </p>
  );
}
