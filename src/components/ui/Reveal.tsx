"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type Direction = "up" | "down" | "left" | "right" | "scale" | "fade";

/**
 * Padanan framer-motion `whileInView` + `viewport={{ once: true }}` yang
 * dipakai di docs/paroki-template.html, tanpa menambah dependency.
 *
 * State awal & transisinya didefinisikan di globals.css lewat `[data-reveal]`
 * agar elemen sudah tersembunyi sejak render pertama (tidak ada flash of
 * content sebelum JS hydrate). `delay` diterapkan sebagai transitionDelay,
 * sama seperti stagger `index * 0.2s` di template.
 */
export function Reveal({
  children,
  direction = "up",
  delay = 0,
  className,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  direction?: Direction;
  /** detik — untuk stagger, kalikan index dengan 0.08–0.2 */
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "article" | "header";
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // threshold 0.15 saja tidak cukup: elemen yang lebih tinggi dari viewport
    // (mis. biografi pastor yang panjang) tidak pernah menampilkan 15% bagian
    // dirinya sekaligus, sehingga callback tak pernah kebagian isIntersecting
    // dan kontennya tersangkut setengah transparan. Karena itu dipakai dua
    // threshold — 0 menangkap elemen tinggi begitu tepiannya masuk layar.
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true);
            io.unobserve(entry.target); // once: true
          }
        }
      },
      { threshold: [0, 0.15], rootMargin: "0px 0px -40px 0px" }
    );

    io.observe(el);

    // Jaring pengaman: apa pun yang terjadi pada observer, konten tidak boleh
    // tertinggal tak terbaca.
    const failsafe = window.setTimeout(() => setShown(true), 3000);

    return () => {
      io.disconnect();
      window.clearTimeout(failsafe);
    };
  }, []);

  return (
    <Tag
      // Tag polimorfik: elemen konkretnya baru diketahui saat runtime, jadi
      // ref-nya disimpan sebagai HTMLElement dan di-cast di sini.
      ref={(node: HTMLElement | null) => {
        ref.current = node;
      }}
      data-reveal={direction}
      className={cn(shown && "in-view", className)}
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </Tag>
  );
}
