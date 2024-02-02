import { css, cva, type RecipeVariantProps } from "~/styled-system/css";
import { SystemStyleObject } from "~/styled-system/types";

export const tagStyles = cva({
  base: {
    display: "inline-block",
    fontSize: "18px",
    lineHeight: "25px",
    fontWeight: "bold",
    px: "8px",
    py: "3.5px",
    borderRadius: "6px",
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
