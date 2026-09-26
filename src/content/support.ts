import type { ProgramActivity } from "./types";

/**
 * Family Support program content.
 *
 * Activities restate the confirmed areas the Foundation has identified.
 * No eligibility thresholds, geographic limits, assistance amounts, or
 * application requirements are invented.
 */
export const familySupportContent = {
  title: "Family Support",
  summary:
    "Practical support for children and families experiencing financial hardship.",
  introduction:
    "The Foundation works with families experiencing financial hardship to provide practical support that helps children stay in school, eat well, and meet essential needs. The program areas below reflect the Foundation's confirmed focus. Specific eligibility criteria, application processes, and assistance levels have not been finalised and will be published when approved.",
  activities: [
    {
      title: "Educational support for children",
      description:
        "Support for children from low-income families to take part in education.",
    },
    { title: "School supplies", description: null },
    { title: "Healthy food and meal assistance", description: null },
    {
      title: "Limited financial assistance",
      description:
        "Offered in special circumstances, subject to the Foundation's future criteria.",
    },
  ] satisfies ProgramActivity[],
  howToLearnMore:
    "To learn more about Family Support or to request information, please contact the Foundation directly. Program details including eligibility and how to apply will be published once confirmed.",
  status: "active" as const,
};

/**
 * Newcomer & Refugee Support program content.
 *
 * This program area has been identified by the Foundation, but no detailed
 * service list has been supplied. The structure below provides a professional
 * framework that can accommodate confirmed details when they arrive.
 */
export const newcomerRefugeeSupportContent = {
  title: "Newcomer & Refugee Support",
  summary:
    "A program area the Foundation has identified. The specific services offered are still to be confirmed.",
  introduction:
    "The Foundation has identified support for newcomers and refugees as a priority program area. The specific services, eligibility, and delivery model are still being developed. This page will be updated with confirmed details when they are approved by the Foundation.",
  areasOfSupport: [
    {
      title: "Areas of support to be confirmed",
      description:
        "The Foundation has not yet published the specific services this program will provide. Potential areas may be announced in the future.",
    },
  ] satisfies ProgramActivity[],
  communityConnection:
    "Building connections with local newcomer and refugee communities will be central to this program's approach. Details on community partnerships and referral pathways will be shared when available.",
  howToGetInformation:
    "For questions about Newcomer & Refugee Support, please contact the Foundation. Updates will be posted here and through the Foundation's communications channels once program details are confirmed.",
  status: "pending-details" as const,
};

/**
 * Scholarships & Grants program content.
 *
 * The Foundation has confirmed this as a program area but has not supplied
 * eligibility rules, application periods, funding amounts, required documents,
 * deadlines, or selection criteria.
 */
export const scholarshipsGrantsContent = {
  title: "Scholarships & Grants",
  summary:
    "A program area the Foundation has identified. Official eligibility and application details are still to be confirmed.",
  introduction:
    "The Foundation intends to provide a Scholarships & Grants program to support students pursuing education. Official eligibility criteria, application periods, funding amounts, required documents, deadlines, and selection criteria have not yet been provided by the Foundation.",
  whoMayBeSupported: [
    "Students facing financial barriers to education",
    "Individuals pursuing post-secondary studies",
    "Applicants who meet the Foundation's future eligibility criteria",
  ],
  howApplicationsWillWork:
    "The application process, including timelines, required documentation, and evaluation methods, is still under development. No applications are currently being accepted.",
  applicationRequirements:
    "Application requirements have not been confirmed. They will be published by the Foundation when the program launches.",
  applicationStatus:
    "Applications are not currently open. Official application details will be published by the Foundation when available. Please check this page for updates or contact the Foundation for more information.",
  status: "pending-details" as const,
};

export type SupportProgramContent = {
  title: string;
  summary: string;
  introduction: string;
  activities?: ProgramActivity[];
  areasOfSupport?: ProgramActivity[];
  whoMayBeSupported?: string[];
  howApplicationsWillWork?: string;
  applicationRequirements?: string;
  applicationStatus?: string;
  communityConnection?: string;
  howToLearnMore?: string;
  howToGetInformation?: string;
  status: "active" | "pending-details";
};

export function getSupportContent(
  slug: "family-support" | "newcomer-refugee-support" | "scholarships-grants"
): SupportProgramContent {
  switch (slug) {
    case "family-support":
      return familySupportContent;
    case "newcomer-refugee-support":
      return newcomerRefugeeSupportContent;
    case "scholarships-grants":
      return scholarshipsGrantsContent;
  }
}