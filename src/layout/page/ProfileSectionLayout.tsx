import { Container, Grid } from "~/styled-system/jsx";

/**
 * @param {React.ReactNode} children - Basically to use as the content of the section consisting of a heading and a section. To apply common styles for heading add the className `.heading` to `<h[1,2,3,4,5,6]>` tag
 */
export function ProfileSectionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Container marginInline="0">
      <Grid
        columnGap="1.25rem"
        rowGap="70px"
        gridTemplateColumns="repeat(6, 1fr)"
        gridTemplateRows="repeat(2, auto)"
        css={{
          "& .heading": {
            textStyle: "heading.2",
            textAlign: "center",
            justifySelf: "center",
            gridRow: "1 / 2",
            gridColumn: "1 / -1",
            whiteSpace: "pre",
          },
          "& section": {
            gridColumn: "2 / -2",
            gridRow: "2",
            marginInline: "-1.25rem",
          },
        }}
      >
        {children}
      </Grid>
    </Container>
  );
}
