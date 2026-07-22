import { test, expect } from "@playwright/test"

test.describe("Partner form", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/")
  })

  test("shows validation errors and an error toast on empty submit", async ({
    page,
  }) => {
    await page.getByRole("button", { name: /submit/i }).click()

    await expect(
      page.getByText("Enter your first and last name.")
    ).toBeVisible()
    await expect(page.getByText("Enter your business email.")).toBeVisible()
    await expect(
      page.getByText("Please accept the privacy policy.")
    ).toBeVisible()

    await expect(page.getByRole("status")).toContainText(
      /please fix the highlighted fields/i
    )
  })

  test("submits a fully valid form and shows the success toast", async ({
    page,
  }) => {
    await page.getByLabel("First and Last name").fill("Ada Lovelace")
    await page.getByLabel("Company").fill("Analytical Engines")
    await page.getByLabel("Business email").fill("ada@engines.com")
    await page.getByLabel("Phone").fill("20 7946 0958")

    // Partner types (custom multiselect: open, pick, close).
    await page.getByRole("button", { name: /partner types/i }).click()
    await page.getByRole("button", { name: "Reseller" }).click()
    await page.keyboard.press("Escape")

    // Industry.
    await page.getByRole("button", { name: /industry/i }).click()
    await page.getByRole("button", { name: "Manufacturing" }).click()
    await page.keyboard.press("Escape")

    // The real checkbox is visually hidden (sr-only); a user toggles it by
    // clicking the visible label, so do the same here.
    await page.getByText(/agree with the privacy policy/i).click()
    await expect(page.getByRole("checkbox")).toBeChecked()

    await page.getByRole("button", { name: /submit/i }).click()

    await expect(page.getByRole("status")).toContainText(
      /your request has been submitted/i
    )
    // Form resets after a successful submit.
    await expect(page.getByLabel("First and Last name")).toHaveValue("")
  })
})
