import Image from "next/image"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-primary text-white px-6 md:px-12 lg:px-[126px] py-8 md:py-12 lg:py-30">
      <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr_1fr] lg:flex w-full">
        <div className="w-full">
          <Image
            src="/images/eddyson_logo.svg"
            alt="eddyson logo"
            width={177}
            height={54}
            className="block mb-8 md:mb-15 w-auto h-auto"
          />

          <address className="not-italic text-lg md:text-2xl tracking-light leading-[1.4]">
            Groner Landstraße 23/25
            <br />
            37081 Goettingen
            <br />
            Germany
          </address>

          <div className="flex items-center gap-9 mt-8 md:mt-[186px]">
            <Image
              src="/images/de0a914f-8608-4feb-9d08-a035c56c7087_Software+Made+in+Germany.avif"
              alt="Software Made in Germany"
              width={104}
              height={104}
              className="w-[74px] h-[74px] rounded-lg object-cover xs:w-[104px] xs:h-[104px]"
            />
            <Image
              src="/images/b041c13a-0434-4f8d-9cf8-939c2de95496_Crefozert.avif"
              alt="Crefozert certification"
              width={80}
              height={80}
              className="w-[50px] h-[50px] rounded-lg object-cover xs:w-[80px] xs:h-[80px]"
            />
            <Image
              src="/images/d5a175ad-33b0-44c6-8f41-aadcff9162c3_Software+hosted+in+Germany.avif"
              alt="Software hosted in Germany"
              width={90}
              height={90}
              className="w-[60px] h-[60px] rounded-lg object-cover xs:w-[90px] xs:h-[90px]"
            />
            <Image
              src="/images/f16fb3a0-13ac-4b27-9c87-90dd52fd55c0_GS1.avif"
              alt="GS1 certified"
              width={74}
              height={74}
              className="w-[54px] h-[54px] rounded-lg object-cover xs:w-[74px] xs:h-[74px]"
            />
          </div>
        </div>

        <div className="w-full mt-8 lg:ml-[52px] lg:mt-16 lg:min-w-[358px]">
          <h4 className="font-sans text-xl md:text-2xl font-bold mb-4 leading-[1.4]">
            Contact
          </h4>

          <a
            href="tel:+495517707760.0"
            className="block text-lg md:text-2xl no-underline leading-[1.4] tracking-light transition-colors duration-200 hover:text-brand"
          >
            +49.551.7707.760.0
          </a>

          <p className="text-lg md:text-2xl mt-8 mb-0.5 font-medium">Sales</p>
          <a
            href="tel:+4955177077600"
            className="block text-lg md:text-2xl no-underline leading-[1.4] tracking-light transition-colors duration-200 hover:text-brand"
          >
            +49.551.7707.760.60
          </a>

          <p className="text-lg md:text-2xl mt-8 mb-0.5 font-medium">
            North America
          </p>
          <a
            href="tel:+14705321856"
            className="block text-lg md:text-2xl no-underline leading-[1.4] tracking-light transition-colors duration-200 hover:text-brand"
          >
            +1.470.532.1856
          </a>
        </div>

        <div className="w-full flex flex-col mt-8 lg:ml-[22px] lg:mt-16">
          <div className="mb-17">
            <h4 className="font-sans text-2xl font-bold mb-4 leading-[1.4]">
              Links
            </h4>
            <Link
              href="/careers"
              className="block text-lg md:text-2xl no-underline leading-[1.4] tracking-light transition-colors duration-200 hover:text-brand"
            >
              Careers
            </Link>
            <Link
              href="/imprint"
              className="block text-lg md:text-2xl no-underline leading-[1.4] tracking-light transition-colors duration-200 hover:text-brand"
            >
              Imprint
            </Link>
            <Link
              href="/privacy"
              className="block text-lg md:text-2xl no-underline leading-[1.4] tracking-light transition-colors duration-200 hover:text-brand"
            >
              Privacy policy
            </Link>
          </div>

          <div className="mb-12">
            <h4 className="font-sans text-lg md:text-2xl font-bold mb-4 leading-[1.4]">
              Follow us
            </h4>
            <div className="flex items-center gap-4">
              <a
                href="https://www.xing.com/pages/eddyson"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Xing"
                className="flex items-center justify-center w-7 h-7 transition-opacity duration-200 hover:opacity-70"
              >
                <Image
                  src="/images/xing.svg"
                  alt="Xing"
                  width={43}
                  height={43}
                  className="w-auto h-auto"
                />
              </a>
              <a
                href="https://www.linkedin.com/company/eddyson"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex items-center justify-center w-7 h-7 transition-opacity duration-200 hover:opacity-70"
              >
                <Image
                  src="/images/linkedin.svg"
                  alt="LinkedIn"
                  width={39}
                  height={41}
                  className="w-auto h-auto"
                />
              </a>
            </div>
          </div>

          <a
            href="mailto:sales@eddyson.com"
            className="self-start inline-flex items-center justify-center bg-inverse-soft shadow-contact px-8 py-4 md:py-[18px] rounded-lg text-primary sm:text-xl font-medium tracking-light no-underline transition-all duration-200 hover:bg-white/80 w-full max-md:text-center"
          >
            Contact Sales
          </a>
        </div>
      </div>
    </footer>
  )
}
