import type { PropsWithChildren } from "react";
import { Link } from "@/navigation";
import { css } from "~/styled-system/css";
import { Flex } from "~/styled-system/jsx";
import { linkOverlay } from "~/styled-system/patterns";
import { premiseCard } from "~/styled-system/recipes";

export function PremiseCard({ children }: PropsWithChildren) {
  const classes = premiseCard();
  return <article className={classes.premise}>{children}</article>;
}

export function PremiseTags({ children }: PropsWithChildren) {
  return (
    <Flex gap="1" flexWrap="wrap" fontWeight="bold">
      {children}
    </Flex>
  );
}

export function PremiseTitle({ children }: PropsWithChildren) {
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

export function PremiseDescription({ children }: PropsWithChildren) {
  return (
    <p
      className={css({
        lineClamp: "2",
        color: "#474747",
        fontSize: "sm",
        lineHeight: "1.5",
      })}
    >
      {children}
    </p>
  );
}

export function PremiseContent({
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

export function PremiseSlider({ children }: PropsWithChildren) {
  const classes = premiseCard();
  return <div className={classes.premiseSlider}>{children}</div>;
}
