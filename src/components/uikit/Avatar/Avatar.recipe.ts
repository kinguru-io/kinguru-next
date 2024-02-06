// eslint-disable-next-line import/no-extraneous-dependencies
import { defineRecipe } from "@pandacss/dev";

export const avatarRecipe = defineRecipe({
  className: "avatar",
  base: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    bg: "primary",
    color: "neutral.1",
    fontSize: "12px",
    lineHeight: "1.2",
    borderWidth: "1px",
    borderColor: "primary",
    borderRadius: "full",
    position: "relative", // since fill={true} for inner Image(next/image) component
    overflow: "hidden",
  },
  variants: {
    size: {
      sm: { w: "10", h: "10" },
      md: { w: "24", h: "24" },
      lg: { w: "44", h: "44", borderWidth: "2px" },
    },
  },
  staticCss: [{ size: ["*"] }],
});
