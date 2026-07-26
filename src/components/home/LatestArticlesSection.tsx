import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ArticleCard } from "@/components/articles/ArticleCard";
import type { Article } from "@/types/database";

export function LatestArticlesSection({ articles }: { articles: Article[] }) {
  if (articles.length === 0) return null;

  return (
    <section>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionHeading
          eyebrow="Kabar Paroki"
          title="Artikel Terbaru"
          description="Ikuti perkembangan kegiatan dan warta terkini dari paroki kita."
        />
        <Button href="/artikel" variant="secondary" size="sm">
          Lihat Semua
        </Button>
      </div>

      <div className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article, i) => (
          <Reveal key={article.id} delay={(i % 3) * 0.12}>
            <ArticleCard article={article} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
