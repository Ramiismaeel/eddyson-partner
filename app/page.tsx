import { SliceZone } from "@prismicio/react";
import { createClient } from "@/prismicio";
import { components } from "@/slices";
import Footer from "@/app/components/Footer";

export default async function Page() {
  const client = createClient();
  const page = await client.getSingle("partner_page");

  return (
    <main>
      <SliceZone slices={page.data.slices} components={components} />
      <Footer />
    </main>
  );
}