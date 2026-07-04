import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";

export type PartnerProgramProps =
  SliceComponentProps<Content.PartnerProgramSlice>;

const PartnerProgram: FC<PartnerProgramProps> = ({ slice }) => {
  const cards = slice.primary.cards ?? [];

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-surface px-6 py-16"
    >
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-card bg-charcoal px-6 py-14 md:px-14 /* verify: figma */">
        {/* Decorative ribbons */}
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <span className="absolute left-0 top-1/2 h-2 w-full -rotate-2 bg-accent-teal/70" />
          <span className="absolute left-0 top-1/2 mt-3 h-2 w-full -rotate-3 bg-accent-red/70" />
          <span className="absolute left-0 top-1/2 mt-6 h-2 w-full -rotate-1 bg-accent-pink/70" />
        </div>

        <div className="relative">
          {slice.primary.topline && (
            <span className="mb-4 inline-block rounded-full border-[2px] border-[#FF8831] px-3 py-1 text-xs uppercase tracking-wide text-white">
              {slice.primary.topline}
            </span>
          )}
          <div className="max-w-2xl">
            <PrismicRichText
              field={slice.primary.headline}
              components={{
                heading2: ({ children }) => (
                  <h2 className="mb-4 text-2xl font-bold text-white md:text-3xl /* verify: figma */">
                    {children}
                  </h2>
                ),
                paragraph: ({ children }) => (
                  <h1 className="p mb-4 text-2xl font-bold text-white md:text-3xl /* verify: figma */">
                    {children}
                  </h1>
                ),
              }}
            />
            <div className="mb-10 text-sm leading-relaxed text-white/70">
              <PrismicRichText field={slice.primary.copy} />
            </div>
          </div>

          {/* 3 step cards */}
          <div className="grid gap-4 md:grid-cols-3">
            {cards.map((card, i) => (
              <article
                key={i}
                className="overflow-hidden rounded-panel bg-card-dark"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <PrismicNextImage
                    field={card.image}
                    fallbackAlt=""
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="p-5 text-white">
                  <PrismicRichText
                    field={card.headline}
                    components={{
                      heading3: ({ children }) => (
                        <h3 className="mb-2 text-base font-semibold text-white">
                          {children}
                        </h3>
                      ),
                    }}
                  />
                  <div className="text-xs leading-relaxed text-white">
                    <PrismicRichText field={card.copy} />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnerProgram;