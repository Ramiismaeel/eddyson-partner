import { test, expect } from "@playwright/test"

test.describe("Not found", () => {
  test("serves the custom 404 page for an unknown route", async ({ page }) => {
    const response = await page.goto("/this-route-does-not-exist")

    expect(response?.status()).toBe(404)
    await expect(
      page.getByRole("heading", { name: /lost in the edi jungle/i })
    ).toBeVisible()
    await expect(
      page.getByRole("link", { name: /back to home/i })
    ).toBeVisible()
  })
})
