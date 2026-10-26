import type { Metadata } from "next";
import MangoCatchGame from "@/components/MangoCatchGame";

export const metadata: Metadata = {
  title: "接芒果小遊戲｜金穗果園",
  description: "15 秒內接住越多芒果越好，挑戰你的最高分！",
};

export default function GamePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-8 sm:py-14">
      <div className="mb-8 text-center sm:mb-10">
        <p className="text-xs tracking-[0.4em] text-amber-200/80">MINI GAME</p>
        <h1 className="mt-4 font-serif text-3xl font-semibold sm:text-4xl">接芒果挑戰</h1>
        <p className="mx-auto mt-4 max-w-md leading-relaxed text-stone-400">
          15 秒內移動籃子，接住越多芒果越好！
        </p>
      </div>
      <MangoCatchGame />
    </div>
  );
}
