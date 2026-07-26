import { cn } from "@/lib/utils";

export function Badge({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-[2px] border border-[var(--hairline-strong)] bg-gold-500/10 px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.12em] text-gold-400",
        className
      )}
    >
      {children}
    </span>
  );
}
