import { cn } from "@/lib/cn";
import { Container } from "./Container";

export function Section({
  children,
  className,
  tone = "white",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "white" | "light" | "navy";
  id?: string;
}) {
  const tones = {
    white: "bg-white",
    light: "bg-light",
    navy: "bg-navy text-white",
  };

  return (
    <section id={id} className={cn("section-pad", tones[tone], className)}>
      <Container>{children}</Container>
    </section>
  );
}
