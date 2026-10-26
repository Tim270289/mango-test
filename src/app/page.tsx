import Image, { type StaticImageData } from "next/image";
import Glass from "@/components/Glass";
import Parallax from "@/components/Parallax";
import { HeroWelcome } from "@/components/WelcomeName";
import SubscribeForm from "@/components/SubscribeForm";
import mango01 from "../../public/images/mango-01.jpg";
import mango02 from "../../public/images/mango-02.jpg";
import mango03 from "../../public/images/mango-03.jpg";
import mango04 from "../../public/images/mango-04.jpg";
import mango05 from "../../public/images/mango-05.jpg";
import mango06 from "../../public/images/mango-06.jpg";
import mango07 from "../../public/images/mango-07.jpg";
import mango08 from "../../public/images/mango-08.jpg";
import mango09 from "../../public/images/mango-09.jpg";
import mango10 from "../../public/images/mango-10.jpg";

const products = [
  {
    name: "愛文芒果",
    origin: "台南 玉井",
    desc: "果肉細緻、香氣濃郁，甜中帶微酸，是夏季最經典的滋味。",
    price: "NT$ 1,280",
    unit: "5 台斤 / 箱",
    image: mango02,
    position: "object-center",
  },
  {
    name: "金煌芒果",
    origin: "屏東 枋山",
    desc: "果型碩大、纖維極少，入口綿密，甜度可達 18 度以上。",
    price: "NT$ 1,480",
    unit: "5 台斤 / 箱",
    image: mango03,
    position: "object-center",
  },
  {
    name: "典藏禮盒",
    origin: "嚴選雙品種",
    desc: "職人逐顆挑選，搭配手工木盒包裝，送禮自用皆體面。",
    price: "NT$ 2,680",
    unit: "8 入 / 盒",
    image: mango06,
    position: "object-[center_75%]",
  },
];

const features = [
  { title: "樹上熟成", text: "自然成熟才採收，保留最完整的果香與甜度。" },
  { title: "產地直送", text: "採收後 48 小時內冷藏宅配，新鮮直達餐桌。" },
  { title: "逐顆嚴選", text: "依重量、外觀、糖度三道把關，只留最好的。" },
];

const gallery: { image: StaticImageData; label: string; className: string }[] = [
  { image: mango07, label: "枝頭結果", className: "col-span-2 md:row-span-2" },
  { image: mango09, label: "芒果花季", className: "" },
  { image: mango04, label: "飽滿果肉", className: "" },
  { image: mango01, label: "自然轉色", className: "" },
  { image: mango05, label: "綠意果園", className: "" },
];

function MangoOrb({ tone, className = "" }: { tone: string; className?: string }) {
  return (
    <div
      className={`rounded-[55%_45%_50%_50%/60%_55%_45%_40%] bg-linear-to-br ${tone} shadow-[inset_-12px_-16px_30px_rgba(0,0,0,0.25),inset_10px_10px_24px_rgba(255,255,255,0.35)] ${className}`}
    />
  );
}

export default function Home() {
  return (
    <>
      {/* 主視覺 */}
      <section className="mx-auto grid max-w-6xl items-center gap-16 px-4 py-14 text-center sm:px-8 sm:py-20 md:grid-cols-2 md:gap-12 md:text-left lg:py-32">
        <div>
          <HeroWelcome />
          <p className="mb-6 text-xs tracking-[0.3em] text-amber-200/80 sm:tracking-[0.4em]">
            2026 SUMMER HARVEST
          </p>
          <h1 className="font-serif text-4xl leading-tight font-semibold sm:text-5xl lg:text-6xl">
            一口夏天，
            <br />
            <span className="bg-linear-to-r from-amber-200 via-orange-300 to-rose-300 bg-clip-text text-transparent">
              極致芒果
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-md leading-relaxed text-stone-300 sm:mt-8 md:mx-0">
            來自台灣南部日照充足的果園，樹上自然熟成，
            每一顆都承載著土地與時間的甜。
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3 sm:mt-10 sm:gap-4 md:justify-start">
            <a
              href="#products"
              className="rounded-full bg-linear-to-r from-amber-300 to-orange-400 px-8 py-3 font-medium text-stone-900 shadow-lg shadow-orange-500/30 transition hover:scale-105"
            >
              探索商品
            </a>
            <a
              href="#story"
              className="rounded-full border border-white/20 bg-white/5 px-8 py-3 backdrop-blur-xl transition hover:bg-white/10"
            >
              品牌故事
            </a>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[300px] sm:max-w-sm">
          <Parallax speed={0.35} className="absolute -top-6 -left-6 sm:-top-8 sm:-left-10">
            <MangoOrb
              tone="from-amber-200 via-orange-400 to-rose-500"
              className="h-20 w-16 rotate-12 opacity-80 sm:h-28 sm:w-24"
            />
          </Parallax>
          <Parallax speed={0.5} className="absolute -right-4 -bottom-8 sm:-right-6 sm:-bottom-10">
            <MangoOrb
              tone="from-yellow-200 via-amber-300 to-orange-400"
              className="h-14 w-12 -rotate-12 opacity-70 sm:h-20 sm:w-16"
            />
          </Parallax>
          <Glass className="relative p-3">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
              <Parallax speed={-0.08} className="absolute inset-0" innerClassName="absolute inset-x-0 -inset-y-[15%]">
                <Image
                  src={mango08}
                  alt="樹上切成花刀的金黃芒果"
                  fill
                  preload
                  placeholder="blur"
                  sizes="(min-width: 768px) 384px, 90vw"
                  className="object-cover"
                />
              </Parallax>
              <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />
            </div>
          </Glass>
          <Parallax speed={0.15} className="absolute -bottom-5 -left-3 sm:-bottom-6 sm:-left-6">
            <Glass className="px-4 py-3 text-left sm:px-6 sm:py-4">
              <p className="text-xs text-stone-300">平均甜度</p>
              <p className="font-serif text-2xl text-amber-200 sm:text-3xl">18°Bx</p>
            </Glass>
          </Parallax>
          <Parallax speed={0.25} className="absolute -top-4 -right-3 sm:-right-4">
            <Glass className="px-4 py-3 text-left sm:px-6 sm:py-4">
              <p className="text-xs text-stone-300">產地直送</p>
              <p className="font-serif text-2xl text-amber-200 sm:text-3xl">48hr</p>
            </Glass>
          </Parallax>
        </div>
      </section>

      {/* 特色 */}
      <section className="mx-auto max-w-6xl px-4 sm:px-8">
        <Glass className="grid gap-6 p-6 sm:grid-cols-3 sm:gap-8 sm:p-10">
          {features.map((f, i) => (
            <div key={f.title}>
              <p className="font-serif text-sm text-amber-200/70">0{i + 1}</p>
              <h3 className="mt-2 font-serif text-xl">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-stone-400">{f.text}</p>
            </div>
          ))}
        </Glass>
      </section>

      {/* 商品 */}
      <section id="products" className="mx-auto max-w-6xl scroll-mt-28 px-4 py-20 sm:px-8 lg:py-28">
        <div className="mb-10 text-center sm:mb-14">
          <p className="text-xs tracking-[0.4em] text-amber-200/80">COLLECTION</p>
          <h2 className="mt-4 font-serif text-3xl sm:text-4xl">當季嚴選</h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {products.map((p) => (
            <Glass
              key={p.name}
              className="group flex flex-col p-4 transition duration-300 hover:-translate-y-2 hover:bg-white/[0.1]"
            >
              <div className="relative mb-6 aspect-[4/3] overflow-hidden rounded-2xl">
                <Parallax speed={-0.08} className="absolute inset-0" innerClassName="absolute inset-x-0 -inset-y-[20%]">
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    placeholder="blur"
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className={`object-cover ${p.position} transition duration-700 group-hover:scale-110`}
                  />
                </Parallax>
                <span className="absolute top-3 left-3 rounded-full border border-white/20 bg-black/30 px-3 py-1 text-xs tracking-widest text-amber-100 backdrop-blur-md">
                  {p.origin}
                </span>
              </div>
              <div className="flex flex-1 flex-col px-4 pb-4">
                <h3 className="font-serif text-2xl">{p.name}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-stone-400">{p.desc}</p>
                <div className="mt-6 flex flex-wrap items-end justify-between gap-4 border-t border-white/10 pt-6 sm:mt-8">
                  <div>
                    <p className="font-serif text-2xl text-amber-200">{p.price}</p>
                    <p className="text-xs text-stone-500">{p.unit}</p>
                  </div>
                  <button className="rounded-full border border-amber-200/40 px-5 py-2 text-sm text-amber-100 transition hover:bg-amber-200 hover:text-stone-900">
                    加入購物車
                  </button>
                </div>
              </div>
            </Glass>
          ))}
        </div>
      </section>

      {/* 果園日常 */}
      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-8 lg:pb-28">
        <div className="mb-10 text-center sm:mb-14">
          <p className="text-xs tracking-[0.4em] text-amber-200/80">ORCHARD</p>
          <h2 className="mt-4 font-serif text-3xl sm:text-4xl">果園日常</h2>
        </div>
        <div className="grid auto-rows-[150px] grid-cols-2 gap-3 sm:auto-rows-[200px] sm:gap-4 lg:auto-rows-[220px] lg:grid-cols-4">
          {gallery.map((g) => (
            <div
              key={g.label}
              className={`group relative overflow-hidden rounded-3xl border border-white/15 ${g.className}`}
            >
              <Parallax speed={-0.06} className="absolute inset-0" innerClassName="absolute inset-x-0 -inset-y-[20%]">
                <Image
                  src={g.image}
                  alt={g.label}
                  fill
                  placeholder="blur"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
              </Parallax>
              <Glass className="absolute bottom-2 left-2 rounded-full px-3 py-1 text-xs text-stone-100 sm:bottom-3 sm:left-3 sm:px-4 sm:py-1.5 sm:text-sm">
                {g.label}
              </Glass>
            </div>
          ))}
        </div>
      </section>

      {/* 品牌故事 */}
      <section id="story" className="mx-auto max-w-6xl scroll-mt-28 px-4 sm:px-8">
        <div className="relative overflow-hidden rounded-3xl">
          <Parallax speed={-0.15} className="absolute inset-0" innerClassName="absolute inset-x-0 -inset-y-[30%]">
            <Image
              src={mango10}
              alt="山坡上的芒果樹"
              fill
              placeholder="blur"
              sizes="(min-width: 1152px) 1152px, 100vw"
              className="object-cover"
            />
          </Parallax>
          <div className="absolute inset-0 bg-linear-to-t from-[#0d0f0c]/90 via-[#0d0f0c]/60 to-[#0d0f0c]/20 md:bg-linear-to-r" />
          <div className="relative px-4 pt-40 pb-4 sm:p-8 sm:pt-56 md:p-12">
            <Glass className="grid max-w-3xl items-center gap-6 p-6 sm:gap-10 sm:p-8 md:grid-cols-[1fr_1.4fr] md:p-12">
              <div>
                <p className="text-xs tracking-[0.4em] text-amber-200/80">OUR STORY</p>
                <h2 className="mt-4 font-serif text-3xl leading-snug sm:text-4xl">
                  三代果農，
                  <br />
                  只為一顆好芒果
                </h2>
              </div>
              <div className="space-y-5 leading-relaxed text-stone-300">
                <p>
                  從祖父開墾的第一片果園開始，我們堅持不催熟、不搶收，
                  讓每一顆芒果在枝頭上吸飽陽光，自然轉色。
                </p>
                <p>
                  我們相信，真正的好味道不需要修飾。這份對土地的敬意，
                  是金穗果園想帶到你餐桌上的禮物。
                </p>
              </div>
            </Glass>
          </div>
        </div>
      </section>

      {/* 聯絡 */}
      <section id="contact" className="mx-auto max-w-6xl scroll-mt-28 px-4 py-20 text-center sm:px-8 lg:py-28">
        <h2 className="font-serif text-2xl leading-snug sm:text-4xl">
          今年夏天，
          <br className="sm:hidden" />
          預約第一批鮮果
        </h2>
        <p className="mx-auto mt-4 max-w-md text-stone-400">
          每年產季有限，留下聯絡方式，開賣時第一時間通知你。
        </p>
        <SubscribeForm />
      </section>
    </>
  );
}
