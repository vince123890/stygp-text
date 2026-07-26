import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { DEFAULT_MAP_EMBED_URL } from "@/components/ParishMap";
import { RichTextContent } from "@/components/ui/RichTextContent";
import { getParishProfile } from "@/lib/queries";

export async function Footer() {
  const profile = await getParishProfile();

  return (
    <footer
      id="kontak"
      className="mt-24 border-t border-[var(--hairline)] bg-parish-950 text-parish-200"
    >
      <Container className="grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2.5 font-display text-lg font-semibold text-parish-50">
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-gold-500/40 p-1">
              <Image src="/logo.png" alt="" width={28} height={28} className="h-full w-full object-contain" />
            </span>
            Paroki YGP
          </div>
          <p className="mt-4 text-sm leading-relaxed text-parish-200">
            Bersatu dalam iman, tumbuh dalam kasih, dan berbagi sukacita Injil
            kepada sesama.
          </p>
        </div>

        <div>
          <h3 className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-gold-500">
            Jelajahi
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-parish-200">
            <li>
              <Link href="/" className="transition-colors hover:text-gold-400">
                Beranda
              </Link>
            </li>
            <li>
              <Link href="/jadwal-misa" className="transition-colors hover:text-gold-400">
                Jadwal Misa
              </Link>
            </li>
            <li>
              <Link href="/artikel" className="transition-colors hover:text-gold-400">
                Artikel
              </Link>
            </li>
            <li>
              <Link href="/pengumuman" className="transition-colors hover:text-gold-400">
                Pengumuman
              </Link>
            </li>
            <li>
              <Link href="/profil" className="transition-colors hover:text-gold-400">
                Profil Paroki
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-gold-500">
            Kontak
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-parish-200">
            {profile?.address && (
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 shrink-0" />
                <RichTextContent html={profile.address} />
              </li>
            )}
            {profile?.phone1 && (
              <li className="flex items-center gap-2">
                <Phone size={16} className="shrink-0" />
                {profile.phone1}
              </li>
            )}
            {profile?.email && (
              <li className="flex items-center gap-2">
                <Mail size={16} className="shrink-0" />
                {profile.email}
              </li>
            )}
          </ul>
        </div>

        <div>
          <h3 className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-gold-500">
            Jam Sekretariat
          </h3>
          {profile?.office_hours && (
            <div className="mt-4 flex items-start gap-2 text-sm text-parish-200">
              <Clock size={16} className="mt-0.5 shrink-0" />
              <RichTextContent html={profile.office_hours} />
            </div>
          )}

          <div className="mt-5">
            <h3 className="mb-3 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-gold-500">
              Lokasi
            </h3>
            <div className="overflow-hidden rounded-[2px] border border-[var(--hairline)]">
              <iframe
                src={profile?.map_embed_url || DEFAULT_MAP_EMBED_URL}
                title="Peta Lokasi Paroki"
                className="h-40 w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </Container>

      <div className="border-t border-[var(--hairline)] py-6">
        <Container className="text-center text-[12.5px] text-parish-300">
          © {new Date().getFullYear()} Paroki Yohanes Gabriel Perboyre. Seluruh hak cipta dilindungi.
        </Container>
      </div>
    </footer>
  );
}
