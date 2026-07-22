/**
 * Deterministic Prismic REST API v2 fixtures for e2e.
 *
 * The homepage fetches `partner_page` server-side, so these are replayed at
 * the Node network layer (see `e2e/prismic-mock.register.mjs`) rather than via
 * Playwright's browser-only `page.route`. Values are the ones the specs assert
 * against — keep them in sync with `e2e/*.spec.ts`.
 */

const MASTER_REF = "mockmasterref"

/** A single rich-text paragraph in the resolved (API) shape. */
const paragraph = (text) => [{ type: "paragraph", text, spans: [] }]

/** GET https://<repo>.cdn.prismic.io/api/v2 — repository metadata. */
export const repository = {
  refs: [
    {
      id: "master",
      ref: MASTER_REF,
      label: "Master",
      isMasterRef: true,
      scheduledAt: null,
    },
  ],
  integrationFieldsRef: null,
  bookmarks: {},
  languages: [
    { id: "en-us", name: "English - United States", is_master: true },
  ],
  types: { partner_page: "Partner Page" },
  tags: [],
  forms: {},
  experiments: {},
  oauth_initiate: "",
  oauth_token: "",
  version: "mock",
}

/** The one `partner_page` singleton, with just enough slices for the specs. */
const partnerPage = {
  id: "partnerpage1",
  uid: null,
  url: null,
  type: "partner_page",
  href: "https://eddyson-partner.cdn.prismic.io/api/v2/documents/search",
  tags: [],
  first_publication_date: "2024-01-01T00:00:00+0000",
  last_publication_date: "2024-01-01T00:00:00+0000",
  slugs: [],
  linked_documents: [],
  lang: "en-us",
  alternate_languages: [],
  data: {
    slices: [
      {
        id: "quote$1",
        slice_type: "quote_banner",
        slice_label: null,
        variation: "default",
        version: "mock",
        primary: { quote: paragraph("Select. Connect. Evolve.") },
        items: [],
      },
      {
        id: "contact$1",
        slice_type: "contact_section",
        slice_label: null,
        variation: "default",
        version: "mock",
        primary: {
          headline: paragraph("Become a partner"),
          copy: paragraph("Tell us about your company."),
        },
        items: [],
      },
    ],
  },
}

/** GET .../api/v2/documents/search — query results (getSingle reads [0]). */
export const search = {
  page: 1,
  results_per_page: 20,
  results_size: 1,
  total_results_size: 1,
  total_pages: 1,
  next_page: null,
  prev_page: null,
  results: [partnerPage],
  version: "mock",
  license: "All Rights Reserved",
}
