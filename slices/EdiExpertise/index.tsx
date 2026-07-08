import { Content } from "@prismicio/client"
import { PrismicRichText, SliceComponentProps } from "@prismicio/react"

export type EdiExpertiseProps = SliceComponentProps<Content.EdiExpertiseSlice>

function EdiExpertise({ slice }: EdiExpertiseProps) {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="w-full mt-8 md:mt-28"
    >
      <div className="w-full mx-auto max-w-[990px] px-6 sm:px-12 lg:px-0 text-left">
        <PrismicRichText
          field={slice.primary.headline}
          components={{
            paragraph: ({ children }) => (
              <h2 className="mb-4 text-2xl font-bold md:text-4xl text-strong">
                {children}
              </h2>
            ),
          }}
        />
        <div className="text-xl md:text-4xl font-light leading-[1.4]  text-muted">
          <PrismicRichText field={slice.primary.copy} />
        </div>
      </div>
    </section>
  )
}

export default EdiExpertise
