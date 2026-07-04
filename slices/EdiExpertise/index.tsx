import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";

export type EdiExpertiseProps =
  SliceComponentProps<Content.EdiExpertiseSlice>;

const EdiExpertise: FC<EdiExpertiseProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-surface px-6 py-12"
    >
      <div className="mx-auto max-w-2xl text-center">
        <PrismicRichText
          field={slice.primary.headline}
          components={{
            heading2: ({ children }) => (
              <h2 className="mb-5 text-xl font-bold text-ink md:text-2xl /* verify: figma */">
                {children}
              </h2>
            ),
          }}
        />
        <div className="text-sm leading-relaxed text-ink-soft">
          <PrismicRichText field={slice.primary.copy} />
        </div>
      </div>
    </section>
  );
};

export default EdiExpertise;