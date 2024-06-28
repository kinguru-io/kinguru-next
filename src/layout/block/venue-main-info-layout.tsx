import { Box } from "~/styled-system/jsx";
import { container } from "~/styled-system/patterns";
import { token } from "~/styled-system/tokens";

export function VenueMainInfoLayout({
  bgImageSrc,
  children,
}: {
  bgImageSrc: string;
  children: React.ReactNode;
}) {
  return (
    <Box
      css={{
        position: "relative",
        bgPosition: "center",
        bgRepeat: "no-repeat",
        bgSize: "cover",
        paddingBlockStart: "28",
        paddingBlockEnd: "10",
        md: { paddingBlockStart: "52" },
      }}
      style={{
        backgroundImage: `
          ${token.var("gradients.dark-overlay-lighter")},
          ${token.var("gradients.darken-to-bottom-lighter")},
          url(${bgImageSrc})
        `,
      }}
    >
      <section
        className={container({
          color: "light",
          "& h1": {
            fontSize: "3xl",
            fontWeight: "bold",
            md: { fontSize: "5xl" },
          },
        })}
      >
        {children}
      </section>
    </Box>
  );
}
