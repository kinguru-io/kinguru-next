import {
  PremiseCard,
  Tag,
  PremiseContent,
  PremiseTitle,
  PremiseDescription,
  PremiseSlider,
} from "@/components/uikit";
import { PremiseTags } from "@/components/uikit/PremiseCard/PremiseCard";
import { Grid, InlineBox, AspectRatio } from "~/styled-system/jsx";

export function ListingSkeletons({ size }: { size: number }) {
  return (
    <Grid
      css={{
        gap: 6,
        gridTemplateColumns: { base: "1fr", sm: "repeat(2, 1fr)" },
      }}
      aria-busy
    >
      {Array.from({ length: size }, (_, i) => (
        <PremiseCard key={i}>
          <PremiseTags>
            <Tag variant="solid" colorPalette="transparent" color="transparent">
              ...
            </Tag>
          </PremiseTags>
          <PremiseContent href="#" label="">
            <PremiseTitle>...</PremiseTitle>
            <PremiseDescription>
              <InlineBox display="inline-block" height="2lh" lineHeight="1.5" />
            </PremiseDescription>
          </PremiseContent>
          <PremiseSlider>
            <AspectRatio ratio={16 / 9} />
          </PremiseSlider>
        </PremiseCard>
      ))}
    </Grid>
  );
}
