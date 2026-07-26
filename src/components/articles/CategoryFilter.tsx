import Link from "next/link";
import { cn } from "@/lib/utils";
import type { Category } from "@/types/database";

export function CategoryFilter({
  categories,
  activeSlug,
}: {
  categories: Category[];
  activeSlug?: string;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      <Link
        href="/artikel"
        className={cn(
          "inline-flex min-h-[44px] items-center rounded-[2px] border px-4 text-[13px] transition-colors",
          !activeSlug
            ? "border-gold-500 bg-gold-500 text-parish-900"
            : "border-[var(--hairline-strong)] text-parish-200 hover:border-gold-400 hover:text-gold-400"
        )}
      >
        Semua
      </Link>
      {categories.map((cat) => (
        <Link
          key={cat.id}
          href={`/artikel?category=${cat.slug}`}
          className={cn(
            "inline-flex min-h-[44px] items-center rounded-[2px] border px-4 text-[13px] transition-colors",
            activeSlug === cat.slug
              ? "border-gold-500 bg-gold-500 text-parish-900"
              : "border-[var(--hairline-strong)] text-parish-200 hover:border-gold-400 hover:text-gold-400"
          )}
        >
          {cat.name}
        </Link>
      ))}
    </div>
  );
}
