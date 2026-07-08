import Link from "next/link"
import Image from "next/image"

export default function NotFound() {
  return (
    <main className="relative mx-auto flex min-h-screen max-w-[1600px] flex-col items-center justify-center px-6 text-center">
      <Image
        src="/images/eddyson_logo.svg"
        alt="eddyson"
        width={177}
        height={54}
        className="mb-10 h-auto w-auto"
      />
      <p className="font-mono text-sm uppercase tracking-[0.24px] text-neutral-500">
        Error 404
      </p>
      <h1 className="mt-4 font-serif text-4xl leading-[1.2] text-strong md:text-6xl">
        Lost in the EDI jungle
      </h1>
      <p className="mt-6 max-w-lg text-lg leading-[1.4] text-muted">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-10 inline-flex items-center justify-center rounded-lg bg-primary px-6 py-4 font-medium text-inverse-soft transition-colors hover:bg-gray-800"
      >
        Back to home
      </Link>
    </main>
  )
}
