import Link from "next/link";
import { Container } from "./Container";

export function PageHeader({
  title,
  description,
  crumbs,
}: {
  title: string;
  description?: string;
  crumbs: { href?: string; label: string }[];
}) {
  return (
    <div className="border-b border-steel/15 bg-light">
      <Container className="py-10 md:py-14">
        <nav aria-label="Breadcrumb" className="mb-4 text-sm text-steel">
          <ol className="flex flex-wrap items-center gap-2">
            {crumbs.map((crumb, i) => (
              <li key={`${crumb.label}-${i}`} className="flex items-center gap-2">
                {i > 0 && <span aria-hidden>/</span>}
                {crumb.href ? (
                  <Link href={crumb.href} className="hover:text-teal">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-navy">{crumb.label}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <h1 className="font-heading text-[32px] font-bold text-navy md:text-5xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-3 max-w-2xl text-steel">{description}</p>
        ) : null}
      </Container>
    </div>
  );
}
