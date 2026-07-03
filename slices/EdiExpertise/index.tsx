import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `EdiExpertise`.
 */
export type EdiExpertiseProps = SliceComponentProps<Content.EdiExpertiseSlice>;

/**
 * Component for "EdiExpertise" Slices.
 */
const EdiExpertise: FC<EdiExpertiseProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for edi_expertise (variation: {slice.variation})
      slices.
      <br />
      <strong>You can edit this slice directly in your code editor.</strong>
      {/**
       * 💡 Use your own AI agent with the Prismic CLI
       * 📚 Docs: https://prismic.io/docs/ai#create-slices
       */}
    </section>
  );
};

export default EdiExpertise;
