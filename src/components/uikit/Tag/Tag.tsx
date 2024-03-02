import { css, cva, type RecipeVariantProps } from "~/styled-system/css";
import { SystemStyleObject } from "~/styled-system/types";

export const tagStyles = cva({
  base: {
    display: "inline-block",
    borderRadius: "6px",
    fontWeight: "bold",
  },
  variants: {
    variant: {
      primary: {
        bg: "primary",
        color: "neutral.1",
      },
      secondary: {
        bg: "secondary",
        color: "neutral.5",
      },
      tertiary: {
        bg: "neutral.5",
        color: "neutral.1",
      },
    },
    size: {
      xs: {
        fontSize: "14px",
        lineHeight: "19px",
        px: "4.5px",
        py: "1.5px",
      },
      sm: {
        fontSize: "18px",
        lineHeight: "25px",
        px: "8px",
        py: "3.5px",
      },
      md: {
        fontSize: "22px",
        lineHeight: "30px",
        px: "11px",
        py: "5px",
      },
      lg: {
        fontSize: "26px",
        lineHeight: "38px",
        px: "13px",
        py: "6px",
      },
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

type TagProps = RecipeVariantProps<typeof tagStyles> & {
  css?: SystemStyleObject;
  children: React.ReactNode;
};

export function Tag({ variant, css: cssProp, children }: TagProps) {
  const className = css(tagStyles.raw({ variant }), cssProp);

  return <span className={className}>{children}</span>;
}
