"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Glass from "@/components/Glass";

const WIN_RATE = 0.1;
const DRAW_DURATION = 1800;

type Status = "idle" | "drawing" | "win" | "lose";

function createCouponCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return `MANGO90-${code}`;
}

export default function LuckyDraw() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [coupon, setCoupon] = useState("");
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const close = useCallback(() => {
    clearTimeout(timer.current);
    setOpen(false);
    setStatus("idle");
    setCopied(false);
  }, []);

  // 開啟時鎖住背景捲動，並支援 Esc 關閉
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  useEffect(() => () => clearTimeout(timer.current), []);

  const pathname = usePathname();

  const draw = () => {
    setStatus("drawing");
    setCopied(false);
    timer.current = setTimeout(() => {
      if (Math.random() < WIN_RATE) {
        setCoupon(createCouponCode());
        setStatus("win");
      } else {
        setStatus("lose");
      }
    }, DRAW_DURATION);
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(coupon);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  // 遊戲頁不顯示，避免浮動按鈕擋住遊戲畫面
  if (pathname === "/game") return null;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed right-4 bottom-4 z-30 flex items-center gap-2 rounded-full border border-amber-200/40 bg-linear-to-r from-amber-300 to-orange-400 py-3 pr-5 pl-4 text-sm font-medium text-stone-900 shadow-lg shadow-orange-500/40 transition hover:scale-105 sm:right-8 sm:bottom-8"
      >
        <span className="text-lg leading-none">🎁</span>
        幸運抽獎
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="lucky-draw-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <div className="animate-fade-in absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={close} />

          <Glass className="animate-pop-in relative w-full max-w-sm p-6 text-center sm:p-8">
            <button
              type="button"
              onClick={close}
              aria-label="關閉"
              className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full text-stone-400 transition hover:bg-white/10 hover:text-stone-100"
            >
              ✕
            </button>

            <p className="text-xs tracking-[0.4em] text-amber-200/80">LUCKY DRAW</p>
            <h2 id="lucky-draw-title" className="mt-3 font-serif text-2xl">
              芒果幸運抽
            </h2>

            <div className="my-8 flex h-32 items-center justify-center">
              {status === "idle" && <span className="text-7xl">🥭</span>}
              {status === "drawing" && <span className="animate-shake text-7xl">🥭</span>}
              {status === "win" && (
                <div className="animate-pop-in w-full rounded-2xl border border-dashed border-amber-200/60 bg-amber-200/10 px-4 py-5">
                  <p className="font-serif text-4xl text-amber-200">9 折</p>
                  <p className="mt-2 text-xs text-stone-400">芒果購買優惠券</p>
                  <p className="mt-3 font-mono text-lg tracking-wider text-stone-100">{coupon}</p>
                </div>
              )}
              {status === "lose" && (
                <div className="animate-pop-in">
                  <span className="text-6xl">🍃</span>
                  <p className="mt-3 text-stone-300">差一點點！再試一次吧</p>
                </div>
              )}
            </div>

            {status === "idle" && (
              <p className="mb-6 text-sm leading-relaxed text-stone-400">
                每次抽獎有 10% 機會獲得
                <br />
                芒果 9 折優惠券
              </p>
            )}
            {status === "win" && (
              <p className="mb-6 text-sm leading-relaxed text-stone-400">
                恭喜中獎！結帳時輸入優惠碼即可使用
              </p>
            )}

            {status === "win" ? (
              <button
                type="button"
                onClick={copy}
                className="w-full rounded-full bg-amber-300 py-3 font-medium text-stone-900 transition hover:bg-amber-200"
              >
                {copied ? "已複製 ✓" : "複製優惠碼"}
              </button>
            ) : (
              <button
                type="button"
                onClick={draw}
                disabled={status === "drawing"}
                className="w-full rounded-full bg-linear-to-r from-amber-300 to-orange-400 py-3 font-medium text-stone-900 shadow-lg shadow-orange-500/30 transition hover:brightness-110 disabled:cursor-wait disabled:opacity-70"
              >
                {status === "drawing" ? "抽獎中…" : status === "lose" ? "再抽一次" : "開始抽獎"}
              </button>
            )}
          </Glass>
        </div>
      )}
    </>
  );
}
