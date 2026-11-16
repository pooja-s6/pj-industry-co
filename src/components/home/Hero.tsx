import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SiteImage } from "@/components/ui/SiteImage";
import { MEDIA } from "@/lib/media";
import { SITE } from "@/lib/site";

export function Hero() {
  return (
    <section className="relative isolate flex min-h-[calc(100dvh-4rem)] flex-col overflow-hidden bg-navy">
      <div className="absolute inset-0 -z-20">
        <SiteImage
          src={MEDIA.hero}
          alt="PJ Industries cooling units manufactured in Chennai"
          aspect="auto"
          priority
          className="h-full min-h-full opacity-100"
          sizes="100vw"
        />
      </div>
      {/* Left scrim for text only — machines stay visible on the right */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy/75 via-navy/40 to-navy/10" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-navy/30 via-transparent to-navy/15" />

      <Container className="flex flex-1 flex-col justify-center py-16 md:py-20">
        <p className="label text-teal drop-shadow-sm">Since {SITE.foundedYear}</p>
        <h1 className="mt-4 max-w-3xl font-heading text-[32px] font-bold leading-tight text-white drop-shadow-md md:text-[52px]">
          {SITE.tagline}
        </h1>
        <p className="mt-5 max-w-xl text-base text-white/90 md:text-lg">
          Hydraulic equipment manufacturer in Chennai since {SITE.foundedYear}.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href="/products" variant="quote">
            View Products
          </ButtonLink>
          <ButtonLink href="/enquiry" variant="ghost">
            Request a Quote
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
