import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

/* Mengikuti .btn pada docs/paroki-template.html: sudut nyaris siku
   (radius 2px), wine untuk aksi utama, garis kuningan untuk sekunder. */
const variantClasses: Record<Variant, string> = {
  primary: "border-transparent bg-wine-600 text-parish-50 hover:bg-wine-500",
  secondary:
    "border-gold-500 text-gold-400 hover:bg-gold-500 hover:text-parish-900",
  outline:
    "border-[rgba(237,230,214,0.35)] text-parish-50 hover:border-gold-400 hover:text-gold-400",
  ghost:
    "border-transparent text-parish-200 hover:bg-white/5 hover:text-gold-400",
};

const sizeClasses: Record<Size, string> = {
  sm: "px-4 py-2 text-[13px]",
  md: "px-6 py-3 text-sm",
  lg: "px-7 py-3.5 text-base",
};

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
}

export function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  className,
  onClick,
  type = "button",
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-[2px] border font-medium tracking-[0.02em] transition-all duration-200",
    variantClasses[variant],
    sizeClasses[size],
    className
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
