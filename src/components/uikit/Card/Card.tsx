import { css } from "~/styled-system/css";

type CardProps = {
  children: React.ReactNode;
};

export function Card({ children }: CardProps) {
  return (
    <article
      className={css({
        minW: "0",
        minH: "452px",
        display: "flex",
        flexDirection: "column",
        bg: "neutral.5",
        position: "relative",
        borderRadius: "10px",
        boxShadow: {
          base: "cardShadow",
          _focusWithin:
            "token(shadows.cardShadow), 0 0 0 2px token(colors.focus)",
          _hover: "token(shadows.cardShadow), 0 0 0 2px token(colors.primary)",
        },
        transition: "shadow",
        overflow: "hidden",
        textStyle: "body.3",
        "&:hover, &:focus-within": {
          "& [data-card=heading]": {
            textDecoration: "underline",
          },
        },
      })}
    >
      {children}
    </article>
  );
}

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
