import Link from "next/link";
import { Megaphone } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { formatDate, stripHtmlExcerpt } from "@/lib/format";
import type { Announcement } from "@/types/database";

export function AnnouncementSection({ announcements }: { announcements: Announcement[] }) {
  if (announcements.length === 0) return null;

  return (
    <section>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionHeading
          eyebrow="Info Paroki"
          title="Pengumuman"
          description="Pernikahan, tahbisan, dan pengumuman penting seputar kehidupan paroki."
        />
        <Button href="/pengumuman" variant="secondary" size="sm">
          Lihat Semua
        </Button>
      </div>

      <div className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
        {announcements.map((a, i) => (
          <Reveal key={a.id} delay={i * 0.12}>
            <Link href={`/pengumuman/${a.slug}`} className="group block h-full">
              <Card className="h-full p-6">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge>{a.category}</Badge>
                  {a.is_priority && (
                    <span className="flex items-center gap-1 font-mono text-[11px] uppercase tracking-[0.1em] text-gold-400">
                      <Megaphone size={12} />
                      Penting
                    </span>
                  )}
                </div>
                <h3 className="mt-4 font-display text-[19px] font-semibold leading-snug text-parish-50 transition-colors group-hover:text-gold-400">
                  {a.title}
                </h3>
                <p className="mt-2.5 line-clamp-2 text-sm leading-relaxed text-parish-200">
                  {stripHtmlExcerpt(a.content)}
                </p>
                <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.1em] text-parish-300">
                  {formatDate(a.published_at)}
                </p>
              </Card>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
