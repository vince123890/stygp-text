import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { formatDate, stripHtmlExcerpt } from "@/lib/format";
import type { Article } from "@/types/database";

export function ArticleCard({ article }: { article: Article }) {
  return (
    <Link href={`/artikel/${article.slug}`} className="group block h-full">
      <Card className="flex h-full flex-col overflow-hidden">
        <div className="relative aspect-[16/10] w-full overflow-hidden">
          {article.cover_image_url ? (
            <Image
              src={article.cover_image_url}
              alt={article.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
              sizes="(min-width: 1024px) 380px, 100vw"
            />
          ) : (
            // Placeholder .card-media dari template — guratan diagonal kuningan
            <div
              className="flex h-full w-full items-center justify-center"
              style={{
                background:
                  "linear-gradient(160deg, rgba(179,144,47,.28), transparent 60%)," +
                  "repeating-linear-gradient(45deg, rgba(179,144,47,.06) 0 2px, transparent 2px 14px)," +
                  "var(--ink)",
              }}
            >
              <span className="font-display text-4xl text-gold-500 opacity-60">
                ✝
              </span>
            </div>
          )}
        </div>
        <div className="flex flex-1 flex-col p-6">
          {article.category && <Badge>{article.category.name}</Badge>}
          <h3 className="mt-4 font-display text-[19px] font-semibold leading-snug text-parish-50 transition-colors group-hover:text-gold-400">
            {article.title}
          </h3>
          <p className="mt-2.5 line-clamp-2 flex-1 text-sm leading-relaxed text-parish-200">
            {stripHtmlExcerpt(article.content)}
          </p>
          <p className="mt-5 font-mono text-[12.5px] uppercase tracking-[0.1em] text-parish-300">
            {formatDate(article.published_at)}
          </p>
        </div>
      </Card>
    </Link>
  );
}
