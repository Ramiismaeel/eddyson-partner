import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";

export type HeroProps = SliceComponentProps<Content.HeroSlice>;

// shared classes for the two vertical meta labels
const metaVertical =
  "font-mono font-light text-xs uppercase tracking-[0.24px] whitespace-nowrap " +
  "[writing-mode:vertical-rl] rotate-180";

const Hero: FC<HeroProps> = ({ slice }) => {
  const logos = slice.primary.logos ?? [];

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="relative bg-surface px-4 sm:px-8 lg:px-20 /* verify: figma gutter */" >
        {/* Masked dot-grid, top-right */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-0 top-0 h-[380px] w-[420px]
                   bg-[radial-gradient(rgba(148,148,148,0.35)_1.3px,transparent_1.3px)]
                   bg-[size:22px_22px]
                   [mask-image:radial-gradient(circle_at_85%_15%,#000_0%,transparent_72%)]
                   [-webkit-mask-image:radial-gradient(circle_at_85%_15%,#000_0%,transparent_72%)]"
        />

        {/* Big serif H1 — above the orange card */}
        <PrismicRichText
          field={slice.primary.title}
          components={{
            heading1: ({ children }) => (
              <h1 className="relative z-10 py-16 pl-6 font-serif text-[38px] font-normal leading-[1.6] text-ink md:pl-[100px] md:text-[clamp(38px,4.15vw,62px)] /* verify: figma */">
                {children}
              </h1>
            ),
            paragraph: ({ children }) => (
              <h1 className="relative z-10 py-16 pl-6 font-serif text-[38px] font-normal leading-[1.6] text-ink md:pl-[100px] md:text-[clamp(38px,4.15vw,62px)]">
                {children}
              </h1>
            ),
          }}
        />

        {/* Right-edge vertical meta label (grey, outside card) */}
        <span
          aria-hidden="true"
          className={`absolute right-1 top-[91px] hidden text-neutral-400 md:block ${metaVertical}`}
        >
          eddyson&nbsp;|&nbsp;2026
        </span>

        {/* Orange hero card */}
        <div className="relative min-h-[520px] rounded-t-[24px] bg-[#FF8831] px-6 py-14 md:pl-[102px] md:py-[109px] /* verify: figma */">
          {/* Left-edge vertical label (white 50%, inside card) */}
          <span
            aria-hidden="true"
            className={`absolute left-[38px] top-1/2 hidden -translate-y-1/2 text-white/50 md:block ${metaVertical}`}
          >
            Select.&nbsp;Connect.&nbsp;Evolve.
          </span>

          <div className="flex max-w-[484px] flex-col gap-9">
            <div className="flex flex-col gap-4">
              {slice.primary.topline && (
                <h2 className="font-sans text-[36px] font-medium leading-[1.3] text-ink /* verify: figma */">
                  {slice.primary.topline}
                </h2>
              )}
              <div className="text-[18px] leading-[1.6] tracking-[0.36px] text-ink">
                <PrismicRichText field={slice.primary.copy} />
              </div>
            </div>

            <div className="flex flex-wrap gap-6">
              <PrismicNextLink
                field={slice.primary.cta_secondary}
                className="inline-flex items-center justify-center rounded-lg bg-white px-6 py-3 font-sans text-base font-medium text-ink transition hover:bg-white/85"
              />
              <PrismicNextLink
                field={slice.primary.cta_primary}
                className="inline-flex items-center justify-center rounded-lg bg-charcoal-deep px-6 py-3 font-sans text-base font-medium text-white transition hover:bg-charcoal"
              />
            </div>
          </div>

          {/* Floating product-UI widgets */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-[31px] top-[-122px] hidden h-[587px] w-[650px] md:block
             [@media(max-width:1100px)]:scale-[0.82] [@media(max-width:1100px)]:origin-top-right
             [@media(max-width:900px)]:scale-[0.66]"
          >
            {/* All-requests menu */}
            <div className="absolute left-[328px] z-[1] top-0 w-[313px] overflow-hidden rounded-xl bg-white ">
              <PrismicNextImage field={slice.primary.widget_menu} alt={(slice.primary.widget_menu.alt || "logo") as never} className="h-auto w-full" />
            </div>

            {/* Inventory card — glassy charcoal, z-2, sits over the orange */}
            <div className="absolute left-[130px] top-[83px] z-[2] w-[240px] overflow-hidden rounded-xl ">
              <PrismicNextImage field={slice.primary.widget_inventory} alt={(slice.primary.widget_inventory.alt || "logo") as never} className="h-auto w-full" />
            </div>

            {/* Video player */}
            <div className="absolute left-0 top-[294px] z-[0] w-[412px] overflow-hidden rounded-xl ">
              <PrismicNextImage field={slice.primary.widget_video} alt={(slice.primary.widget_video.alt || "logo") as never} className="h-auto w-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Logo marquee */}
      {logos.length > 0 && (
        <div
          aria-label="Trusted by leading companies"
          className="group overflow-hidden border-y border-black/5 bg-surface-muted py-6"
        >
          <div className="animate-marquee flex w-max items-center gap-12 [animation:marquee_30s_linear_infinite] group-hover:[animation-play-state:paused]">
            {[...logos, ...logos].map((item, i) => (
              <span
                key={`${item.name}-${i}`}
                aria-hidden={i >= logos.length}
                className="flex h-8 shrink-0 items-center opacity-60 grayscale transition hover:opacity-100 hover:grayscale-0"
              >
                <PrismicNextImage
                  field={item.logo}
                  alt={(item.logo.alt || "logo") as never}
                  className="h-full w-auto object-contain"
                />

              </span>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;