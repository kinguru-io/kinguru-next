// eslint-disable-next-line import/no-extraneous-dependencies
import { defineRecipe } from "@pandacss/dev";

export const avatarRecipe = defineRecipe({
  className: "avatar",
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    color: "secondary",
    bgColor: "secondary.lighter",
    fontSize: "sm",
    borderRadius: "full",
    position: "relative",
    overflow: "hidden",
    _groupHover: {
      boxShadow: "ring-primary",
    },
    "& > img[data-failed=true]": { opacity: "0" },
  },
  variants: {
    size: {
      xs: { width: "7", height: "7" },
      sm: { width: "8", height: "8" },
      md: { width: "10", height: "10", fontSize: "md" },
      lg: {},
    },
  },
  defaultVariants: { size: "xs" },
});
