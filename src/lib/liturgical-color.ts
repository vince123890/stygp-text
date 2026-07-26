import type { LiturgicalColor } from "@/types/database";

/**
 * Warna liturgi harus tetap literal (hijau ya hijau, ungu ya ungu) — jadi
 * nilainya dikunci sebagai hex, tidak ikut skala `parish-*` yang di-remap ke
 * nuansa ink template. `bg`/`text` dipakai di atas latar gelap, sedangkan
 * `solid`/`solidText` untuk kartu berwarna penuh.
 */
export const LITURGICAL_COLOR_STYLES: Record<
  LiturgicalColor,
  { label: string; dot: string; bg: string; text: string; solid: string; solidText: string }
> = {
  putih: {
    label: "Putih",
    dot: "bg-[#f3f0e6] border border-[#cfc9b6]",
    bg: "bg-[#f3f0e6]/10",
    text: "text-[#ece7d8]",
    solid: "bg-[#ece7d8]",
    solidText: "text-[#2b2a24]",
  },
  merah: {
    label: "Merah",
    dot: "bg-[#a8202f]",
    bg: "bg-[#a8202f]/15",
    text: "text-[#e88b95]",
    solid: "bg-[#a8202f]",
    solidText: "text-[#fdf3f3]",
  },
  hijau: {
    label: "Hijau",
    dot: "bg-[#2f7d52]",
    bg: "bg-[#2f7d52]/15",
    text: "text-[#7fd0a3]",
    solid: "bg-[#2f7d52]",
    solidText: "text-[#f1fbf5]",
  },
  ungu: {
    label: "Ungu",
    dot: "bg-[#6b4a9e]",
    bg: "bg-[#6b4a9e]/15",
    text: "text-[#b79ae0]",
    solid: "bg-[#6b4a9e]",
    solidText: "text-[#f7f4fd]",
  },
  merah_muda: {
    label: "Merah Muda",
    dot: "bg-[#d9789a]",
    bg: "bg-[#d9789a]/15",
    text: "text-[#f0a8c0]",
    solid: "bg-[#d9789a]",
    solidText: "text-[#2b1a20]",
  },
};
