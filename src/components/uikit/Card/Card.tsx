import { css } from "~/styled-system/css";
import { styled } from "~/styled-system/jsx";

type CardProps = {
  children: React.ReactNode;
};

export const Card = styled("article", {
  base: {
    minW: "0",
    display: "flex",
    position: "relative",
    borderRadius: "10px",
    overflow: "hidden",
    textStyle: "body.3",
    bgColor: "token(colors.neutral.5)",
  },
  variants: {
    variant: {
      speaker: {
        bgColor: "token(colors.neutral.4)",
      },
      marker: {
        bgColor: "token(colors.neutral.4)",
        borderRadius: "20px 20px 0 20px",
      },
      event: {
        boxShadow: {
          base: "cardShadow",
          _focusWithin:
            "token(shadows.cardShadow), 0 0 0 2px token(colors.focus)",
          _hover: "token(shadows.cardShadow), 0 0 0 2px token(colors.primary)",
        },
        transition: "shadow",
        "&:hover, &:focus-within": {
          "& [data-card=heading]": {
            textDecoration: "underline",
          },
        },
        flexDirection: "column",
      },
    },
  },
});

export function CardInner({ children }: CardProps) {
  return (
    <div
      className={css({
        display: "flex",
        flex: "1",
        flexDirection: "column",
        p: "15px",
        gap: "8px",
      })}
    >
      {children}
    </div>
  );
}

export function CardHeading({ children }: CardProps) {
  return <div data-card="heading">{children}</div>;
}

export function CardBody({ children }: CardProps) {
  return <div className={css({ lineClamp: "4", mt: "3px" })}>{children}</div>;
}

export function CardFooter({ children }: CardProps) {
  return <div className={css({ mt: "auto" })}>{children}</div>;
}
