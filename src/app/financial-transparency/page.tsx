import { PageHeader } from "@/components/sections/page-header";
import { Section } from "@/components/shared/section";
import { Container } from "@/components/shared/container";
import { getAvailableTransparencyDocuments, getCharityRegistration } from "@/content/transparency";
import { SupportCta } from "@/components/sections/support-cta";
import { FileText, FileCheck, Shield, Building2, ExternalLink } from "lucide-react";
import { generatePageMetadata } from "@/lib/seo";

export const metadata = generatePageMetadata({
  title: "Financial Transparency",
  description:
    "Financial reports, annual statements, and charity registration information for the Canadian Sheba Foundation.",
  pathname: "/financial-transparency",
  openGraph: {
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
});

export default async function FinancialTransparencyPage() {
  const [documents, registration] = await Promise.all([
    getAvailableTransparencyDocuments(),
    getCharityRegistration(),
  ]);

  const hasDocuments = documents.length > 0;

  return (
    <>
      <PageHeader
        eyebrow="Accountability"
        title="Financial Transparency"
        description="The Foundation is committed to openness about its finances, governance, and regulatory compliance. Documents will be published here as they become available."
      />

      {registration.legalName || registration.registrationNumber ? (
        <Section className="border-y border-border">
          <Container className="max-w-3xl">
            <h2 className="text-h3">Charity Registration</h2>
            <dl className="mt-6 grid gap-4 sm:grid-cols-2">
              {registration.legalName && (
                <div className="flex gap-3 p-4 rounded-lg border border-border bg-card">
                  <Shield className="size-6 shrink-0 text-primary" aria-hidden="true" />
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">Legal Name</dt>
                    <dd className="mt-1">{registration.legalName}</dd>
                  </div>
                </div>
              )}
              {registration.registrationNumber && (
                <div className="flex gap-3 p-4 rounded-lg border border-border bg-card">
                  <Shield className="size-6 shrink-0 text-primary" aria-hidden="true" />
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">Registration Number</dt>
                    <dd className="mt-1">{registration.registrationNumber}</dd>
                  </div>
                </div>
              )}
              {registration.jurisdiction && (
                <div className="flex gap-3 p-4 rounded-lg border border-border bg-card">
                  <Building2 className="size-6 shrink-0 text-primary" aria-hidden="true" />
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">Jurisdiction</dt>
                    <dd className="mt-1">{registration.jurisdiction}</dd>
                  </div>
                </div>
              )}
            </dl>
          </Container>
        </Section>
      ) : (
        <Section className="border-y border-border">
          <Container className="max-w-3xl text-center">
            <div className="flex flex-col items-center gap-4">
              <Shield className="size-16 text-primary/30" aria-hidden="true" />
              <h3 className="text-h4">Registration Information Pending</h3>
              <p className="max-w-2xl text-muted-foreground text-lead">
                Official charity registration details, including legal name,
                registration number, and jurisdiction, will be published here
                once confirmed by the Foundation.
              </p>
            </div>
          </Container>
        </Section>
      )}

      <Section className="border-y border-border">
        <Container className="max-w-3xl">
          <h2 className="text-h3">Document Archive</h2>
          {hasDocuments ? (
            <>
              <p className="mt-4 text-lead">
                Available financial reports and transparency documents.
              </p>
              <div className="mt-8 space-y-4" role="list" aria-label="Transparency documents">
                {documents.map((doc) => (
                  <article
                    key={doc.id}
                    className="flex flex-col gap-3 p-4 rounded-xl border border-border bg-card sm:flex-row sm:items-center sm:justify-between"
                    role="listitem"
                  >
                    <div className="flex-1">
                      <div className="flex flex-wrap gap-2">
                        <span className="px-2 py-1 rounded-full text-xs bg-muted text-muted-foreground capitalize">
                          {doc.category.replace("-", " ")}
                        </span>
                        {doc.year && (
                          <span className="px-2 py-1 rounded-full text-xs bg-primary/10 text-primary">
                            {doc.year}
                          </span>
                        )}
                        <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                          Available
                        </span>
                      </div>
                      <h3 className="mt-2 font-medium">{doc.title}</h3>
                      {doc.description && (
                        <p className="mt-1 text-sm text-muted-foreground">{doc.description}</p>
                      )}
                      {doc.publishedAt && (
                        <time className="mt-1 text-xs text-muted-foreground" dateTime={doc.publishedAt}>
                          Published {new Date(doc.publishedAt).toLocaleDateString("en-CA", { year: "numeric", month: "long", day: "numeric" })}
                        </time>
                      )}
                    </div>
                    {doc.url && (
                      <a
                        href={doc.url}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-primary bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FileText className="size-4" aria-hidden="true" />
                        View Document
                        <ExternalLink className="size-3.5" aria-hidden="true" />
                        <span className="sr-only">(opens in new tab)</span>
                      </a>
                    )}
                  </article>
                ))}
              </div>
            </>
          ) : (
            <div className="mt-8 flex flex-col items-center gap-4 text-center p-8 rounded-xl border border-border bg-muted">
              <FileCheck className="size-16 text-primary/30" aria-hidden="true" />
              <h3 className="text-h4">No Documents Published</h3>
              <p className="max-w-2xl text-muted-foreground text-lead">
                Financial reports, annual statements, and transparency documents
                will be published here as they become available.
              </p>
            </div>
          )}
        </Container>
      </Section>

      <Section className="border-y border-border">
        <Container className="max-w-3xl">
          <h2 className="text-h3">Document Categories</h2>
          <p className="mt-4 text-lead">
            Documents are organized by category for easy discovery. Select a
            category to filter (when documents are available).
          </p>
          <nav className="mt-6 flex flex-wrap gap-3" aria-label="Document categories">
            {[
              { key: "annual-report" as const, label: "Annual Reports", icon: FileText },
              { key: "financial-statement" as const, label: "Financial Statements", icon: FileCheck },
              { key: "registration" as const, label: "Registration Documents", icon: Shield },
              { key: "other" as const, label: "Other", icon: Building2 },
            ].map(({ key, label, icon: Icon }) => (
              <a
                key={key}
                href={hasDocuments ? `#${key}` : "javascript:void(0)"}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-border bg-card text-sm font-medium transition-colors hover:border-primary/50 hover:text-primary"
                aria-disabled={!hasDocuments}
                tabIndex={hasDocuments ? 0 : -1}
              >
                <Icon className="size-4" aria-hidden="true" />
                {label}
              </a>
            ))}
          </nav>
          {!hasDocuments && (
            <p className="mt-4 text-sm text-muted-foreground">
              Categories will become active links when documents are published.
            </p>
          )}
        </Container>
      </Section>

      <Section>
        <Container className="max-w-3xl">
          <h2 className="text-h3">Governance and Oversight</h2>
          <p className="mt-4 text-lead">
            The Foundation operates under a governance structure that prioritizes
            accountability and responsible stewardship of resources. Detailed
            governance policies, board composition, and conflict-of-interest
            procedures will be published here once approved.
          </p>
        </Container>
      </Section>

      <SupportCta
        title="Questions about our finances?"
        description="We welcome inquiries about the Foundation's financial practices, reporting, and governance."
        primaryLabel="Contact Us"
        primaryHref="/contact"
        secondaryLabel="Donate"
        secondaryHref="/donate"
        variant="subtle"
      />
    </>
  );
}