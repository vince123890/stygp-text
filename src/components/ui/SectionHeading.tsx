import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/Reveal";

/**
 * .section-head pada docs/paroki-template.html — eyebrow mono berspasi
 * lebar di atas judul serif. Judul memakai reveal `down`, setara
 * initial={{ opacity:0, y:-20 }} di template.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
  center = false,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
  center?: boolean;
}) {
  return (
    <Reveal
      direction="down"
      className={cn("max-w-2xl", center && "mx-auto text-center", className)}
    >
      {eyebrow && (
        <span className="mb-3.5 block font-mono text-[11px] uppercase tracking-[0.14em] text-gold-500">
          {eyebrow}
        </span>
      )}
      <h2 className="font-display text-[clamp(28px,3.4vw,42px)] font-semibold leading-[1.1] tracking-[-0.01em] text-parish-50">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-[15.5px] leading-relaxed text-parish-200">
          {description}
        </p>
      )}
    </Reveal>
  );
}
