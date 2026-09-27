/**
 * Domain models for the Canadian Sheba Foundation content layer.
 *
 * These types are intentionally framework-agnostic: no React types, no JSX, and
 * no imports. They are shaped so that a future database or CMS can satisfy them
 * directly, with only the accessor function bodies in `src/content/` changing.
 *
 * Unconfirmed real-world facts are modelled as `null` rather than as an empty
 * string or a filler value, so a missing fact can never be mistaken for a real
 * one. See AGENTS.md rule 8.
 */

/** A single destination in the site navigation. */
export interface NavigationItem {
  label: string;
  href: string;
  /** Footer grouping. Also drives which column the link lands in. */
  group: NavigationGroupKey;
  /** Whether this item appears in the desktop header. */
  inHeader: boolean;
  /** Present only when the destination leaves the site. */
  external?: boolean;
}

export type NavigationGroupKey =
  | "organization"
  | "programs"
  | "getInvolved"
  | "resources";

/** A titled set of navigation items, derived from `NavigationItem.group`. */
export interface NavigationGroup {
  key: NavigationGroupKey;
  title: string;
  items: NavigationItem[];
}

export interface SocialLink {
  /** Accessible name, e.g. "Facebook". */
  label: string;
  /** Null until the client supplies the official profile URL. */
  href: string | null;
}

export interface PostalAddress {
  street: string | null;
  locality: string | null;
  region: string | null;
  postalCode: string | null;
  country: string | null;
}

export interface ContactInfo {
  email: string | null;
  phone: string | null;
  address: PostalAddress | null;
  hours: string | null;
}

export interface DonationInfo {
  /** External donation platform, e.g. a registered fundraising host. */
  platform: string | null;
  /** Outbound donation page on the external platform. Null until confirmed. */
  url: string | null;
  /**
   * "confirmed" only once the client has supplied a live URL. While
   * "pending", the site must link to its own /donate information page and must
   * never present a placeholder as a working donation link.
   */
  status: "confirmed" | "pending";
  note: string | null;
}

export interface SiteInfo {
  name: string;
  /** Abbreviated name for tight spaces. Null until the client confirms one. */
  shortName: string | null;
  tagline: string;
  /**
   * Absolute origin used for canonical URLs and the sitemap. Null until the
   * client confirms the production domain; no absolute URL may be emitted
   * before then.
   */
  url: string | null;
  locale: string;
  contact: ContactInfo;
  donation: DonationInfo;
  social: SocialLink[];
  nav: NavigationItem[];
  /** WhatsApp phone number in international format (e.g., +15551234567). Null until confirmed. */
  whatsappPhone: string | null;
}

/** A distinct activity or offering within a program. */
export interface ProgramActivity {
  title: string;
  description: string | null;
}

export type ProgramCategory =
  | "family-support"
  | "community"
  | "volunteer"
  | "scholarships"
  | "newcomer-support";

export type ProgramStatus = "active" | "pending-details";

export interface Program {
  slug: string;
  title: string;
  category: ProgramCategory;
  /** One-sentence description of the program area. */
  summary: string;
  /** Longer description, or null while awaiting approved copy. */
  description: string | null;
  activities: ProgramActivity[];
  /**
   * Set when the program also has a dedicated top-level page. `/programs/[slug]`
   * permanently redirects to that page so each topic has exactly one canonical
   * URL. See the Phase 0.5 architecture decision on duplicate content.
   */
  dedicatedRoute: string | null;
  status: ProgramStatus;
  /** Path under /public. Null until photography is supplied. */
  image: string | null;
}

export interface ImpactStat {
  id: string;
  label: string;
  value: number | null;
  suffix: string | null;
  description: string | null;
  /**
   * Statistics are only rendered once a human has confirmed them. An unverified
   * figure must never reach the page.
   */
  verified: boolean;
}

export interface Person {
  id: string;
  /** Null until the client confirms the individual and their consent to publish. */
  name: string | null;
  role: string;
  bio: string | null;
  photo: string | null;
}

export interface VolunteerInfo {
  description: string | null;
  opportunities: string[];
  /**
   * Phase 1 has no volunteer registration. A call to action must say so plainly
   * until the client supplies an external registration destination.
   */
  registrationAvailable: boolean;
  registrationUrl: string | null;
}

export interface CharityRegistration {
  legalName: string | null;
  registrationNumber: string | null;
  jurisdiction: string | null;
}

export interface OrganizationInfo {
  about: string | null;
  mission: string | null;
  vision: string | null;
  /** Empty until the client supplies the official charitable purposes. */
  charitablePurposes: string[];
  history: string | null;
  board: Person[];
  leadership: Person[];
  /** Note about the Founding Patrons position, null until the client supplies wording. */
  foundingPatronsNote: string | null;
  volunteers: VolunteerInfo;
  registration: CharityRegistration;
}

/**
 * Icon key for a core value. Purely a presentation hint for the component
 * layer; it never carries meaning on its own, so a value must remain
 * understandable with the icon removed.
 */
export type ValueIconKey =
  | "community"
  | "education"
  | "opportunity"
  | "health"
  | "volunteer"
  | "connection";

/** One of the Foundation's confirmed areas of focus. */
export interface CoreValue {
  id: string;
  title: string;
  /**
   * Restates a confirmed program area. Must not introduce claims, figures, or
   * outcomes of its own.
   */
  description: string;
  icon: ValueIconKey;
}

export interface ImpactContent {
  values: CoreValue[];
  /**
   * Carries verified figures only. Stays empty until a human confirms numbers;
   * `ImpactStat.verified` gates rendering, so an unverified figure cannot leak
   * onto the page. See AGENTS.md rule 8.
   */
  stats: ImpactStat[];
}

export type InvolvedPathIconKey = "volunteer" | "partner" | "events";

/** A primary way for a visitor to get involved. */
export interface InvolvedPath {
  id: string;
  title: string;
  description: string;
  href: string;
  linkLabel: string;
  icon: InvolvedPathIconKey;
}

export interface HomeSectionCopy {
  eyebrow: string;
  title: string;
  description: string;
}

export interface HomeContent {
  hero: {
    eyebrow: string;
    supportingText: string;
  };
  mission: {
    eyebrow: string;
    title: string;
    /** The introductory paragraph. */
    body: string;
    ctaLabel: string;
    ctaHref: string;
  };
  programs: HomeSectionCopy & {
    ctaLabel: string;
    ctaHref: string;
  };
  values: HomeSectionCopy;
  getInvolved: HomeSectionCopy & {
    paths: InvolvedPath[];
  };
  support: {
    eyebrow: string;
    title: string;
    body: string;
    secondaryLabel: string;
    secondaryHref: string;
  };
  updates: HomeSectionCopy & {
    /** Shown when no events or news have been published yet. */
    emptyTitle: string;
    emptyBody: string;
  };
  final: {
    title: string;
    body: string;
    volunteerLabel: string;
    donateLabel: string;
    contactLabel: string;
  };
  /**
   * Caption for the hero's image slot while no official photography exists.
   * Removing the slot is a one-line change once a photograph is supplied.
   */
  heroImage: {
    src: string | null;
    alt: string | null;
    pendingLabel: string;
    pendingNote: string;
  };
}

export type NewsCategory = "announcement" | "event" | "story" | "update";

export interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  /**
   * Set when the article also has its own readable page. `/news` lists articles
   * either way, so a `null` value renders a plain heading rather than a link to
   * a route that does not exist. Mirrors `Program.dedicatedRoute`.
   */
  href: string | null;
  excerpt: string;
  /** Plain-text body. A CMS would supply the same field as structured content. */
  content: string;
  /** ISO 8601 date, e.g. "2026-01-15". */
  publishedAt: string;
  updatedAt: string | null;
  category: NewsCategory;
  featuredImage: string | null;
  author: string | null;
  status: "draft" | "published";
  featured: boolean;
}

export type EventStatus = "draft" | "scheduled" | "completed" | "cancelled";

export interface EventLocation {
  name: string | null;
  address: PostalAddress | null;
  isOnline: boolean;
}

/**
 * Named `SiteEvent` rather than `Event` so that importing it cannot shadow the
 * DOM `Event` interface in client components.
 */
export interface SiteEvent {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  description: string;
  /** ISO 8601 datetime, e.g. "2026-03-14T18:00:00-04:00". */
  startsAt: string;
  endsAt: string | null;
  location: EventLocation | null;
  image: string | null;
  category: string | null;
  registrationUrl: string | null;
  status: EventStatus;
  featured: boolean;
  publishedAt: string | null;
}

export type TransparencyDocumentCategory =
  | "annual-report"
  | "financial-statement"
  | "registration"
  | "other";

export type TransparencyDocumentStatus = "available" | "pending";

export interface TransparencyDocument {
  id: string;
  title: string;
  category: TransparencyDocumentCategory;
  year: number | null;
  /** Path under /public, or an external URL once documents are supplied. */
  url: string | null;
  publishedAt: string | null;
  description: string | null;
  status: TransparencyDocumentStatus;
}
