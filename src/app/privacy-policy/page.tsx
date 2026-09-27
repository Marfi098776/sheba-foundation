import { PageHeader } from "@/components/sections/page-header";
import { Section } from "@/components/shared/section";
import { Container } from "@/components/shared/container";
import { Badge } from "@/components/ui/badge";
import { getPrivacyPolicy } from "@/content/legal";
import { AlertTriangle } from "lucide-react";
import { generatePageMetadata } from "@/lib/seo";
import { ScrollReveal } from "@/components/shared/scroll-reveal";

export const metadata = generatePageMetadata({
  title: "Privacy Policy",
  description:
    "How the Canadian Sheba Foundation collects, uses, and protects your personal information.",
  pathname: "/privacy-policy",
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

export default async function PrivacyPolicyPage() {
  const policy = await getPrivacyPolicy();

  return (
    <>
      <ScrollReveal delay={0}>
        <PageHeader
          eyebrow="Legal"
          title={policy.title}
          description={
            policy.status === "draft"
              ? "This is a draft policy. The official privacy policy will be published once approved by the Foundation."
              : policy.description ?? "How we collect, use, and protect your personal information."
          }
        />
      </ScrollReveal>

      {policy.status === "draft" && (
        <ScrollReveal delay={80}>
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
                  This privacy policy is a structural placeholder. The Canadian Sheba
                  Foundation has not yet supplied its official privacy policy. The
                  content below outlines the intended structure and topics but does
                  not constitute approved legal advice or binding policy.
                </p>
              </div>
            </Container>
          </Section>
        </ScrollReveal>
      )}

      <article>
        <ScrollReveal delay={160}>
          <Section>
            <Container className="max-w-3xl">
              <dl className="space-y-8">
                {policy.sections.map((section, index) => (
                  <ScrollReveal key={section.id} delay={index * 80}>
                    <div className="prose prose-muted max-w-none">
                      <h2 className="text-h3">{section.title}</h2>
                      <div className="mt-4">
                        {Array.isArray(section.content) ? (
                          <ul className="list-disc list-inside space-y-2">
                            {section.content.map((item, idx) => (
                              <li key={idx}>{item}</li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-lead">{section.content}</p>
                        )}
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </dl>
            </Container>
          </Section>
        </ScrollReveal>

        {policy.effectiveDate && (
          <ScrollReveal delay={240}>
            <Section tone="subtle" className="border-t border-border">
              <Container className="max-w-3xl text-center">
                <p className="text-sm text-muted-foreground">
                  Effective date: {policy.effectiveDate}
                  {policy.lastUpdated && ` • Last updated: ${policy.lastUpdated}`}
                </p>
              </Container>
            </Section>
          </ScrollReveal>
        )}
      </article>
    </>
  );
}