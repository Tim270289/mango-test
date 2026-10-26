import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Glass from "@/components/Glass";
import Parallax from "@/components/Parallax";
import PostMeta from "@/components/PostMeta";
import { getPost, posts } from "@/data/posts";

export async function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: `${post.title}｜金穗果園`,
    description: post.excerpt,
  };
}

export default async function PostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const others = posts.filter((p) => p.slug !== post.slug);

  return (
    <article className="mx-auto max-w-4xl px-4 py-10 sm:px-8 sm:py-14">
      <Link href="/blog" className="text-sm text-stone-400 transition hover:text-amber-200">
        ← 返回專欄
      </Link>

      <header className="mt-8 text-center">
        <div className="flex justify-center">
          <PostMeta category={post.category} date={post.date} readTime={post.readTime} />
        </div>
        <h1 className="mx-auto mt-6 max-w-2xl font-serif text-3xl leading-snug font-semibold sm:text-4xl lg:text-5xl">
          {post.title}
        </h1>
        <p className="mx-auto mt-6 max-w-xl leading-relaxed text-stone-400">{post.excerpt}</p>
      </header>

      <Glass className="mt-10 p-2 sm:mt-14 sm:p-3">
        <div className="relative aspect-[16/9] overflow-hidden rounded-2xl">
          <Parallax speed={-0.12} className="absolute inset-0" innerClassName="absolute inset-x-0 -inset-y-[20%]">
            <Image
              src={post.cover}
              alt={post.coverAlt}
              fill
              preload
              placeholder="blur"
              sizes="(min-width: 896px) 896px, 100vw"
              className="object-cover"
            />
          </Parallax>
        </div>
      </Glass>

      <Glass className="mt-8 p-6 sm:mt-10 sm:p-10 lg:p-14">
        <div className="mx-auto max-w-2xl space-y-12">
          {post.sections.map((section, i) => (
            <section key={section.heading}>
              <p className="font-serif text-sm text-amber-200/70">0{i + 1}</p>
              <h2 className="mt-2 font-serif text-2xl leading-snug sm:text-3xl">{section.heading}</h2>
              <div className="mt-5 space-y-5 text-[17px] leading-loose text-stone-300">
                {section.paragraphs.map((text) => (
                  <p key={text}>{text}</p>
                ))}
              </div>
              {section.list && (
                <ul className="mt-6 space-y-4">
                  {section.list.map((item) => {
                    const [label, ...body] = item.split("：");
                    return (
                      <li
                        key={item}
                        className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 leading-relaxed text-stone-300"
                      >
                        {body.length > 0 ? (
                          <>
                            <span className="font-medium text-amber-100">{label}</span>
                            <span className="text-stone-500">｜</span>
                            {body.join("：")}
                          </>
                        ) : (
                          item
                        )}
                      </li>
                    );
                  })}
                </ul>
              )}
            </section>
          ))}
        </div>
      </Glass>

      <section className="mt-16 sm:mt-20">
        <h2 className="mb-6 text-center font-serif text-2xl">延伸閱讀</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {others.map((p) => (
            <Link key={p.slug} href={`/blog/${p.slug}`} className="group block">
              <Glass className="flex h-full items-center gap-4 p-3 transition group-hover:bg-white/[0.1]">
                <div className="relative h-20 w-24 shrink-0 overflow-hidden rounded-xl">
                  <Image src={p.cover} alt={p.coverAlt} fill placeholder="blur" sizes="96px" className="object-cover" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-amber-200/80">{p.category}</p>
                  <h3 className="mt-1 font-serif leading-snug">{p.title}</h3>
                </div>
              </Glass>
            </Link>
          ))}
        </div>
      </section>
    </article>
  );
}
