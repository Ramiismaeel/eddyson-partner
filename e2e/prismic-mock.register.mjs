/**
 * Node-level Prismic interceptor, injected into `next build` / `next start` via
 * `NODE_OPTIONS=--import`. The homepage fetches Prismic inside a Server
 * Component, so the request never reaches the browser — Playwright's
 * `page.route` can't see it.
 *
 * We patch `globalThis.fetch` (rather than undici's MockAgent, whose
 * `setGlobalDispatcher` does not affect Node's built-in fetch) so only the
 * Prismic CDN origin is served from fixtures; every other request — including
 * next/image optimizing remote flags — falls through to the real fetch. This
 * `--import` runs before Next wraps fetch for caching, so our patch sits
 * underneath and still intercepts.
 */
import { repository, search } from "./fixtures/prismic.mjs"

const ORIGIN = "https://eddyson-partner.cdn.prismic.io"

const originalFetch = globalThis.fetch

const jsonResponse = (body) =>
  new Response(JSON.stringify(body), {
    status: 200,
    headers: { "content-type": "application/json" },
  })

function urlOf(input) {
  if (typeof input === "string") return input
  if (input instanceof URL) return input.href
  if (input instanceof Request) return input.url
  return String(input)
}

globalThis.fetch = async (input, init) => {
  const url = urlOf(input)
  if (url.startsWith(ORIGIN)) {
    if (/\/api\/v2\/documents\/search/.test(url)) return jsonResponse(search)
    if (/\/api\/v2(\?|$)/.test(url)) return jsonResponse(repository)
  }
  return originalFetch(input, init)
}
