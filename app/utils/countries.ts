export interface Country {
  name: string;
  /** ISO 3166-1 alpha-2, lowercase (used for the flagcdn image URL). */
  iso2: string;
  /** Calling code without the leading "+". */
  dialCode: string;
}

/**
 * Curated list covering Europe + major global markets (incl. MENA).
 * Extend freely — the components only rely on the `Country` shape.
 * For a full 240-country list, drop in a dataset like `country-telephone-data`
 * and map it to this shape.
 */
export const COUNTRIES: Country[] = [
  { name: "Algeria", iso2: "dz", dialCode: "213" },
  { name: "Argentina", iso2: "ar", dialCode: "54" },
  { name: "Australia", iso2: "au", dialCode: "61" },
  { name: "Austria", iso2: "at", dialCode: "43" },
  { name: "Bahrain", iso2: "bh", dialCode: "973" },
  { name: "Belgium", iso2: "be", dialCode: "32" },
  { name: "Brazil", iso2: "br", dialCode: "55" },
  { name: "Bulgaria", iso2: "bg", dialCode: "359" },
  { name: "Canada", iso2: "ca", dialCode: "1" },
  { name: "Chile", iso2: "cl", dialCode: "56" },
  { name: "China", iso2: "cn", dialCode: "86" },
  { name: "Colombia", iso2: "co", dialCode: "57" },
  { name: "Croatia", iso2: "hr", dialCode: "385" },
  { name: "Czech Republic", iso2: "cz", dialCode: "420" },
  { name: "Denmark", iso2: "dk", dialCode: "45" },
  { name: "Egypt", iso2: "eg", dialCode: "20" },
  { name: "Estonia", iso2: "ee", dialCode: "372" },
  { name: "Finland", iso2: "fi", dialCode: "358" },
  { name: "France", iso2: "fr", dialCode: "33" },
  { name: "Germany", iso2: "de", dialCode: "49" },
  { name: "Greece", iso2: "gr", dialCode: "30" },
  { name: "Hong Kong", iso2: "hk", dialCode: "852" },
  { name: "Hungary", iso2: "hu", dialCode: "36" },
  { name: "Iceland", iso2: "is", dialCode: "354" },
  { name: "India", iso2: "in", dialCode: "91" },
  { name: "Iraq", iso2: "iq", dialCode: "964" },
  { name: "Ireland", iso2: "ie", dialCode: "353" },
  { name: "Israel", iso2: "il", dialCode: "972" },
  { name: "Italy", iso2: "it", dialCode: "39" },
  { name: "Japan", iso2: "jp", dialCode: "81" },
  { name: "Jordan", iso2: "jo", dialCode: "962" },
  { name: "Kenya", iso2: "ke", dialCode: "254" },
  { name: "Kuwait", iso2: "kw", dialCode: "965" },
  { name: "Latvia", iso2: "lv", dialCode: "371" },
  { name: "Lebanon", iso2: "lb", dialCode: "961" },
  { name: "Lithuania", iso2: "lt", dialCode: "370" },
  { name: "Luxembourg", iso2: "lu", dialCode: "352" },
  { name: "Mexico", iso2: "mx", dialCode: "52" },
  { name: "Morocco", iso2: "ma", dialCode: "212" },
  { name: "Netherlands", iso2: "nl", dialCode: "31" },
  { name: "New Zealand", iso2: "nz", dialCode: "64" },
  { name: "Nigeria", iso2: "ng", dialCode: "234" },
  { name: "Norway", iso2: "no", dialCode: "47" },
  { name: "Oman", iso2: "om", dialCode: "968" },
  { name: "Poland", iso2: "pl", dialCode: "48" },
  { name: "Portugal", iso2: "pt", dialCode: "351" },
  { name: "Qatar", iso2: "qa", dialCode: "974" },
  { name: "Romania", iso2: "ro", dialCode: "40" },
  { name: "Russia", iso2: "ru", dialCode: "7" },
  { name: "Saudi Arabia", iso2: "sa", dialCode: "966" },
  { name: "Singapore", iso2: "sg", dialCode: "65" },
  { name: "Slovakia", iso2: "sk", dialCode: "421" },
  { name: "Slovenia", iso2: "si", dialCode: "386" },
  { name: "South Africa", iso2: "za", dialCode: "27" },
  { name: "South Korea", iso2: "kr", dialCode: "82" },
  { name: "Spain", iso2: "es", dialCode: "34" },
  { name: "Sweden", iso2: "se", dialCode: "46" },
  { name: "Switzerland", iso2: "ch", dialCode: "41" },
  { name: "Syria", iso2: "sy", dialCode: "963" },
  { name: "Tunisia", iso2: "tn", dialCode: "216" },
  { name: "Turkey", iso2: "tr", dialCode: "90" },
  { name: "Ukraine", iso2: "ua", dialCode: "380" },
  { name: "United Arab Emirates", iso2: "ae", dialCode: "971" },
  { name: "United Kingdom", iso2: "gb", dialCode: "44" },
  { name: "United States", iso2: "us", dialCode: "1" },
];

export function findCountry(iso2: string): Country | undefined {
  return COUNTRIES.find((c) => c.iso2 === iso2.toLowerCase());
}

/** CDN flag image (works cross-platform, unlike emoji flags on Windows). */
export function flagUrl(iso2: string): string {
  return `https://flagcdn.com/${iso2.toLowerCase()}.svg`;
}