import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArticleCard } from "@/components/articles/ArticleCard";
import { CategoryFilter } from "@/components/articles/CategoryFilter";
import { Pagination } from "@/components/ui/Pagination";
import { SearchBox } from "@/components/ui/SearchBox";
import { getArticles, getCategories } from "@/lib/queries";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Artikel & Pengumuman — Paroki Yohanes Gabriel Perboyre",
};

export const revalidate = 300;

const PAGE_SIZE = 9;

export default async function ArtikelPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; page?: string; q?: string }>;
}) {
  const params = await searchParams;
  const parsedPage = Number(params.page ?? "1");
  const page = Number.isFinite(parsedPage) && parsedPage > 0 ? Math.floor(parsedPage) : 1;
  const query = params.q?.trim() || undefined;

  const [{ articles, total }, categories] = await Promise.all([
    getArticles({
      categorySlug: params.category,
      search: query,
      page,
      pageSize: PAGE_SIZE,
    }),
    getCategories(),
  ]);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <Container className="py-16">
      <SectionHeading
        eyebrow="Kabar Paroki"
        title="Artikel & Pengumuman"
        description="Kumpulan berita, pengumuman, dan kegiatan seputar kehidupan menggereja di paroki kita."
      />

      <div className="mt-8 max-w-xl">
        <SearchBox
          action="/artikel"
          defaultValue={query}
          placeholder="Cari judul atau isi artikel…"
          hidden={{ category: params.category }}
        />
      </div>

      <div className="mt-6">
        <CategoryFilter categories={categories} activeSlug={params.category} />
      </div>

      {query && (
        <p className="mt-6 text-sm text-parish-200">
          {total > 0
            ? `${total} hasil untuk “${query}”`
            : `Tidak ada hasil untuk “${query}”`}
        </p>
      )}

      {articles.length === 0 ? (
        <p className="mt-16 text-center text-parish-200">
          {query
            ? "Coba kata kunci lain atau hapus filter kategori."
            : "Belum ada artikel untuk kategori ini."}
        </p>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      )}

      <Pagination
        page={page}
        totalPages={totalPages}
        basePath="/artikel"
        searchParams={{ category: params.category, q: query }}
      />
    </Container>
  );
}
