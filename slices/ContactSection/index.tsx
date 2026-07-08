import { FC } from "react"
import { Content } from "@prismicio/client"
import { PrismicRichText, SliceComponentProps } from "@prismicio/react"
import { PartnerForm } from "@/app/components/form/Partnerform"

export type ContactSectionProps =
  SliceComponentProps<Content.ContactSectionSlice>

const ContactSection: FC<ContactSectionProps> = ({ slice }) => {
  return (
    <section
      id="contact"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="w-full relative md:mt-44 lg:pb-[175px] pb-16 pt-6"
    >
      <div className="absolute top-[40%] bottom-0 w-full h-full -z-1 bg-[url(/images/Bottom-bg.png)] bg-cover bg-no-repeat bg-bottom" />
      <div className="w-full flex flex-col lg:flex-row items-center gap-[110px] px-6 lg:px-16 xl:px-[90px]">
        <div className="md:pt-8 max-w-153">
          <PrismicRichText
            field={slice.primary.headline}
            components={{
              paragraph: ({ children }) => (
                <h2 className="mb-4 text-xl font-bold text-strong lg:text-4xl leading-[1.4]">
                  {children}
                </h2>
              ),
            }}
          />
          <div className="lg:text-4xl font-light leading-[1.4] text-muted">
            <PrismicRichText field={slice.primary.copy} />
          </div>
        </div>
        <div className="w-full max-w-[558px] lg:min-w-100 xl:min-w-[558px]">
          <PartnerForm />
        </div>
      </div>
    </section>
  )
}

export default ContactSection
