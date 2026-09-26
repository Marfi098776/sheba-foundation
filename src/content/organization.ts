import type { OrganizationInfo } from "./types";

/**
 * Organization-level copy for the About section and its subsections.
 *
 * Structure only. The Foundation has not yet supplied approved wording for its
 * mission, vision, charitable purposes, or history, and has published no
 * verifiable board or leadership roster — so those fields are `null` or empty
 * rather than filled with plausible-sounding copy.
 *
 * An empty array means "nothing published yet". A `null` field means the fact is
 * unknown. Keep that distinction.
 *
 * `mission` deliberately stays `null` even though the homepage needs to say
 * something. The homepage's provisional introduction lives in `home.ts`, which is
 * marked as temporary and restates only already-confirmed program areas. Putting
 * that wording here would make an unapproved sentence look like the Foundation's
 * official mission statement to every future consumer of this record, which is
 * exactly the failure `null` exists to prevent. When approved text arrives it
 * belongs in `mission`; the homepage copy is replaced at the same time.
 */
const organization: OrganizationInfo = {
  about: null,
  mission: null,
  vision: null,
  charitablePurposes: [],
  history: null,
  board: [],
  leadership: [],
  volunteers: {
    description: null,
    opportunities: [
      "Community outreach",
      "Event volunteering",
      "Fundraising support",
    ],
    registrationAvailable: false,
    registrationUrl: null,
  },
  registration: {
    legalName: null,
    registrationNumber: null,
    jurisdiction: null,
  },
};

export async function getOrganization(): Promise<OrganizationInfo> {
  return organization;
}
