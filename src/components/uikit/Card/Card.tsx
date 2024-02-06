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
        boxShadow: "cardShadow",
        overflow: "hidden",
        textStyle: "body.3",
        _hover: {
          outline: "2px solid token(colors.primary)",
        },
        _focusWithin: {
          outline: "2px solid token(colors.focus)",
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

export function CardBody({ children }: CardProps) {
  return <div className={css({ lineClamp: "4", mt: "3px" })}>{children}</div>;
}

export function CardFooter({ children }: CardProps) {
  return <div className={css({ mt: "auto" })}>{children}</div>;
}
