import { Content } from "@prismicio/client"
import { PrismicRichText, SliceComponentProps } from "@prismicio/react"
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next"

export type HeroProps = SliceComponentProps<Content.HeroSlice>

function Hero({ slice }: HeroProps) {
  const logos = slice.primary.logos ?? []

  const buttonClass =
    "inline-flex items-center justify-center rounded-lg tracking-light border-2 border-primary px-3 md:px-6 py-2 md:py-[18px] font-sans text-base font-medium transition"

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative"
    >
      <div className="w-full mt-8 md:mt-[53px] max-w-[1600px] mx-auto">
        <div className="max-w-[566px] md:ml-31 px-6 md:px-0">
          <PrismicRichText
            field={slice.primary.title}
            components={{
              paragraph: ({ children }) => (
                <h1 className="font-serif text-4xl md:text-[62px] leading-[160%] tracking-normal">
                  {children}
                </h1>
              ),
            }}
          />
        </div>
      </div>
      <div className="w-full mt-[62px] px-6 relative max-w-[1600px] mx-auto">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute sm:-right-36 md:-right-30 lg:-right-14 xl:right-[38px] xl:bottom-unset -bottom-12 md:-bottom-14 xl:top-[-122px] hidden h-[587px] w-[650px] md:block
             xl:scale-[1] 
             sm:scale-[0.50]
             lg:scale-[0.75]"
        >
          {/* All-requests menu */}
          <div className="absolute left-[328px] z-[1] top-0 w-[313px] overflow-hidden rounded-xl">
            <PrismicNextImage
              field={slice.primary.widget_menu}
              alt={(slice.primary.widget_menu.alt || "logo") as never}
              className="h-auto w-full"
            />
          </div>

          {/* Inventory card — glassy charcoal, z-2, sits over the orange */}
          <div className="absolute left-[130px] top-[83px] z-[2] w-[240px] overflow-hidden rounded-xl">
            <PrismicNextImage
              field={slice.primary.widget_inventory}
              alt={(slice.primary.widget_inventory.alt || "logo") as never}
              className="h-auto w-full"
            />
          </div>

          {/* Video player */}
          <div className="absolute left-0 top-[294px] z-[0] w-[412px] overflow-hidden rounded-xl">
            <PrismicNextImage
              field={slice.primary.widget_video}
              alt={(slice.primary.widget_video.alt || "logo") as never}
              className="h-auto w-full"
            />
          </div>
        </div>
        <span
          aria-hidden="true"
          className="absolute left-[38px] top-1/2 hidden -translate-y-1/2 text-white/50 md:block font-mono font-light text-xs uppercase tracking-[0.24px] whitespace-nowrap [writing-mode:vertical-rl] rotate-180"
        >
          Select.&nbsp;Connect.&nbsp;Evolve.
        </span>
        <div className="w-full bg-brand px-4 md:px-25 rounded-t-3xl py-8 md:py-0 flex h-auto md:h-[520px]">
          <div className="w-full md:w-5/8 md:max-w-[484px] self-center">
            <div className="flex flex-col gap-4">
              {slice.primary.topline && (
                <h2 className="font-sans text-xl sm:text-4xl font-medium leading-none text-primary">
                  {slice.primary.topline}
                </h2>
              )}
              <div className="text-base sm:text-lg leading-[160%] tracking-light text-secondary">
                <PrismicRichText field={slice.primary.copy} />
              </div>
            </div>
            <div className="flex flex-wrap gap-6 mt-8">
              <PrismicNextLink
                field={slice.primary.cta_secondary}
                className={`${buttonClass} text-primary hover:bg-gray-400`}
              />
              <PrismicNextLink
                field={slice.primary.cta_primary}
                className={`${buttonClass} text-inverse-soft bg-primary hover:bg-gray-800`}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Logo marquee */}
      {logos.length > 0 && (
        <div
          aria-label="Trusted by leading companies"
          className="group overflow-hidden rounded-b-3xl bg-surface-muted py-6 mx-6  bg-inverse-muted max-w-[1552px] 2xl:mx-auto"
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
  )
}

export default Hero
