import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Glass from "@/components/Glass";
import Parallax from "@/components/Parallax";
import PostMeta from "@/components/PostMeta";
import { posts } from "@/data/posts";

export const metadata: Metadata = {
  title: "芒果專欄｜金穗果園",
  description: "品種、選購保存與栽培科學，關於芒果你該知道的專業知識。",
};

export default function BlogPage() {
  const [featured, ...rest] = posts;

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-8 sm:py-20 lg:py-24">
      <div className="mb-10 text-center sm:mb-14">
        <p className="text-xs tracking-[0.4em] text-amber-200/80">JOURNAL</p>
        <h1 className="mt-4 font-serif text-4xl font-semibold sm:text-5xl">芒果專欄</h1>
        <p className="mx-auto mt-5 max-w-md leading-relaxed text-stone-400">
          從品種、選購到栽培科學，果農寫給你的芒果知識。
        </p>
      </div>

      {/* 精選文章 */}
      <Link href={`/blog/${featured.slug}`} className="group block">
        <Glass className="grid overflow-hidden p-3 transition duration-300 group-hover:bg-white/[0.1] md:grid-cols-[1.2fr_1fr]">
          <div className="relative aspect-[16/10] overflow-hidden rounded-2xl md:aspect-auto md:min-h-[360px]">
            <Parallax speed={-0.08} className="absolute inset-0" innerClassName="absolute inset-x-0 -inset-y-[20%]">
              <Image
                src={featured.cover}
                alt={featured.coverAlt}
                fill
                preload
                placeholder="blur"
                sizes="(min-width: 768px) 55vw, 100vw"
                className="object-cover transition duration-700 group-hover:scale-105"
              />
            </Parallax>
          </div>
          <div className="flex flex-col justify-center p-5 sm:p-8 md:p-10">
            <PostMeta category={featured.category} date={featured.date} readTime={featured.readTime} />
            <h2 className="mt-4 font-serif text-2xl leading-snug sm:text-3xl">{featured.title}</h2>
            <p className="mt-4 leading-relaxed text-stone-400">{featured.excerpt}</p>
            <span className="mt-8 text-sm text-amber-200 transition group-hover:translate-x-1">
              閱讀全文 →
            </span>
          </div>
        </Glass>
      </Link>

      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:mt-8 lg:gap-8">
        {rest.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
            <Glass className="flex h-full flex-col p-3 transition duration-300 group-hover:-translate-y-1 group-hover:bg-white/[0.1]">
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl">
                <Parallax speed={-0.08} className="absolute inset-0" innerClassName="absolute inset-x-0 -inset-y-[20%]">
                  <Image
                    src={post.cover}
                    alt={post.coverAlt}
                    fill
                    placeholder="blur"
                    sizes="(min-width: 640px) 50vw, 100vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                </Parallax>
              </div>
              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <PostMeta category={post.category} date={post.date} readTime={post.readTime} />
                <h2 className="mt-3 font-serif text-xl leading-snug sm:text-2xl">{post.title}</h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-stone-400">{post.excerpt}</p>
                <span className="mt-6 text-sm text-amber-200">閱讀全文 →</span>
              </div>
            </Glass>
          </Link>
        ))}
      </div>
    </div>
  );
}
