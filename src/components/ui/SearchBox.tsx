import { Search, X } from "lucide-react";

/**
 * Pencarian sebagai form GET biasa — tanpa JavaScript di klien, sejalan dengan
 * halaman yang seluruhnya Server Component. Filter lain (mis. kategori)
 * dititipkan sebagai hidden input supaya tidak hilang saat mencari.
 */
export function SearchBox({
  action,
  defaultValue,
  placeholder = "Cari…",
  hidden,
}: {
  action: string;
  defaultValue?: string;
  placeholder?: string;
  hidden?: Record<string, string | undefined>;
}) {
  return (
    <form action={action} method="get" role="search" className="flex gap-2">
      {Object.entries(hidden ?? {}).map(([name, value]) =>
        value ? <input key={name} type="hidden" name={name} value={value} /> : null
      )}

      <div className="relative flex-1">
        <Search
          size={16}
          aria-hidden
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-parish-300"
        />
        <input
          type="search"
          name="q"
          defaultValue={defaultValue}
          placeholder={placeholder}
          aria-label={placeholder}
          className="h-11 w-full rounded-[2px] border border-[var(--hairline-strong)] bg-parish-800 pl-9 pr-3 text-sm text-parish-50 placeholder:text-parish-300 focus:border-gold-400 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-400"
        />
      </div>

      <button
        type="submit"
        className="h-11 rounded-[2px] border border-gold-500 px-5 text-[13px] font-medium text-gold-400 transition-colors hover:bg-gold-500 hover:text-parish-900"
      >
        Cari
      </button>

      {defaultValue && (
        <a
          href={action}
          className="flex h-11 items-center gap-1.5 rounded-[2px] border border-[var(--hairline-strong)] px-4 text-[13px] text-parish-200 transition-colors hover:border-gold-400 hover:text-gold-400"
        >
          <X size={14} aria-hidden />
          Reset
        </a>
      )}
    </form>
  );
}
