"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { GothicArches, LightRays } from "@/components/ui/Ornaments";
import type { HeroSlide } from "@/types/database";

export function HeroSlider({ slides }: { slides: HeroSlide[] }) {
  const [active, setActive] = useState(0);

  const next = useCallback(() => {
    setActive((v) => (v + 1) % slides.length);
  }, [slides.length]);

  const prev = () => setActive((v) => (v - 1 + slides.length) % slides.length);

  useEffect(() => {
    if (slides.length < 2) return;
    const id = setInterval(next, 6000);
    return () => clearInterval(id);
  }, [next, slides.length]);

  if (slides.length === 0) return null;

  return (
    <div className="relative flex min-h-[92vh] w-full items-end overflow-hidden bg-parish-900 pb-24">
      {/* Latar arsitektural CSS dari template — tetap terlihat di sela foto */}
      <GothicArches />
      <LightRays />
      <div
        aria-hidden
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% -10%, rgba(179,144,47,.18), transparent 60%)",
        }}
      />

      {slides.map((slide, i) => (
        <div
          key={slide.id}
          className={cn(
            "absolute inset-0 z-[1] transition-opacity duration-[900ms] ease-out",
            i === active ? "opacity-100" : "pointer-events-none opacity-0"
          )}
        >
          <Image
            src={slide.image_url}
            alt={slide.title}
            fill
            priority={i === 0}
            className={cn(
              "object-cover transition-transform duration-[7000ms] ease-out motion-reduce:transition-none",
              i === active ? "scale-105" : "scale-100"
            )}
            sizes="100vw"
          />
          {/* Foto diredam agar menyatu dengan nuansa ink template */}
          <div className="absolute inset-0 bg-parish-900/55" />
          <div className="absolute inset-0 bg-gradient-to-t from-parish-900 via-parish-900/70 to-parish-900/25" />
        </div>
      ))}

      {/* Teks di luar loop agar tidak ikut memudar bersama foto */}
      <div className="relative z-[2] mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        {slides.map((slide, i) => (
          <div
            key={slide.id}
            className={cn(
              "transition-all duration-700 ease-out",
              i === active
                ? "opacity-100"
                : "pointer-events-none absolute inset-x-4 top-0 translate-y-3 opacity-0 sm:inset-x-6 lg:inset-x-8"
            )}
            aria-hidden={i !== active}
          >
            <span className="mb-3.5 block font-mono text-[11px] uppercase tracking-[0.14em] text-gold-400">
              Paroki Yohanes Gabriel Perboyre
            </span>
            <h1 className="max-w-[820px] font-display text-[clamp(38px,6vw,74px)] font-semibold leading-[1.1] tracking-[-0.01em] text-parish-50">
              {slide.title}
            </h1>
            {slide.subtitle && (
              <p className="mt-5 max-w-[480px] text-base text-parish-200">
                {slide.subtitle}
              </p>
            )}
            <div className="mt-9 flex flex-wrap gap-4">
              {slide.link_url && (
                <Link
                  href={slide.link_url}
                  className="inline-flex items-center rounded-[2px] border border-transparent bg-wine-600 px-6 py-3.5 text-sm font-medium tracking-[0.02em] text-parish-50 transition-colors hover:bg-wine-500"
                >
                  Selengkapnya
                </Link>
              )}
              <Link
                href="/jadwal-misa"
                className="inline-flex items-center rounded-[2px] border border-[rgba(237,230,214,0.35)] px-6 py-3.5 text-sm font-medium tracking-[0.02em] text-parish-50 transition-colors hover:border-gold-400 hover:text-gold-400"
              >
                Lihat Jadwal Misa
              </Link>
            </div>
          </div>
        ))}
      </div>

      {slides.length > 1 && (
        <>
          <button
            onClick={prev}
            aria-label="Slide sebelumnya"
            className="absolute left-4 top-1/2 z-[3] hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-[2px] border border-[var(--hairline-strong)] text-parish-50 backdrop-blur transition-colors hover:border-gold-400 hover:text-gold-400 sm:flex"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={next}
            aria-label="Slide berikutnya"
            className="absolute right-4 top-1/2 z-[3] hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-[2px] border border-[var(--hairline-strong)] text-parish-50 backdrop-blur transition-colors hover:border-gold-400 hover:text-gold-400 sm:flex"
          >
            <ChevronRight size={20} />
          </button>

          <div className="absolute bottom-8 left-1/2 z-[3] flex -translate-x-1/2 gap-2">
            {slides.map((slide, i) => (
              <button
                key={slide.id}
                aria-label={`Ke slide ${i + 1}`}
                onClick={() => setActive(i)}
                className={cn(
                  "h-[3px] transition-all duration-300",
                  i === active ? "w-10 bg-gold-500" : "w-3 bg-parish-50/30"
                )}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
