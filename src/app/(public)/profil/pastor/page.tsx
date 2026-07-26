import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RichTextContent } from "@/components/ui/RichTextContent";
import { Reveal } from "@/components/ui/Reveal";
import { getPastors } from "@/lib/queries";
import type { Metadata } from "next";
import type { Pastor } from "@/types/database";

export const metadata: Metadata = {
  title: "Para Pastor — Paroki Yohanes Gabriel Perboyre",
};

export const revalidate = 300;

function PastorCard({ pastor, delay = 0 }: { pastor: Pastor; delay?: number }) {
  return (
    <Reveal delay={delay}>
      <Card className="p-6">
        <h3 className="font-display text-[19px] font-semibold text-parish-50">
          {pastor.name}
        </h3>
        <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.1em] text-gold-500">
          {pastor.priest_type}
          {pastor.serve_from &&
            ` · ${pastor.serve_from}${pastor.serve_to ? `–${pastor.serve_to}` : "–sekarang"}`}
        </p>
        {pastor.biography && (
          <RichTextContent
            html={pastor.biography}
            className="mt-4 text-sm text-parish-100"
          />
        )}
      </Card>
    </Reveal>
  );
}

export default async function PastorPage() {
  const pastors = await getPastors();
  const active = pastors.filter((p) => p.pastor_type === "Gembala Kami");
  const past = pastors.filter((p) => p.pastor_type === "Pernah Berkarya");

  return (
    <Container className="py-16">
      <SectionHeading
        eyebrow="Gembala Umat"
        title="Para Pastor"
        description="Para pastor yang melayani dan pernah berkarya di Paroki Yohanes Gabriel Perboyre."
      />

      <div className="mt-12 space-y-14">
        <div>
          <h2 className="mb-5 border-b border-[var(--hairline)] pb-3 font-mono text-[11px] uppercase tracking-[0.14em] text-gold-500">
            Gembala Kami Saat Ini
          </h2>
          <div className="grid gap-5">
            {active.map((p, i) => (
              <PastorCard key={p.id} pastor={p} delay={i * 0.06} />
            ))}
          </div>
        </div>

        {past.length > 0 && (
          <div>
            <h2 className="mb-5 border-b border-[var(--hairline)] pb-3 font-mono text-[11px] uppercase tracking-[0.14em] text-gold-500">
              Pernah Berkarya
            </h2>
            <div className="grid gap-5">
              {past.map((p, i) => (
                <PastorCard key={p.id} pastor={p} delay={(i % 4) * 0.05} />
              ))}
            </div>
          </div>
        )}
      </div>
    </Container>
  );
}
