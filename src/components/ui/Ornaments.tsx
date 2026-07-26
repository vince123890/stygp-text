/**
 * Ornamen arsitektural dari docs/paroki-template.html, digambar murni dengan
 * CSS sehingga tidak butuh aset gambar. Semua dekoratif — aria-hidden.
 */

/** Siluet deretan pelengkung gotik untuk latar hero / page header. */
export function GothicArches({ count = 6 }: { count?: number }) {
  return (
    <div aria-hidden className="absolute inset-0 z-0 flex opacity-50">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="relative flex-1 border-l border-[rgba(179,144,47,0.14)]"
        >
          <span
            className="absolute left-1/2 top-[8%] h-[78%] w-[82%] -translate-x-1/2 border border-b-0 border-[rgba(179,144,47,0.16)]"
            style={{ borderRadius: "50% 50% 0 0 / 30% 30% 0 0" }}
          />
        </div>
      ))}
    </div>
  );
}

/** Berkas cahaya yang memancar dari atas — conic gradient. */
export function LightRays() {
  return (
    <div
      aria-hidden
      className="animate-candle pointer-events-none absolute left-1/2 top-[-20%] z-0 h-[1400px] w-[1400px] -translate-x-1/2"
      style={{
        background:
          "conic-gradient(from 0deg, transparent 0deg 8deg, rgba(244,217,160,.05) 8deg 9deg, transparent 9deg 18deg)",
      }}
    />
  );
}

/** Rose window — elemen signature, dipakai sebagai pemisah antar seksi. */
export function RosetteDivider({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`flex items-center justify-center py-16 ${className}`}
    >
      <div
        className="animate-rosette relative h-[220px] w-[220px] rounded-full sm:h-[280px] sm:w-[280px]"
        style={{
          background:
            "repeating-conic-gradient(from 0deg, rgba(179,144,47,.9) 0deg 3deg, transparent 3deg 30deg)," +
            "radial-gradient(circle at center, var(--candle) 0%, rgba(179,144,47,.35) 38%, transparent 62%)",
          boxShadow: "0 0 60px 10px rgba(244,217,160,.08)",
        }}
      >
        <span
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "repeating-conic-gradient(from 15deg, rgba(107,31,42,.55) 0deg 2deg, transparent 2deg 30deg)",
          }}
        />
        <span className="absolute inset-[32%] rounded-full border border-[var(--brass)] bg-[var(--ink)]" />
      </div>
    </div>
  );
}
