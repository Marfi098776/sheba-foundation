import { Container } from "@/components/shared/container";
import { DonateButton } from "@/components/shared/donate-button";
import { Logo } from "@/components/shared/logo";
import { getSiteContent } from "@/content/site";
import type { ContactInfo, NavigationGroup, NavigationGroupKey } from "@/content/types";
import { FooterNav } from "./footer-nav";

const GROUP_TITLES: Record<NavigationGroupKey, string> = {
  organization: "Organization",
  programs: "Programs",
  getInvolved: "Get Involved",
  resources: "Resources",
};

const GROUP_ORDER: NavigationGroupKey[] = [
  "organization",
  "programs",
  "getInvolved",
  "resources",
];

export async function SiteFooter() {
  const { nav, contact, social, name, tagline } = await getSiteContent();

  const groups: NavigationGroup[] = GROUP_ORDER.map((key) => ({
    key,
    title: GROUP_TITLES[key],
    items: nav.filter((item) => item.group === key && item.href !== "/"),
  })).filter((group) => group.items.length > 0);

  const confirmedSocial = social.filter((link) => link.href !== null);
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border bg-secondary">
      <Container className="py-14">
        <div className="flex flex-col gap-10 lg:flex-row lg:justify-between">
          <div className="max-w-sm">
            <Logo className="text-foreground" />
            <p className="mt-4 text-sm text-muted-foreground">{tagline}</p>
            <div className="mt-6">
              <DonateButton size="default" />
            </div>
          </div>

          <div className="lg:flex-1">
            <FooterNav groups={groups} />
          </div>

          <div className="max-w-xs">
            <h2 className="text-sm font-semibold tracking-wide text-foreground uppercase">
              Contact
            </h2>
            <ContactBlock contact={contact} />
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">
            &copy; {year} {name}
          </p>

          {confirmedSocial.length > 0 ? (
            <ul className="flex flex-wrap gap-4">
              {confirmedSocial.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href as string}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground hover:underline"
                  >
                    {link.label}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </Container>
    </footer>
  );
}

/**
 * Renders only contact details the client has actually supplied. When none are
 * confirmed it says so plainly rather than rendering a dead `mailto:` or
 * `tel:` link, which would imply a working contact channel that does not exist.
 */
function ContactBlock({ contact }: { contact: ContactInfo }) {
  const { email, phone, address } = contact;
  const addressLines = address
    ? [
        address.street,
        address.locality,
        [address.region, address.postalCode].filter(Boolean).join(" "),
        address.country,
      ].filter((line): line is string => Boolean(line && line.trim()))
    : [];

  const hasAny = Boolean(email || phone || addressLines.length > 0);

  if (!hasAny) {
    return (
      <p className="mt-4 text-sm text-muted-foreground">
        Contact details have not yet been published. Please check back soon.
      </p>
    );
  }

  return (
    <div className="mt-4 flex flex-col gap-3 text-sm text-muted-foreground">
      {email ? (
        <a
          href={`mailto:${email}`}
          className="transition-colors hover:text-foreground hover:underline"
        >
          {email}
        </a>
      ) : null}
      {phone ? (
        <a
          href={`tel:${phone.replace(/[^+\d]/g, "")}`}
          className="transition-colors hover:text-foreground hover:underline"
        >
          {phone}
        </a>
      ) : null}
      {addressLines.length > 0 ? (
        <address className="not-italic">
          {addressLines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </address>
      ) : null}
    </div>
  );
}
