import Link from "next/link";
import { formatDate } from "@/lib/format";
import { LITURGICAL_COLOR_STYLES } from "@/lib/liturgical-color";
import type { EffectiveLiturgicalDay } from "@/lib/liturgical-effective";

const READING_LABELS: { key: keyof EffectiveLiturgicalDay["readings"]; label: string }[] = [
  { key: "first_reading", label: "Bacaan I" },
  { key: "psalm", label: "Mazmur" },
  { key: "second_reading", label: "Bacaan II" },
  { key: "gospel", label: "Injil" },
  { key: "office_reading", label: "Bacaan Ofisi (BcO)" },
];

/**
 * Panel liturgi hari ini dengan warna liturgi sebagai latar penuh.
 * Dipakai di beranda (dibungkus link ke kalender) dan di halaman kalender
 * liturgi itu sendiri, supaya kedua tempat tidak pernah berbeda tampilan.
 */
export function LiturgicalTodayBanner({
  day,
  href,
  className = "",
}: {
  day: EffectiveLiturgicalDay | null;
  /** Bila diisi, seluruh panel menjadi tautan (dipakai di beranda). */
  href?: string;
  className?: string;
}) {
  if (!day) return null;

  const color = LITURGICAL_COLOR_STYLES[day.liturgical_color];
  const readings = READING_LABELS.filter(({ key }) => day.readings[key]);

  const panel = (
    <div
      className={`rounded-[2px] p-7 sm:p-10 ${color.solid} ${
        href ? "transition-shadow group-hover:shadow-[0_20px_45px_-15px_rgba(0,0,0,0.5)]" : ""
      } ${className}`}
    >
      <p
        className={`font-mono text-[11px] font-medium uppercase tracking-[0.14em] ${color.solidText} opacity-80`}
      >
        Hari Ini — {formatDate(day.calendar_date)}
      </p>

      <h2
        className={`mt-3 font-display text-[clamp(24px,3.2vw,38px)] font-semibold leading-[1.15] ${color.solidText}`}
      >
        {day.celebration_name}
      </h2>

      <p className={`mt-2.5 text-sm ${color.solidText} opacity-90`}>
        Warna Liturgi: {color.label}
        {day.rank && ` · ${day.rank}`}
      </p>

      {readings.length > 0 && (
        <div
          className={`mt-7 space-y-2 border-t border-black/15 pt-6 text-sm ${color.solidText} opacity-95`}
        >
          {readings.map(({ key, label }) => (
            <p key={key}>
              <span className="font-semibold">{label}:</span> {day.readings[key]}
            </p>
          ))}
        </div>
      )}
    </div>
  );

  if (!href) return panel;

  return (
    <Link href={href} className="group block">
      {panel}
    </Link>
  );
}
