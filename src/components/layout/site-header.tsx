import { DonateButton } from "@/components/shared/donate-button";
import { Logo } from "@/components/shared/logo";
import { getHeaderNav } from "@/content/site";
import { MainNav } from "./main-nav";
import { MobileNav } from "./mobile-nav";
import { getAllNav } from "@/content/site";

export async function SiteHeader() {
  const [headerNav, allNav] = await Promise.all([getHeaderNav(), getAllNav()]);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:h-20 lg:px-8">
        <Logo />

        <div className="flex items-center gap-2 lg:gap-4">
          <MainNav items={headerNav} />

          <div className="flex items-center gap-2">
            <DonateButton size="sm" className="hidden sm:inline-flex" />
            <MobileNav items={allNav} />
          </div>
        </div>
      </div>
    </header>
  );
}
