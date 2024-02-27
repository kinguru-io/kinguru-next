import { Box } from "~/styled-system/jsx";

export function FormInnerLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box
      css={{
        "& h3": { textStyle: "heading.extra.1" },
        "& .helper": {
          textStyle: "body.3",
          color: "neutral.2",
        },
        "& .button": { mx: "auto" },
      }}
    >
      {children}
    </Box>
  );
}
