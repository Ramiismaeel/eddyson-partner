import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import PartnerForm from "@/app/components/PartnerForm";

export type ContactSectionProps =
  SliceComponentProps<Content.ContactSectionSlice>;

const ContactSection: FC<ContactSectionProps> = ({ slice }) => {
  return (
    <section
      id="contact"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-surface px-6 py-16"
    >
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2 md:items-start">
        <div className="md:pt-8">
          <PrismicRichText
            field={slice.primary.headline}
            components={{
              heading2: ({ children }) => (
                <h2 className="mb-5 text-2xl font-bold text-ink md:text-3xl /* verify: figma */">
                  {children}
                </h2>
              ),
            }}
          />
          <div className="text-sm leading-relaxed text-ink-soft">
            <PrismicRichText field={slice.primary.copy} />
          </div>
        </div>
        <PartnerForm />
      </div>
    </section>
  );
};

export default ContactSection;