import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";

export type BenefitsGridProps =
  SliceComponentProps<Content.BenefitsGridSlice>;

const BenefitsGrid: FC<BenefitsGridProps> = ({ slice }) => {
  const cards = slice.primary.cards ?? [];

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-surface px-6 py-16"
    >
      <div className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card, i) => (
          <article
            key={i}
            className="relative aspect-[4/3] overflow-hidden rounded-card /* verify: figma */"
          >
            <PrismicNextImage
              field={card.image}
              fallbackAlt=""
              className="absolute inset-0 h-full w-full object-cover"
            />
            {/* dark gradient so white text stays legible */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5">
              <PrismicRichText
                field={card.headline}
                components={{
                  heading3: ({ children }) => (
                    <h3 className="mb-1.5 text-base font-semibold text-white">
                      {children}
                    </h3>
                  ),
                }}
              />
              <div className="text-xs leading-relaxed text-white/80">
                <PrismicRichText field={card.copy} />
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default BenefitsGrid;