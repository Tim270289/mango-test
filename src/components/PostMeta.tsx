export default function PostMeta({
  category,
  date,
  readTime,
}: {
  category: string;
  date: string;
  readTime: string;
}) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-stone-400">
      <span className="rounded-full border border-amber-200/30 bg-amber-200/10 px-3 py-1 text-amber-100">
        {category}
      </span>
      <span>{date.replaceAll("-", ".")}</span>
      <span>·</span>
      <span>閱讀 {readTime}</span>
    </div>
  );
}
