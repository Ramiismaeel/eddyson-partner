import type { Metadata } from "next"
import { DM_Sans, Quando, DM_Mono } from "next/font/google"
import { PrismicPreview } from "@prismicio/next"
import { repositoryName } from "@/prismicio"
import "./globals.css"

const dmMono = DM_Mono({
  weight: ["300", "400", "500"],
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
})

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
})

const quando = Quando({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-quando",
  display: "swap",
})
const title = "Your partner in the EDI jungle | eddyson"
const description =
  "Partner with eddyson for scalable EDI solutions in automotive, grocery, and retail."
const image = "/og.png"

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, images: [image], locale: "en_US" },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
  icons: {
    icon: "/favicon.svg",
  },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${quando.variable} ${dmMono.variable}`}
    >
      <body className="w-full overflow-x-hidden bg-linear-to-r from-inverse-soft to-white font-sans antialiased">
        {children}
        <PrismicPreview repositoryName={repositoryName} />
      </body>
    </html>
  )
}
