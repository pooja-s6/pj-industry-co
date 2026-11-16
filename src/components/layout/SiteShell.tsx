import { Footer } from "./Footer";
import { FloatingButtons } from "./FloatingButtons";
import { MobileStickyBar } from "./MobileStickyBar";
import { SiteChrome } from "./SiteChrome";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteChrome />
      <main className="flex-1 bg-white pb-20 md:pb-0">{children}</main>
      {/* Clear separation before footer on every page */}
      <div className="h-3 bg-light" aria-hidden />
      <div className="h-1 bg-teal" aria-hidden />
      <Footer />
      <FloatingButtons />
      <MobileStickyBar />
    </>
  );
}
