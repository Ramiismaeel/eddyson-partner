import { SliceZone } from "@prismicio/react"
import { createClient } from "@/prismicio"
import { components } from "@/slices"
import Footer from "@/app/components/Footer"
import Header from "@/app/components/Header"
import PageDecor from "@/app/components/PageDecor"

export default async function Page() {
  const client = createClient()
  const page = await client.getSingle("partner_page")

  return (
    <main className="relative mx-auto">
      <PageDecor />
      <Header />
      <SliceZone slices={page.data.slices} components={components} />
      <Footer />
    </main>
  )
}
