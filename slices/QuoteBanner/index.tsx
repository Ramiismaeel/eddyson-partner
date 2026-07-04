import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { PrismicNextLink } from "@prismicio/next";

export type QuoteBannerProps =
  SliceComponentProps<Content.QuoteBannerSlice>;

const QuoteBanner: FC<QuoteBannerProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-surface-muted px-6 py-12"
    >
      <div className="mx-auto max-w-3xl">
        <PrismicRichText
          field={slice.primary.quote}
          components={{
            paragraph: ({ children }) => (
              <p className="text-center font-serif text-2xl leading-snug text-ink /* verify: figma */">
                {children}
              </p>
            ),
            hyperlink: ({ node, children }) => (
              <PrismicNextLink
                field={node.data}
                className="text-brand underline decoration-brand decoration-2 underline-offset-4"
              >
                {children}
              </PrismicNextLink>
            ),
          }}
        />
      </div>
    </section>
  );
};

export default QuoteBanner;