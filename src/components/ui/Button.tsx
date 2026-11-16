import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "quote" | "ghost";

const variants: Record<Variant, string> = {
  primary:
    "bg-navy text-white hover:bg-teal focus-visible:outline-teal",
  secondary:
    "bg-white text-navy border border-navy hover:border-teal hover:text-teal focus-visible:outline-teal",
  quote:
    "bg-teal text-white hover:bg-[#c4146a] focus-visible:outline-teal shadow-sm",
  ghost:
    "bg-transparent text-white border-2 border-white hover:bg-white/15 focus-visible:outline-white",
};

type Common = {
  children: React.ReactNode;
  className?: string;
  variant?: Variant;
};

export function ButtonLink({
  href,
  children,
  className,
  variant = "primary",
  onClick,
}: Common & { href: string; onClick?: () => void }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "inline-flex min-h-11 items-center justify-center px-5 py-2.5 text-sm font-medium tracking-wide transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
        variants[variant],
        className,
      )}
    >
      {children}
    </Link>
  );
}

export function Button({
  children,
  className,
  variant = "primary",
  type = "button",
  disabled,
  onClick,
}: Common & {
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "inline-flex min-h-11 items-center justify-center px-5 py-2.5 text-sm font-medium tracking-wide transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60",
        variants[variant],
        className,
      )}
    >
      {children}
    </button>
  );
}
