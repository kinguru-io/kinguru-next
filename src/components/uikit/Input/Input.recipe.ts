// eslint-disable-next-line import/no-extraneous-dependencies
import { defineRecipe } from "@pandacss/dev";

export const inputRecipe = defineRecipe({
  className: "input",
  base: {
    display: "block",
    width: "full",
    fontSize: "16px",
    lineHeight: "1.25",
    bg: "neutral.5",
    border: "1px solid token(colors.secondary)",
    transition: "colors",
    _placeholder: {
      color: "neutral.2",
    },
    _hoverEnabled: {
      borderColor: "primary",
    },
    _focusVisible: {
      outline: "none",
      borderColor: "primary",
    },
    _disabled: {
      color: "neutral.3",
      borderColor: "neutral.3",
      cursor: "not-allowed",
    },
    _invalid: {
      borderColor: "danger",
    },
  },
  variants: {
    variant: {
      default: {
        borderInline: "none",
        borderBlockStart: "none",
        py: "2px",
      },
      outline: {
        borderRadius: "full",
        px: "25px",
        py: "8px",
      },
      danger: {
        borderColor: "red",
      },
    },
  },
  defaultVariants: {
    variant: "default",
  },
  staticCss: [{ variant: ["*"] }],
});
