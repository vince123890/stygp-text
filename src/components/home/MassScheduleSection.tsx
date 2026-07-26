import Link from "next/link";
import { Radio, Clock } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { getNextMass } from "@/lib/next-mass";
import type { MassSchedule } from "@/types/database";

/**
 * Seksi .misa pada docs/paroki-template.html: pita parchment terang di atas
 * latar ink, dengan grid bergaris hairline. Kontras terang ini yang menandai
 * jadwal misa sebagai informasi paling dicari pengunjung.
 */
export function MassScheduleSection({ schedules }: { schedules: MassSchedule[] }) {
  if (schedules.length === 0) return null;

  // Pertanyaan nomor satu pengunjung situs paroki: "misa berikutnya kapan?".
  // Dihitung di server; halaman ini revalidate tiap 5 menit, jadi ditampilkan
  // sebagai hari + jam — bukan hitung mundur yang cepat basi.
  const next = getNextMass(schedules);

  return (
    <section className="relative z-[3] bg-parish-50 py-16 text-parish-900">
      <Container>
        <div className="mb-4 flex flex-wrap items-baseline justify-between gap-3">
          <h2 className="font-display text-[28px] font-semibold leading-tight text-parish-900">
            Jadwal Misa
          </h2>
          <Link
            href="/jadwal-misa"
            className="border-b border-wine-600 pb-0.5 text-[13px] text-wine-600 transition-colors hover:border-parish-900 hover:text-parish-900"
          >
            Lihat Jadwal Lengkap →
          </Link>
        </div>

        {next && (
          <div className="mb-8 flex flex-wrap items-center gap-x-4 gap-y-2 border-l-[3px] border-wine-600 bg-wine-600/[0.06] px-5 py-4">
            <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-wine-600">
              <Clock size={14} />
              Misa Berikutnya
            </span>
            <p className="font-display text-[22px] font-semibold leading-tight text-parish-900">
              {next.dayLabel}, {next.schedule.time}
            </p>
            <p className="text-[13px] text-[#5c574c]">
              {next.schedule.category} · {next.schedule.chapel}
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 border-t border-parish-900/15 sm:grid-cols-2 lg:grid-cols-4">
          {schedules.map((s, i) => (
            <Reveal
              key={s.id}
              delay={(i % 4) * 0.05}
              className="border-b border-parish-900/15 px-5 py-6 sm:border-r sm:[&:nth-child(2n)]:border-r-0 lg:[&:nth-child(2n)]:border-r lg:[&:nth-child(4n)]:border-r-0"
            >
              <span className="mb-2.5 block font-mono text-[11px] uppercase tracking-[0.1em] text-wine-600">
                {s.day_label}
              </span>
              <span className="block font-display text-[22px] font-semibold leading-tight text-parish-900">
                {s.time}
              </span>
              <span className="mt-1.5 block text-[12.5px] leading-relaxed text-[#5c574c]">
                {s.category}
                <br />
                {s.chapel}
              </span>
              {s.stream_url && (
                <a
                  href={s.stream_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 text-[12.5px] font-medium text-wine-600 transition-colors hover:text-parish-900"
                >
                  <Radio size={13} />
                  Siaran Langsung
                </a>
              )}
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
