import { Footer } from "./Footer";
import { FloatingButtons } from "./FloatingButtons";
import { MobileStickyBar } from "./MobileStickyBar";
import { SiteChrome } from "./SiteChrome";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteChrome />
      {/* Mobile sticky bar clearance for main + footer (copyright must stay visible) */}
      <div className="flex flex-1 flex-col pb-[calc(4.5rem+env(safe-area-inset-bottom))] md:pb-0">
        <main className="flex-1 bg-white">{children}</main>
        {/* Clear separation before footer on every page */}
        <div className="h-3 bg-light" aria-hidden />
        <div className="h-1 bg-teal" aria-hidden />
        <Footer />
      </div>
      <FloatingButtons />
      <MobileStickyBar />
    </>
  );
}
