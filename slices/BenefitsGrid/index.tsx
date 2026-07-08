import { FC } from "react"
import { Content } from "@prismicio/client"
import { PrismicRichText, SliceComponentProps } from "@prismicio/react"
import { PrismicNextImage } from "@prismicio/next"

export type BenefitsGridProps = SliceComponentProps<Content.BenefitsGridSlice>

const BenefitsGrid: FC<BenefitsGridProps> = ({ slice }) => {
  const cards = slice.primary.cards ?? []

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className=""
    >
      <div className="mx-auto max-w-[1600px] grid gap-4 lg:gap-10 sm:grid-cols-2 lg:grid-cols-3 mt-8 md:mt-41 px-6 lg:px-16 xl:px-[90px]">
        {cards.map((card, i) => (
          <article
            key={i}
            className="relative overflow-hidden rounded-xl md:rounded-3xl 2xl:min-w-[412px] min-h-56 md:min-h-[448px]"
          >
            <PrismicNextImage
              field={card.image}
              width={412}
              height={448}
              alt={(card.image.alt ?? `grid-${i + 1}`) as never}
              className="absolute inset-0 h-full w-full object-cover "
            />
            {/* dark gradient so white text stays legible */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-4 lg:pb-[30px] lg:px-9">
              <PrismicRichText
                field={card.headline}
                components={{
                  paragraph: ({ children }) => (
                    <h3 className="mb-4 text-lg md:text-2xl leading-[1.4] font-bold text-white">
                      {children}
                    </h3>
                  ),
                }}
              />
              <div className="text-base md:text-2xl leading-[1.6] tracking-light text-white">
                <PrismicRichText field={card.copy} />
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default BenefitsGrid
