import Link from "next/link";
import { cn } from "@/lib/cn";

export function Logo({
  className,
  light = false,
}: {
  className?: string;
  light?: boolean;
}) {
  return (
    <Link
      href="/"
      className={cn(
        "font-heading text-xl font-bold tracking-wide md:text-2xl",
        light ? "text-white" : "text-navy",
        className,
      )}
      aria-label="PJ Industries home"
    >
      PJ <span className="text-teal">Industries</span>
    </Link>
  );
}
