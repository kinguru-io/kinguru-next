import { Box, Container } from "~/styled-system/jsx";

export function EventMainInfoLayout({
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
      paddingBlock="82px 70px"
      style={{ backgroundImage: `url(${bgImageSrc})` }}
      color="neutral.5"
      _before={{
        content: '""',
        position: "absolute",
        backgroundColor: bgImageSrc ? "neutral.1" : "neutral.2",
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
