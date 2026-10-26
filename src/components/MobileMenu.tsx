"use client";

import { useState } from "react";
import Link from "next/link";
import Glass from "@/components/Glass";

export default function MobileMenu({
  links,
}: {
  links: { href: string; label: string }[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label={open ? "關閉選單" : "開啟選單"}
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-full border border-white/20 bg-white/5"
      >
        <span
          className={`h-px w-5 bg-amber-100 transition duration-300 ${open ? "translate-y-[3.5px] rotate-45" : ""}`}
        />
        <span
          className={`h-px w-5 bg-amber-100 transition duration-300 ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`}
        />
      </button>

      {open && (
        <Glass className="absolute inset-x-0 top-full mt-3 overflow-hidden">
          <nav className="flex flex-col bg-[#0d0f0c]/60 p-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-2xl px-5 py-4 text-stone-200 transition hover:bg-white/10 hover:text-amber-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </Glass>
      )}
    </div>
  );
}
