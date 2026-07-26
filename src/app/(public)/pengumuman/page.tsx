import Link from "next/link";
import { Megaphone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SearchBox } from "@/components/ui/SearchBox";
import { formatDate, stripHtmlExcerpt } from "@/lib/format";
import { getAnnouncements } from "@/lib/queries";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pengumuman — Paroki Yohanes Gabriel Perboyre",
};

export const revalidate = 300;

export default async function PengumumanPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const params = await searchParams;
  const query = params.q?.trim() || undefined;
  const announcements = await getAnnouncements({ search: query });

  return (
    <Container className="py-16">
      <SectionHeading
        eyebrow="Info Paroki"
        title="Pengumuman"
        description="Pernikahan, tahbisan, dan pengumuman penting seputar kehidupan paroki."
      />

      <div className="mt-8 max-w-xl">
        <SearchBox
          action="/pengumuman"
          defaultValue={query}
          placeholder="Cari pengumuman…"
        />
      </div>

      {query && (
        <p className="mt-6 text-sm text-parish-200">
          {announcements.length > 0
            ? `${announcements.length} hasil untuk “${query}”`
            : `Tidak ada hasil untuk “${query}”`}
        </p>
      )}

      <div className="mt-8 grid gap-4">
        {announcements.map((a) => (
          <Link key={a.id} href={`/pengumuman/${a.slug}`}>
            <Card className="p-5">
              <div className="flex flex-wrap items-center gap-2">
                <Badge>{a.category}</Badge>
                {a.is_priority && (
                  <span className="flex items-center gap-1 text-sm font-semibold text-gold-500">
                    <Megaphone size={12} />
                    Penting
                  </span>
                )}
                <span className="ml-auto text-sm font-medium uppercase tracking-wide text-parish-300">
                  {formatDate(a.published_at)}
                </span>
              </div>
              <h3 className="mt-2 font-display text-lg text-parish-50">{a.title}</h3>
              <p className="mt-1 line-clamp-2 text-sm text-parish-200">
                {stripHtmlExcerpt(a.content)}
              </p>
            </Card>
          </Link>
        ))}
      </div>
    </Container>
  );
}
