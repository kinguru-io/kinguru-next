import { Box, Container } from "~/styled-system/jsx";

export function VenueMainInfoLayout({
  bgImageSrc,
  children,
}: {
  bgImageSrc: string;
  children: React.ReactNode;
}) {
  return (
    <Box
      position="relative"
      bgPosition="center"
      bgRepeat="no-repeat"
      bgSize="cover"
      paddingBlock="60px 54px"
      style={{ backgroundImage: `url(${bgImageSrc})` }}
      _before={{
        content: '""',
        position: "absolute",
        backgroundColor: bgImageSrc ? "neutral.5" : "neutral.4",
        inset: "0",
        opacity: bgImageSrc ? "0.9" : "1",
      }}
    >
      <Container>
        <section>{children}</section>
      </Container>
    </Box>
  );
}
