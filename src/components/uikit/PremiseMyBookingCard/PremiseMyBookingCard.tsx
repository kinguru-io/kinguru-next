import { useState, type PropsWithChildren } from "react";
import { Link } from "@/navigation";
import { css } from "~/styled-system/css";
import { Flex } from "~/styled-system/jsx";
import { linkOverlay } from "~/styled-system/patterns";
import { premiseMyBookingCard } from "~/styled-system/recipes";

export function PremiseMyBookingCard({ children }: PropsWithChildren) {
  const classes = premiseMyBookingCard();
  return <Flex className={classes.premise}>{children}</Flex>;
}

export function PremiseMyBookingCardTitle({ children }: PropsWithChildren) {
  return (
    <h4
      className={css({
        fontSize: { base: "lg", sm: "2xl" },
        lineHeight: "1.35",
        fontWeight: "bold",
      })}
      data-label="heading"
    >
      {children}
    </h4>
  );
}

export function PremiseMyBookingCardDescription({ children }: PropsWithChildren) {
  return (
    <p
      className={css({
        lineClamp: "2",
        color: "danger",
        fontSize: "sm",
        lineHeight: "1.5",
      })}
    >
      {children}
    </p>
  );
}

export function PremiseMyBookingCardContent({
  href,
  label,
  children,
}: PropsWithChildren<{ href: string; label: string }>) {
  return (
    <span
      className={css({
        position: "relative",
        display: "flex",
        flexDirection: "column",
        gap: "2",
        _focusWithin: {
          "& > [data-label=heading]": { textDecoration: "underline" },
        },
      })}
    >
      {children}
      <Link href={href} className={linkOverlay()}>
        <span className={css({ srOnly: true })}>{label}</span>
      </Link>
    </span>
  );
}
