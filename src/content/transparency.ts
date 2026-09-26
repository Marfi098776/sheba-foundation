import type { TransparencyDocument, TransparencyDocumentCategory, CharityRegistration } from "./types";

/**
 * Financial transparency documents.
 *
 * EMPTY. The Foundation has not published any financial reports, audited
 * statements, or registration documents. An invented document would be a
 * fabricated fact.
 *
 * Real documents are added here, or supplied by a CMS in a later phase, with no
 * change to any component. See AGENTS.md rule 8.
 *
 * Example structure for future documents:
 * const documents: TransparencyDocument[] = [
 *   {
 *     id: "doc-001",
 *     title: "Annual Report 2025",
 *     category: "annual-report",
 *     year: 2025,
 *     url: "/documents/annual-report-2025.pdf",
 *     publishedAt: "2026-03-15",
 *     description: "The Foundation's annual report for fiscal year 2025.",
 *   },
 * ];
 */
const documents: TransparencyDocument[] = [];

/**
 * Charity registration information.
 *
 * EMPTY. The Foundation's official registration details have not been supplied.
 * Do not invent a registration number, legal name, or jurisdiction.
 */
const charityRegistration: CharityRegistration = {
  legalName: null,
  registrationNumber: null,
  jurisdiction: null,
};

/**
 * Async so the body can be swapped for a CMS or database query in a later phase
 * without changing any caller. See AGENTS.md.
 */
export async function getTransparencyDocuments(): Promise<TransparencyDocument[]> {
  return documents;
}

/** Returns only available (published) documents, most recent first. */
export async function getAvailableTransparencyDocuments(): Promise<TransparencyDocument[]> {
  return documents
    .filter((doc) => doc.status === "available")
    .sort((a, b) => {
      // Sort by year descending, then by published date
      if (a.year !== null && b.year !== null) {
        return b.year - a.year;
      }
      if (a.publishedAt && b.publishedAt) {
        return b.publishedAt.localeCompare(a.publishedAt);
      }
      return 0;
    });
}

/** Documents by category. */
export async function getTransparencyDocumentsByCategory(category: TransparencyDocumentCategory): Promise<TransparencyDocument[]> {
  const available = await getAvailableTransparencyDocuments();
  return available.filter((doc) => doc.category === category);
}

/** Returns charity registration information. */
export async function getCharityRegistration(): Promise<CharityRegistration> {
  return charityRegistration;
}

/** Returns all document slugs/ids for static generation if needed. */
export async function getTransparencyDocumentIds(): Promise<string[]> {
  return documents.map((doc) => doc.id);
}