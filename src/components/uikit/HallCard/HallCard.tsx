import { Tag } from "../Tag";
import { css } from "~/styled-system/css";
import { Flex, Float } from "~/styled-system/jsx";
import { hallCard } from "~/styled-system/recipes";

type HallCardProps = {
  children: React.ReactNode;
};

export function HallCard({ children }: HallCardProps) {
  const classes = hallCard();
  return <div className={classes.hall}>{children}</div>;
}

export function HallTitle({ children }: HallCardProps) {
  return <span className={css({ textStyle: "heading.3" })}>{children}</span>;
}

export function HallDescription({ children }: HallCardProps) {
  return <span className={css({ textStyle: "body.3" })}>{children}</span>;
}

export function HallSlider({ children }: HallCardProps) {
  const classes = hallCard();
  return <div className={classes.hallSlider}>{children}</div>;
}

export function HallPrice({ children }: HallCardProps) {
  return (
    <Float placement="top-end" offset="10%">
      <Tag>{children}</Tag>
    </Float>
  );
}

export function HallContent({ children }: HallCardProps) {
  const classes = hallCard();
  return <div className={classes.hallContent}>{children}</div>;
}

export function HallTitleSize({ children }: HallCardProps) {
  return <span className={css({ textStyle: "body.2" })}>{children}</span>;
}

export function HallTextContent({ children }: HallCardProps) {
  return (
    <Flex flexDir="column" gap="20px">
      {children}
    </Flex>
  );
}
