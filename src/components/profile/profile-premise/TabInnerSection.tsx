import { Grid } from "~/styled-system/jsx";

export function TabInnerSection({
  fullWidthContent = false,
  children,
}: {
  fullWidthContent?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Grid
      rowGap="30px"
      columnGap="1.25rem"
      gridTemplateColumns="repeat(9, 1fr)"
      gridAutoFlow="row"
      layerStyle="outlineSecondaryWrapper"
      css={{
        "& > *": { gridColumn: "2 / -2", justifySelf: "stretch" },
        "& > h3": { textStyle: "heading.6", textAlign: "center" },
        "& > .subheading": { textAlign: "center", marginBlockStart: "-1lh" },
        "&[data-full=true] > *": { gridColumn: "1 / -1" },
      }}
      data-full={fullWidthContent}
    >
      {children}
    </Grid>
  );
}
