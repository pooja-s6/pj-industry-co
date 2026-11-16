import Image from "next/image";
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
      className={cn("inline-flex items-center gap-2.5", className)}
      aria-label="PJ Industries home"
    >
      <Image
        src="/images/about/logo.jpeg"
        alt="PJ Industries"
        width={48}
        height={48}
        priority
        className="size-10 rounded-full bg-white object-cover md:size-11"
      />
      <span
        className={cn(
          "font-heading text-xl font-bold tracking-wide md:text-2xl",
          light ? "text-white" : "text-navy",
        )}
      >
        PJ <span className="text-teal">Industries</span>
      </span>
    </Link>
  );
}
