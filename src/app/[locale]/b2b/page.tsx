import { useId } from "react";
import { AddVenueAnchor } from "./_widgets/add-venue-anchor";
import { Advantages } from "./_widgets/advantages";
import { B2BFaq } from "./_widgets/b2b-faq";
import { B2BHero } from "./_widgets/b2b-hero";
import { CompaniesSection } from "./_widgets/companies-section";
import { ConcentricCircles } from "./_widgets/concentric-circles";
import { PremiseTypeSection } from "./_widgets/premise-type-section";
import { B2BRegisterSection } from "./_widgets/register/b2b-register-section";
import { RegistrationGuideSection } from "./_widgets/registration-guide-section";
import { WhySection } from "./_widgets/why-section";
import { css } from "~/styled-system/css";
import { Float } from "~/styled-system/jsx";
import { token } from "~/styled-system/tokens";

const wrapperLayerStyle = css.raw({
  paddingBlock: "10",
  md: { paddingBlock: "16" },
});

export default function B2BPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const id = useId();

  const anchorNode = <AddVenueAnchor id={id} />;

  return (
    <>
      <B2BHero />
      <div
        className={css(wrapperLayerStyle, {
          display: "flex",
          flexDirection: "column",
          gap: "8",
          md: { gap: "10" },
        })}
      >
        <Advantages />
        {anchorNode}
      </div>
      <div className={css(wrapperLayerStyle, { bgColor: "secondary.lighter" })}>
        <PremiseTypeSection anchorSlot={anchorNode} />
      </div>
      <div className={css(wrapperLayerStyle)}>
        <RegistrationGuideSection anchorSlot={anchorNode} locale={locale} />
      </div>
      <div className={css({ mb: "50px" })}>
        <B2BRegisterSection sectionId={id} />
      </div>
      <div
        style={{
          backgroundImage: "linear-gradient(0deg, #FFFFFF 0%, #EFEFEF 100%)",
        }}
        className={css(wrapperLayerStyle, {
          position: "relative",
          overflow: "hidden",
        })}
      >
        <WhySection anchorSlot={anchorNode} />
        <Float
          css={{
            display: "none",
            width: "md",
            height: "md",
            md: { display: "block" },
          }}
          placement="top-end"
          offsetY="32"
          offsetX="72"
        >
          <ConcentricCircles color={token("colors.primary.lighter")} />
        </Float>
        <Float
          css={{
            display: "none",
            width: "breakpoint-md",
            height: "breakpoint-md",
            md: { display: "block" },
          }}
          placement="middle-start"
          offset="15%"
        >
          <ConcentricCircles color={token("colors.primary.lighter")} />
        </Float>
        <Float
          css={{
            width: "80",
            height: "80",
            md: { display: "none" },
          }}
          placement="top-center"
          offsetY="32"
        >
          <ConcentricCircles color={token("colors.primary.lighter")} />
        </Float>
      </div>
      <div
        className={css(wrapperLayerStyle, {
          borderBlockEnd: "1px solid {colors.secondary.lighter}",
        })}
      >
        <CompaniesSection />
      </div>
      <div className={css(wrapperLayerStyle)}>
        <B2BFaq />
      </div>
      <div
        className={css({
          paddingBlockEnd: "10",
          md: { paddingBlockEnd: "16" },
        })}
      >
        <B2BRegisterSection sectionId={id} />
      </div>
    </>
  );
}
