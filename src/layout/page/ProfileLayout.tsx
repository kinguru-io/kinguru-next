import { Container, Grid } from "~/styled-system/jsx";

export function ProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <Container>
      <Grid
        columnGap="1.25rem"
        rowGap="70px"
        paddingBlock="83px 40px"
        gridTemplateColumns="repeat(6, 1fr)"
        gridTemplateRows="repeat(2, auto)"
        css={{
          "& .heading": {
            textStyle: "heading.2",
            textAlign: "center",
            justifySelf: "center",
            gridRow: "1 / 2",
            gridColumn: "1 / -1",
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
