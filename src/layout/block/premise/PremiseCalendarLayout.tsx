import { css } from "~/styled-system/css";
import { Container, Box } from "~/styled-system/jsx";

export function PremiseCalendarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box bg="neutral.4" width="100%">
      <Container paddingBlock="70px">
        <section
          className={css({
            paddingBlock: "48px 36px",
            paddingInline: "40px",
            backgroundColor: "neutral.5",
            border: "1px solid",
            borderColor: "neutral.2",
            borderRadius: "10px",
            "& h2": {
              textAlign: "center",
              marginBlockEnd: "52px",
            },
          })}
        >
          {children}
        </section>
      </Container>
    </Box>
  );
}
