import { PageHeader } from "@/components/sections/page-header";
import { Section } from "@/components/shared/section";
import { Container } from "@/components/shared/container";
import { Badge } from "@/components/ui/badge";
import { getTermsOfUse } from "@/content/legal";
import { AlertTriangle } from "lucide-react";
import { generatePageMetadata } from "@/lib/seo";

export const metadata = generatePageMetadata({
  title: "Terms of Use",
  description:
    "Terms and conditions for using the Canadian Sheba Foundation website.",
  pathname: "/terms-of-use",
  openGraph: {
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
});

export default async function TermsOfUsePage() {
  const terms = await getTermsOfUse();

  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title={terms.title}
        description={
          terms.status === "draft"
            ? "These are draft terms. The official terms of use will be published once approved by the Foundation."
            : terms.description ?? "Terms and conditions for using our website."
        }
      />

      {terms.status === "draft" && (
        <Section className="border-y border-border">
          <Container className="max-w-3xl">
            <div className="flex flex-col gap-3 p-4 rounded-xl border border-amber-200 bg-amber-50 dark:bg-amber-900/20 dark:border-amber-800" role="alert">
              <div className="flex items-center gap-2">
                <AlertTriangle className="size-5 text-amber-600 dark:text-amber-400" aria-hidden="true" />
                <Badge variant="secondary" className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-200">
                  Draft / Pending Official Review
                </Badge>
              </div>
              <p className="text-amber-900 dark:text-amber-100">
                These Terms of Use are a structural placeholder. The Canadian Sheba
                Foundation has not yet supplied its official terms of use. The
                content below outlines the intended structure and topics but does
                not constitute approved legal advice or binding terms.
              </p>
            </div>
          </Container>
        </Section>
      )}

      <article>
        <Section>
          <Container className="max-w-3xl">
            <dl className="space-y-8">
              {terms.sections.map((section) => (
                <div key={section.id} className="prose prose-muted max-w-none">
                  <h2 className="text-h3">{section.title}</h2>
                  <div className="mt-4">
                    {Array.isArray(section.content) ? (
                      <ul className="list-disc list-inside space-y-2">
                        {section.content.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-lead">{section.content}</p>
                    )}
                  </div>
                </div>
              ))}
            </dl>
          </Container>
        </Section>

        {terms.effectiveDate && (
          <Section tone="subtle" className="border-t border-border">
            <Container className="max-w-3xl text-center">
              <p className="text-sm text-muted-foreground">
                Effective date: {terms.effectiveDate}
                {terms.lastUpdated && ` • Last updated: ${terms.lastUpdated}`}
              </p>
            </Container>
          </Section>
        )}
      </article>
    </>
  );
}