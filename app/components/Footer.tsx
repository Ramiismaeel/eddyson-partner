import Image from "next/image";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-charcoal-deep text-white pt-16 pb-12">
            <div className="mx-auto max-w-[1200px] px-10 grid grid-cols-1 md:grid-cols-[1.2fr_1fr_1fr] gap-12">
                {/* ── Left column: logo + address + badges ── */}
                <div>
                    <Image
                        src="/images/eddyson_logo.svg"
                        alt="eddyson"
                        width={140}
                        height={36}
                        className="block mb-6 w-auto h-auto"
                    />

                    <address className="not-italic text-[0.9375rem] leading-[1.7] text-white">
                        Groner Landstraße 23/25
                        <br />
                        37081 Goettingen
                        <br />
                        Germany
                    </address>

                    <div className="flex items-center gap-[11.5px] mt-[197px] max-md:mt-10">
                        <Image
                            src="/images/b041c13a-0434-4f8d-9cf8-939c2de95496_Crefozert.avif"
                            alt="Crefozert certification"
                            width={80}
                            height={80}
                            className="w-[80px] h-[80px] rounded-lg object-cover"
                        />
                        <Image
                            src="/images/d5a175ad-33b0-44c6-8f41-aadcff9162c3_Software+hosted+in+Germany.avif"
                            alt="Software hosted in Germany"
                            width={80}
                            height={80}
                            className="w-[80px] h-[80px] rounded-lg object-cover"
                        />
                        <Image
                            src="/images/f16fb3a0-13ac-4b27-9c87-90dd52fd55c0_GS1.avif"
                            alt="GS1 certified"
                            width={80}
                            height={80}
                            className="w-[80px] h-[80px] rounded-lg object-cover"
                        />
                        <Image
                            src="/images/de0a914f-8608-4feb-9d08-a035c56c7087_Software+Made+in+Germany.avif"
                            alt="Software Made in Germany"
                            width={80}
                            height={80}
                            className="w-[80px] h-[80px] rounded-lg object-cover"
                        />
                    </div>
                </div>

                {/* ── Middle column: contact ── */}
                <div>
                    <h4 className="font-sans text-base font-bold text-white mb-4 tracking-[0.01em]">
                        Contact
                    </h4>

                    <a
                        href="tel:+495517707760.0"
                        className="block text-[0.9375rem] text-white no-underline leading-[1.6] transition-colors duration-200 hover:text-brand"
                    >
                        +49.551.7707.760.0
                    </a>

                    <p className="text-[0.9375rem] text-white mt-4 mb-0.5 font-medium">
                        Sales
                    </p>
                    <a
                        href="tel:+4955177077600"
                        className="block text-[0.9375rem] text-white no-underline leading-[1.6] transition-colors duration-200 hover:text-brand"
                    >
                        +49.551.7707.760.60
                    </a>

                    <p className="text-[0.9375rem] text-white mt-4 mb-0.5 font-medium">
                        North America
                    </p>
                    <a
                        href="tel:+14705321856"
                        className="block text-[0.9375rem] text-white no-underline leading-[1.6] transition-colors duration-200 hover:text-brand"
                    >
                        +1.470.532.1856
                    </a>
                </div>

                {/* ── Right column: links + social + CTA ── */}
                <div className="flex flex-col">
                    <div className="mb-7">
                        <h4 className="font-sans text-base font-bold text-white mb-4 tracking-[0.01em]">
                            Links
                        </h4>
                        <Link
                            href="/careers"
                            className="block text-[0.9375rem] text-white no-underline leading-[1.6] transition-colors duration-200 hover:text-brand"
                        >
                            Carrers
                        </Link>
                        <Link
                            href="/imprint"
                            className="block text-[0.9375rem] text-white no-underline leading-[1.6] transition-colors duration-200 hover:text-brand"
                        >
                            Imprint
                        </Link>
                        <Link
                            href="/privacy"
                            className="block text-[0.9375rem] text-white no-underline leading-[1.6] transition-colors duration-200 hover:text-brand"
                        >
                            Privacy policy
                        </Link>
                    </div>

                    <div className="mb-7">
                        <h4 className="font-sans text-base font-bold text-white mb-4 tracking-[0.01em]">
                            Follow us
                        </h4>
                        <div className="flex items-center gap-3">
                            <a
                                href="https://www.xing.com/pages/eddyson"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Xing"
                                className="flex items-center justify-center w-7 h-7 transition-opacity duration-200 hover:opacity-70"
                            >
                                <Image src="/images/xing.svg" alt="Xing" width={24} height={24} className="w-auto h-auto" />
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
                                    width={24}
                                    height={24}
                                    className="w-auto h-auto"
                                />
                            </a>
                        </div>
                    </div>

                    <a
                        href="mailto:sales@eddyson.com"
                        className="self-start inline-flex items-center justify-center bg-white px-8 py-[18px] border-[1.5px] border-white/40 rounded-btn text-charcoal-deep text-sm font-medium tracking-[0.02em] no-underline transition-all duration-200 hover:bg-white/90 hover:border-white w-full max-md:text-center"
                    >
                        Contact Sales
                    </a>
                </div>
            </div>
        </footer>
    );
}
