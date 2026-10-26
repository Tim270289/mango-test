"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Glass from "@/components/Glass";

const GAME_DURATION = 15;
const BEST_KEY = "mango-game-best";

type ItemKind = "mango" | "golden" | "leaf";
type Item = { x: number; y: number; vy: number; kind: ItemKind; rot: number; spin: number };
type Popup = { x: number; y: number; text: string; color: string; life: number };
type Phase = "ready" | "playing" | "over";

const ITEMS: Record<ItemKind, { emoji: string; points: number; size: number; color: string }> = {
  mango: { emoji: "🥭", points: 1, size: 40, color: "#fde68a" },
  golden: { emoji: "🥭", points: 3, size: 46, color: "#fbbf24" },
  leaf: { emoji: "🍂", points: -1, size: 36, color: "#fca5a5" },
};

// 最高分存在 localStorage，用 useSyncExternalStore 讀取以避免伺服器與瀏覽器渲染不一致
const bestListeners = new Set<() => void>();
function readBest() {
  try {
    return Number(localStorage.getItem(BEST_KEY)) || 0;
  } catch {
    return 0;
  }
}
function saveBest(score: number) {
  try {
    localStorage.setItem(BEST_KEY, String(score));
  } catch {
    // 無法寫入時就不保留紀錄
  }
  bestListeners.forEach((listener) => listener());
}
function subscribeBest(listener: () => void) {
  bestListeners.add(listener);
  return () => bestListeners.delete(listener);
}

function createGame() {
  return {
    items: [] as Item[],
    popups: [] as Popup[],
    basketX: 0.5,
    targetX: 0.5,
    elapsed: 0,
    spawnTimer: 0,
    score: 0,
    keys: { left: false, right: false },
  };
}

export default function MangoCatchGame() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const game = useRef(createGame());
  const phaseRef = useRef<Phase>("ready");

  const [phase, setPhase] = useState<Phase>("ready");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [newRecord, setNewRecord] = useState(false);
  const best = useSyncExternalStore(subscribeBest, readBest, () => 0);

  const start = () => {
    game.current = createGame();
    phaseRef.current = "playing";
    setScore(0);
    setTimeLeft(GAME_DURATION);
    setNewRecord(false);
    setPhase("playing");
  };

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!wrap || !canvas || !ctx) return;

    const size = { w: 0, h: 0 };
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      size.w = wrap.clientWidth;
      size.h = wrap.clientHeight;
      canvas.width = size.w * dpr;
      canvas.height = size.h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(wrap);

    const endGame = () => {
      phaseRef.current = "over";
      const final = game.current.score;
      if (final > readBest()) {
        saveBest(final);
        setNewRecord(true);
      }
      setTimeLeft(0);
      setPhase("over");
    };

    const update = (dt: number) => {
      const g = game.current;
      const { w, h } = size;

      g.elapsed += dt;
      if (g.elapsed >= GAME_DURATION) {
        endGame();
        return;
      }
      setTimeLeft(Math.ceil(GAME_DURATION - g.elapsed));

      // 鍵盤移動與籃子緩動
      if (g.keys.left) g.targetX -= 1.3 * dt;
      if (g.keys.right) g.targetX += 1.3 * dt;
      g.targetX = Math.min(1, Math.max(0, g.targetX));
      g.basketX += (g.targetX - g.basketX) * Math.min(1, dt * 14);

      // 越接近結束，掉落越快、越密集
      const progress = g.elapsed / GAME_DURATION;
      g.spawnTimer -= dt;
      if (g.spawnTimer <= 0) {
        const r = Math.random();
        const kind: ItemKind = r < 0.1 ? "golden" : r < 0.28 ? "leaf" : "mango";
        g.items.push({
          x: 24 + Math.random() * (w - 48),
          y: -30,
          vy: h * (0.45 + 0.45 * progress + Math.random() * 0.2) * (kind === "golden" ? 1.25 : 1),
          kind,
          rot: Math.random() * Math.PI,
          spin: (Math.random() - 0.5) * 4,
        });
        g.spawnTimer = (0.65 - 0.35 * progress) * (0.7 + Math.random() * 0.6);
      }

      const basketY = h - 44;
      const halfWidth = Math.max(36, w * 0.06);
      const bx = g.basketX * w;

      g.items = g.items.filter((item) => {
        item.y += item.vy * dt;
        item.rot += item.spin * dt;
        const caught =
          item.y >= basketY - 24 && item.y <= basketY + 12 && Math.abs(item.x - bx) < halfWidth;
        if (caught) {
          const { points, color } = ITEMS[item.kind];
          g.score = Math.max(0, g.score + points);
          g.popups.push({ x: item.x, y: basketY - 36, text: points > 0 ? `+${points}` : `${points}`, color, life: 1 });
          setScore(g.score);
          return false;
        }
        return item.y < h + 40;
      });

      g.popups = g.popups.filter((p) => {
        p.y -= 50 * dt;
        p.life -= dt * 1.4;
        return p.life > 0;
      });
    };

    const draw = () => {
      const g = game.current;
      const { w, h } = size;
      ctx.clearRect(0, 0, w, h);
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      for (const item of g.items) {
        const info = ITEMS[item.kind];
        ctx.save();
        ctx.translate(item.x, item.y);
        ctx.rotate(item.rot);
        if (item.kind === "golden") {
          ctx.shadowColor = "#fbbf24";
          ctx.shadowBlur = 24;
        }
        ctx.font = `${info.size}px serif`;
        ctx.fillText(info.emoji, 0, 0);
        ctx.restore();
      }

      ctx.font = "56px serif";
      ctx.fillText("🧺", g.basketX * w, h - 44);

      for (const p of g.popups) {
        ctx.globalAlpha = Math.max(0, p.life);
        ctx.fillStyle = p.color;
        ctx.font = "bold 24px sans-serif";
        ctx.fillText(p.text, p.x, p.y);
      }
      ctx.globalAlpha = 1;
    };

    let frame = 0;
    let last = performance.now();
    const loop = (now: number) => {
      // 限制單幀時間，切換分頁回來時不會一次跳過太多秒
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      if (phaseRef.current === "playing") update(dt);
      draw();
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);

    const onKey = (pressed: boolean) => (e: KeyboardEvent) => {
      const keys = game.current.keys;
      if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") keys.left = pressed;
      else if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") keys.right = pressed;
      else return;
      if (phaseRef.current === "playing") e.preventDefault();
    };
    const onKeyDown = onKey(true);
    const onKeyUp = onKey(false);
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, []);

  const onPointer = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    game.current.targetX = (e.clientX - rect.left) / rect.width;
  };

  return (
    <Glass className="relative overflow-hidden p-2 sm:p-3">
      <div
        ref={wrapRef}
        className="relative h-[65vh] max-h-[600px] min-h-[420px] overflow-hidden rounded-2xl bg-linear-to-b from-white/[0.03] via-transparent to-amber-500/10"
      >
        <canvas
          ref={canvasRef}
          onPointerMove={onPointer}
          onPointerDown={onPointer}
          className="absolute inset-0 h-full w-full touch-none"
        />

        {/* 分數與時間 */}
        <div className="pointer-events-none absolute inset-x-3 top-3 flex justify-between">
          <Glass className="rounded-full px-4 py-2 text-sm">
            分數 <span className="ml-1 font-serif text-lg text-amber-200">{score}</span>
          </Glass>
          <Glass className="rounded-full px-4 py-2 text-sm">
            剩餘{" "}
            <span className={`ml-1 font-serif text-lg ${timeLeft <= 5 && phase === "playing" ? "text-rose-300" : "text-amber-200"}`}>
              {timeLeft}
            </span>{" "}
            秒
          </Glass>
        </div>

        {phase !== "playing" && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
            <Glass className="animate-pop-in w-full max-w-sm p-6 text-center sm:p-8">
              {phase === "ready" ? (
                <>
                  <span className="text-5xl">🧺</span>
                  <h2 className="mt-4 font-serif text-2xl">準備好了嗎？</h2>
                  <ul className="mt-5 space-y-2 text-sm text-stone-300">
                    <li>🥭 芒果 <span className="text-amber-200">+1</span></li>
                    <li>✨ 發光金芒果 <span className="text-amber-200">+3</span></li>
                    <li>🍂 落葉 <span className="text-rose-300">-1</span></li>
                  </ul>
                  <p className="mt-5 text-xs leading-relaxed text-stone-500">
                    電腦：移動滑鼠或按 ← → 鍵
                    <br />
                    手機：手指在畫面上左右滑動
                  </p>
                </>
              ) : (
                <>
                  <p className="text-xs tracking-[0.4em] text-amber-200/80">TIME&apos;S UP</p>
                  {newRecord && (
                    <p className="mt-3 inline-block rounded-full bg-amber-300 px-3 py-1 text-xs font-medium text-stone-900">
                      🎉 新紀錄！
                    </p>
                  )}
                  <p className="mt-4 font-serif text-6xl text-amber-200">{score}</p>
                  <p className="mt-2 text-sm text-stone-400">本次得分</p>
                </>
              )}
              {best > 0 && <p className="mt-4 text-sm text-stone-400">最高紀錄：{best} 分</p>}
              <button
                type="button"
                onClick={start}
                className="mt-6 w-full rounded-full bg-linear-to-r from-amber-300 to-orange-400 py-3 font-medium text-stone-900 shadow-lg shadow-orange-500/30 transition hover:brightness-110"
              >
                {phase === "ready" ? "開始遊戲" : "再玩一次"}
              </button>
            </Glass>
          </div>
        )}
      </div>
    </Glass>
  );
}
