import { test, expect } from "@playwright/test"

test.describe("Homepage", () => {
  test("renders the static chrome, mocked slice content, and the form", async ({
    page,
  }) => {
    await page.goto("/")

    // Metadata from app/layout.tsx.
    await expect(page).toHaveTitle(/eddyson/i)

    // Static Header + Footer.
    await expect(
      page.getByRole("link", { name: /open positions/i })
    ).toBeVisible()

    // QuoteBanner slice, rendered from the mocked Prismic response.
    await expect(page.getByText("Select. Connect. Evolve.")).toBeVisible()

    // ContactSection slice content + the embedded PartnerForm.
    await expect(
      page.getByRole("heading", { name: /become a partner/i })
    ).toBeVisible()
    await expect(page.getByRole("button", { name: /submit/i })).toBeVisible()
  })
})
