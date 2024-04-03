import { css } from "~/styled-system/css";
import { styled } from "~/styled-system/jsx";
import type { JsxStyleProps } from "~/styled-system/types";

type CardProps = {
  children: React.ReactNode;
};

export const Card = styled(
  "article",
  {
    base: {
      minW: "0",
      display: "flex",
      position: "relative",
      borderRadius: "10px",
      overflow: "hidden",
      textStyle: "body.3",
      bgColor: "token(colors.neutral.5)",
      "&[data-interactive]": {
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
      },
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
          flexDirection: "column",
          minH: "452px",
        },
      },
    },
  },
  {
    dataAttr: true,
  },
);

export const CardInner = styled("div", {
  base: {
    display: "flex",
    flex: "1",
    flexDirection: "column",
    p: "15px",
    gap: "8px",
  },
});

export function CardHeading({
  children,
  ...props
}: JsxStyleProps & { children: React.ReactNode }) {
  return (
    <styled.div data-card="heading" {...props}>
      {children}
    </styled.div>
  );
}

export function CardBody({ children }: CardProps) {
  return <div className={css({ lineClamp: "4", mt: "3px" })}>{children}</div>;
}

export const CardFooter = styled("div", {
  base: {
    marginBlockStart: "auto",
  },
});
