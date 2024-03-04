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
      xs: { w: "40px", h: "40px" },
      sm: { w: "50px", h: "50px" },
      md: { w: "100px", h: "100px" },
      lg: { w: "185px", h: "185px", borderWidth: "2px" },
    },
  },
  staticCss: [{ size: ["*"] }],
});
