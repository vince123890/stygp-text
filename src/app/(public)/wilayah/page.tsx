import { Users } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getTerritories } from "@/lib/queries";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wilayah & Lingkungan — Paroki Yohanes Gabriel Perboyre",
};

export const revalidate = 300;

export default async function WilayahPage() {
  const territories = await getTerritories();

  return (
    <Container className="py-16">
      <SectionHeading
        eyebrow="Struktur Teritorial"
        title="Wilayah & Lingkungan"
        description="Pembagian wilayah dan lingkungan umat Paroki Yohanes Gabriel Perboyre."
      />

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        {territories.map((t) => (
          <Card key={t.id} className="p-6">
            <h3 className="font-display text-lg text-parish-50">{t.name}</h3>
            <p className="text-sm text-parish-200">Ketua Wilayah: {t.chairman}</p>
            <div className="mt-4 divide-y divide-[var(--hairline)] border-t border-[var(--hairline)]">
              {t.neighborhoods.map((n) => (
                <div key={n.id} className="flex items-center justify-between gap-2 py-2.5">
                  <div>
                    <p className="text-sm font-medium text-parish-100">{n.name}</p>
                    <p className="text-xs text-parish-200">Ketua: {n.chairman}</p>
                  </div>
                  <span className="flex items-center gap-1 text-xs text-parish-300">
                    <Users size={12} />
                    {n.family_count} KK
                  </span>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </Container>
  );
}
