import Link from "next/link"
import Image from "next/image"

export default function Header() {
  return (
    <header className="w-full">
      <div className="px-6 pt-6">
        <div className="text-center px-4 bg-secondary text-sm sm:text-base text-inverse-soft font-sans py-2.5">
          We’re hiring! Check out our{" "}
          <Link
            className="cursor-pointer underline"
            href="https://www.eddyson.com/career"
            target="_blank"
          >
            open positions!
          </Link>
        </div>
      </div>
      <Image
        src="/images/eddyson_logo.svg"
        alt="eddyson"
        width={177}
        height={54}
        className="block w-auto h-auto mt-7 ml-6 md:ml-31"
      />
    </header>
  )
}
