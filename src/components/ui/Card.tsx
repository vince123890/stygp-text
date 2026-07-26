import { cn } from "@/lib/utils";

/**
 * Panel gelap dengan hairline kuningan — .card pada
 * docs/paroki-template.html. `hover` mengaktifkan lift (lihat .lift-sm
 * di globals.css) untuk kartu yang bisa diklik.
 */
export function Card({
  className,
  children,
  hover = true,
}: {
  className?: string;
  children: React.ReactNode;
  hover?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-[2px] border border-[var(--hairline)] bg-parish-800",
        hover && "lift-sm",
        className
      )}
    >
      {children}
    </div>
  );
}
