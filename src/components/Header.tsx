import Link from "next/link";
import Glass from "@/components/Glass";
import MobileMenu from "@/components/MobileMenu";
import { HeaderGreeting } from "@/components/WelcomeName";

const navLinks = [
  { href: "/#products", label: "嚴選商品" },
  { href: "/#story", label: "品牌故事" },
  { href: "/blog", label: "芒果專欄" },
  { href: "/game", label: "小遊戲" },
  { href: "/#contact", label: "聯絡我們" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-20 px-4 pt-4 sm:px-8">
      <Glass className="relative mx-auto flex max-w-6xl items-center justify-between rounded-full py-2 pr-2 pl-5 sm:py-3 sm:pr-3 sm:pl-6">
        <Link href="/" className="font-serif text-base tracking-[0.25em] text-amber-200 sm:text-lg sm:tracking-[0.3em]">
          金穗果園
        </Link>
        <nav className="hidden gap-6 text-sm text-stone-300 md:flex lg:gap-8">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="transition hover:text-amber-200">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <HeaderGreeting />
          <Link
            href="/#products"
            className="rounded-full bg-amber-300 px-4 py-2 text-sm font-medium text-stone-900 transition hover:bg-amber-200 sm:px-5"
          >
            立即選購
          </Link>
          <MobileMenu links={navLinks} />
        </div>
      </Glass>
    </header>
  );
}
