import { FC } from "react"
import { Content } from "@prismicio/client"
import { PrismicRichText, SliceComponentProps } from "@prismicio/react"
import { PrismicNextImage } from "@prismicio/next"

export type PartnerProgramProps =
  SliceComponentProps<Content.PartnerProgramSlice>

const PartnerProgram: FC<PartnerProgramProps> = ({ slice }) => {
  const cards = slice.primary.cards ?? []

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="mt-25 w-full mx-auto w-full px-6 md:px-30"
    >
      <div className="bg-linear-to-r from-black to-secondary rounded-3xl  pt-[70px]">
        <div className="w-full">
          <div className="max-w-[739px]  mx-auto px-4">
            {slice.primary.topline && (
              <span className="mb-4 inline-block rounded-full border-2 border-brand bg-badge px-3 py-1 text-xs uppercase tracking-light text-white">
                {slice.primary.topline}
              </span>
            )}
            <PrismicRichText
              field={slice.primary.headline}
              components={{
                paragraph: ({ children }) => (
                  <h1 className="text-2xl text-inverse-soft md:text-4xl leading-[1.4] font-sans mb-2">
                    {children}
                  </h1>
                ),
              }}
            />
            <div className="text-lg md:text-2xl font-light tracking-light leading-[1.4] text-inverse-muted">
              <PrismicRichText field={slice.primary.copy} />
            </div>
          </div>
          <div className="lg:bg-[url(/images/partner_background.png)] w-full bg-auto bg-no-repeat pt-[70px] pb-14">
            <div className="max-w-[739px] grid gap-5 lg:grid-cols-3 mx-auto px-4">
              {cards.map((card, i) => (
                <article
                  key={i}
                  className="overflow-hidden rounded-lg bg-badge shadow-card"
                >
                  <div className="aspect-[4/3] overflow-hidden p-6 rounded ">
                    <PrismicNextImage
                      field={card.image}
                      fallbackAlt=""
                      className="h-full w-full object-cover rounded"
                    />
                  </div>
                  <div className="px-6 text-white pb-8">
                    <PrismicRichText
                      field={card.headline}
                      components={{
                        paragraph: ({ children }) => (
                          <h3 className="mb-4 text-[18px] font-medium text-white">
                            {children}
                          </h3>
                        ),
                      }}
                    />
                    <div className="tracking-light text-base leading-[1.4] text-inverse-muted">
                      <PrismicRichText field={card.copy} />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PartnerProgram
