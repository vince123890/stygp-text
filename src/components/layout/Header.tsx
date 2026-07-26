"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

type NavItem = { href: string; label: string };
type NavEntry = NavItem | { label: string; items: NavItem[] };

const NAV: NavEntry[] = [
  { href: "/", label: "Beranda" },
  {
    label: "Profil",
    items: [
      { href: "/profil", label: "Profil Paroki" },
      { href: "/profil/sejarah", label: "Sejarah" },
      { href: "/profil/pastor", label: "Para Pastor" },
      { href: "/organisasi", label: "Struktur Organisasi" },
      { href: "/wilayah", label: "Wilayah & Lingkungan" },
    ],
  },
  { href: "/jadwal-misa", label: "Jadwal Misa" },
  {
    label: "Kegiatan",
    items: [
      { href: "/kategorial", label: "Kategorial" },
      { href: "/karya-sosial", label: "Karya Sosial" },
      { href: "/galeri", label: "Galeri" },
    ],
  },
  {
    label: "Info",
    items: [
      { href: "/artikel", label: "Artikel" },
      { href: "/pengumuman", label: "Pengumuman" },
      { href: "/kalender-liturgi", label: "Kalender Liturgi" },
      { href: "/formulir", label: "Formulir" },
      { href: "/intensi-misa", label: "Intensi Misa" },
    ],
  },
];

function DesktopDropdown({ label, items }: { label: string; items: NavItem[] }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button className="flex items-center gap-1 py-1 text-sm text-parish-200 transition-colors hover:text-gold-400">
        {label}
        <ChevronDown size={14} />
      </button>
      <div
        className={cn(
          "absolute left-1/2 top-full grid w-56 -translate-x-1/2 grid-cols-1 gap-0.5 rounded-[2px] border border-[var(--hairline-strong)] bg-parish-800 p-2 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.6)] transition-all duration-200",
          open
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-1 opacity-0"
        )}
      >
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-[2px] px-3 py-2 text-sm text-parish-100 transition-colors hover:bg-white/5 hover:text-gold-400"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-b from-parish-900/95 via-parish-900/85 to-parish-900/60 backdrop-blur-md">
      <Container className="flex h-20 items-center justify-between gap-4">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2.5 font-display text-lg font-semibold text-parish-50"
        >
          <Image
            src="/logo.png"
            alt="Logo Paroki Yohanes Gabriel Perboyre"
            width={56}
            height={56}
            className="h-12 w-12 object-contain"
          />
          <span className="whitespace-nowrap">Paroki YGP</span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {NAV.map((entry) =>
            "items" in entry ? (
              <DesktopDropdown key={entry.label} label={entry.label} items={entry.items} />
            ) : (
              <Link
                key={entry.href}
                href={entry.href}
                className="py-1 text-sm text-parish-200 transition-colors hover:text-gold-400"
              >
                {entry.label}
              </Link>
            )
          )}
        </nav>

        <div className="hidden lg:block">
          <Button href="/jadwal-misa" variant="secondary" size="sm">
            Lihat Jadwal Misa
          </Button>
        </div>

        <button
          className="-mr-2 flex h-11 w-11 items-center justify-center rounded-[2px] text-parish-50 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Buka menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </Container>

      <div
        className={cn(
          "overflow-y-auto overflow-x-hidden border-t border-[var(--hairline)] bg-parish-800 transition-[max-height] duration-300 md:hidden",
          open ? "max-h-[80vh]" : "max-h-0 border-t-0"
        )}
      >
        <Container className="flex flex-col gap-1 py-3">
          {NAV.map((entry) =>
            "items" in entry ? (
              <div key={entry.label} className="py-1">
                <p className="px-3 pb-1 font-mono text-[11px] uppercase tracking-[0.14em] text-gold-500">
                  {entry.label}
                </p>
                {entry.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-[2px] px-3 py-3 text-sm text-parish-100 transition-colors hover:bg-white/5 hover:text-gold-400"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            ) : (
              <Link
                key={entry.href}
                href={entry.href}
                onClick={() => setOpen(false)}
                className="rounded-[2px] px-3 py-3 text-sm text-parish-100 transition-colors hover:bg-white/5 hover:text-gold-400"
              >
                {entry.label}
              </Link>
            )
          )}
        </Container>
      </div>
    </header>
  );
}
