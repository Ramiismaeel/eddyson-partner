# eddyson Partner Landing Page

Partner landing page built for the eddyson web developer assessment.
Live: [eddyson-partner](https://eddyson-partner.netlify.app)


## Stack

![Next](https://img.shields.io/badge/Next-16.x-00DC82?logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-06B6D4?logo=tailwindcss&logoColor=white)
[![Netlify Status](https://api.netlify.com/api/v1/badges/6b6f0ac9-ce21-45d4-8873-6fe5adcff452/deploy-status)](https://app.netlify.com/sites/eddyson-partner/deploys)


## Run locally

```bash
npm install
npm run dev            # app → localhost:3000
npm run slicemachine   # slice editor → localhost:9999
```

## Structure

The page is a single Prismic document (`partner_page`) composed of six slices:
Hero, PartnerProgram, EdiExpertise, QuoteBanner, BenefitsGrid, ContactSection.
The footer is a plain React component since it's global, not editorial content.

## Decisions worth explaining

- **Form fields are hardcoded**, not CMS-modeled — they're coupled to validation
  and submit logic. The text around the form stays editable in Prismic. Submit is
  a stub (console log); production would forward to a CRM.
- **Partner type / industry are single-selects** per the design, though the
  "Select at least one" copy hints at multi-select — flagged for the designer.
- **Logo marquee** duplicates the Prismic logo array in code for a seamless
  loop; content exists only once in the CMS. Animation pauses on hover and
  respects `prefers-reduced-motion`.
- **Vertical labels** ("Select. Connect. Evolve.", "eddyson | 2026") are
  hardcoded decorative elements, hidden from screen readers.
- Images use `fallbackAlt=""` — alt text is governed by what editors enter
  in Prismic; empty means decorative.

## Responsive (Part B)

No mobile Figma was provided, so breakpoints are my own judgment: hero widgets
scale down then reflow, card grids collapse 3→2→1, vertical labels hide on
small screens, form goes full-width. Tested at 375 / 768 / 1280 / 1440px.