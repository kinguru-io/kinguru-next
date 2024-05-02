import { Tag } from "../Tag";
import { css } from "~/styled-system/css";
import { Flex, Float } from "~/styled-system/jsx";
import { premiseCard } from "~/styled-system/recipes";

type PremiseCardProps = {
  children: React.ReactNode;
};

export function PremiseCard({ children }: PremiseCardProps) {
  const classes = premiseCard();
  return <article className={classes.premise}>{children}</article>;
}

export function PremiseDescription({ children }: PremiseCardProps) {
  return (
    <p className={css({ textStyle: "body.3", marginInlineEnd: "14%" })}>
      {children}
    </p>
  );
}

export function PremiseSlider({ children }: PremiseCardProps) {
  const classes = premiseCard();
  return <div className={classes.premiseSlider}>{children}</div>;
}

export function PremisePrice({ children }: PremiseCardProps) {
  return (
    <Float placement="top-end" offset="6px" translate="none">
      <Tag size="md">{children}</Tag>
    </Float>
  );
}

export function PremiseContent({ children }: PremiseCardProps) {
  const classes = premiseCard();
  return <div className={classes.premiseContent}>{children}</div>;
}

export function PremiseTitleSize({ children }: PremiseCardProps) {
  return (
    <span
      className={css({
        textStyle: "body.2",
        whiteSpace: "nowrap",
      })}
    >
      {children}
    </span>
  );
}

export function PremiseTitle({ children }: PremiseCardProps) {
  return <h3>{children}</h3>;
}

export function PremiseTitleWrapper({ children }: PremiseCardProps) {
  return (
    <Flex gap="10px" alignItems="baseline" flexWrap="wrap">
      {children}
    </Flex>
  );
}

export function PremiseTextContent({ children }: PremiseCardProps) {
  return (
    <Flex flexDir="column" gap="20px">
      {children}
    </Flex>
  );
}
