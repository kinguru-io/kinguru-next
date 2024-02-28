import { Tag } from "../Tag";
import { css } from "~/styled-system/css";
import { Flex, Float } from "~/styled-system/jsx";
import { premiseCard } from "~/styled-system/recipes";

type PremiseCardProps = {
  children: React.ReactNode;
};

export function PremiseCard({ children }: PremiseCardProps) {
  const classes = premiseCard();
  return <div className={classes.premise}>{children}</div>;
}

export function PremiseTitle({ children }: PremiseCardProps) {
  return <span className={css({ textStyle: "heading.3" })}>{children}</span>;
}

export function PremiseDescription({ children }: PremiseCardProps) {
  return <span className={css({ textStyle: "body.3" })}>{children}</span>;
}

export function PremiseSlider({ children }: PremiseCardProps) {
  const classes = premiseCard();
  return <div className={classes.premiseSlider}>{children}</div>;
}

export function PremisePrice({ children }: PremiseCardProps) {
  return (
    <Float placement="top-end" offset="10%">
      <Tag>{children}</Tag>
    </Float>
  );
}

export function PremiseContent({ children }: PremiseCardProps) {
  const classes = premiseCard();
  return <div className={classes.premiseContent}>{children}</div>;
}

export function premiseTitleSize({ children }: PremiseCardProps) {
  return <span className={css({ textStyle: "body.2" })}>{children}</span>;
}

export function premiseTextContent({ children }: PremiseCardProps) {
  return (
    <Flex flexDir="column" gap="20px">
      {children}
    </Flex>
  );
}
