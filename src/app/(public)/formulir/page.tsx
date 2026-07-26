import { FileText, ExternalLink } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RichTextContent } from "@/components/ui/RichTextContent";
import { getSacramentForms } from "@/lib/queries";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Formulir — Paroki Yohanes Gabriel Perboyre",
};

export const revalidate = 300;

export default async function FormulirPage() {
  const forms = await getSacramentForms();

  return (
    <Container className="py-16">
      <SectionHeading
        eyebrow="Administrasi"
        title="Formulir"
        description="Unduh formulir untuk keperluan sakramen dan administrasi paroki."
      />

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {forms.map((f) => (
          <a
            key={f.id}
            href={f.file_url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block"
          >
            <Card className="flex items-start gap-4 p-5">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--hairline-strong)] bg-gold-500/10 text-gold-400">
                <FileText size={20} />
              </span>
              <div className="flex-1">
                <Badge>{f.category}</Badge>
                <h3 className="mt-2 font-display text-base text-parish-50 group-hover:text-parish-200">
                  {f.name}
                </h3>
                {f.description && (
                  <RichTextContent
                    html={f.description}
                    className="mt-1 text-sm text-parish-200"
                  />
                )}
                <span className="mt-3 inline-flex items-center gap-1.5 text-sm text-gold-400">
                  Buka di Google Drive
                  <ExternalLink size={13} />
                </span>
              </div>
            </Card>
          </a>
        ))}
      </div>
    </Container>
  );
}
