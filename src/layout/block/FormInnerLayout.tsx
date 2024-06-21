import { Box } from "~/styled-system/jsx";

export function FormInnerLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box
      css={{
        "& h3": { textStyle: "heading.extra.1" },
        "& .helper": {
          textStyle: "body.3",
          color: "dark",
        },
        "& .button": { mx: "auto" },
      }}
    >
      {children}
    </Box>
  );
}
