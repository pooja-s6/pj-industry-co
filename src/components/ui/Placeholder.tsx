import { cn } from "@/lib/cn";

export function PlaceholderImage({
  label,
  aspect = "4/3",
  className,
}: {
  label: string;
  aspect?: "4/3" | "16/9" | "1/1" | "auto";
  className?: string;
}) {
  const aspectClass =
    aspect === "4/3"
      ? "aspect-[4/3]"
      : aspect === "16/9"
        ? "aspect-video"
        : aspect === "1/1"
          ? "aspect-square"
          : "";

  return (
    <div
      className={cn(
        "placeholder-box w-full",
        aspectClass,
        className,
      )}
      role="img"
      aria-label={`Placeholder: ${label}`}
    >
      <span>
        [PLACEHOLDER IMAGE]
        <br />
        {label}
      </span>
    </div>
  );
}

export function PlaceholderText({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <span className={cn("placeholder-text", className)}>{children}</span>;
}
