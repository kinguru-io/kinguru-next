// eslint-disable-next-line import/no-extraneous-dependencies
import { defineTextStyles } from "@pandacss/dev";

export const additionalTextStyles = defineTextStyles({
  body: {
    1: { value: { fontSize: "18px" } },
    2: { value: { fontSize: "16px" } },
    3: { value: { fontSize: "12px" } },
    4: { value: { fontSize: "8px" } },
  },
  heading: {
    h1: {
      value: {
        fontSize: "36px",
        fontWeight: "700",
        lineHeight: "1.35",
      },
    },
    h2: {
      value: {
        fontSize: "30px",
        fontWeight: "700",
        lineHeight: "1.35",
      },
    },
    h3: {
      value: {
        fontSize: "24px",
        fontWeight: "400",
        lineHeight: "1.35",
      },
    },
    h4: {
      value: {
        fontSize: "14px",
        fontWeight: "700",
        lineHeight: "1.35",
      },
    },
    h5: {
      value: {
        fontSize: "14px",
        fontWeight: "700",
        lineHeight: "1.35",
        textDecoration: "underline",
      },
    },
  },
  button: {
    sm: {
      value: {
        fontSize: "12px",
        lineHeight: "1.2",
      },
    },
    md: {
      value: {
        fontSize: "14px",
        lineHeight: "1.2",
      },
    },
    lg: {
      value: {
        fontSize: "20px",
        lineHeight: "1.2",
      },
    },
    xl: {
      value: {
        fontSize: "24px",
        lineHeight: "1.2",
      },
    },
  },
});
