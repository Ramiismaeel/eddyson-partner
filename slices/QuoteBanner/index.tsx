import { FC } from "react"
import { Content } from "@prismicio/client"
import { PrismicRichText, SliceComponentProps } from "@prismicio/react"
import { PrismicNextLink } from "@prismicio/next"

export type QuoteBannerProps = SliceComponentProps<Content.QuoteBannerSlice>

const QuoteBanner: FC<QuoteBannerProps> = ({ slice }) => {
  const deviderClass =
    "w-full lg:max-w-[118px] xl:max-w-[253px] h-[1px] bg-divider hidden md:block"
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="w-full flex items-center justify-center mt-8 md:mt-28  px-6 lg:px-0"
    >
      <div className={deviderClass} />
      <div className="w-full mx-auto md:min-w-[737px] max-w-[737px] leading-[1.4] text-2xl md:text-4xl text-black text-center font-serif">
        <PrismicRichText
          field={slice.primary.quote}
          components={{
            paragraph: ({ children }) => <p>{children}</p>,
            hyperlink: ({ node, children }) => (
              <PrismicNextLink
                field={node.data}
                className="underline decoration-brand decoration-[7px] underline-offset-[1px]"
              >
                {children}
              </PrismicNextLink>
            ),
          }}
        />
      </div>
      <div className={deviderClass} />
    </section>
  )
}

export default QuoteBanner
