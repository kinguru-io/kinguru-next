// eslint-disable-next-line import/no-extraneous-dependencies
import { PatternConfig } from "@pandacss/types";

export const customDividerPattern: PatternConfig = {
  description: "A custom divider pattern",
  properties: {
    color: { type: "string" },
    thickness: { type: "string" },
    margin: { type: "string" },
  },
  transform(props) {
    const {
      color = "token(colors.neutral.4)",
      thickness = "1px",
      indent = "-5px",
      ...rest
    } = props;
    return {
      "& > *": {
        wordBreak: "break-word",
      },
      "& > *:not(:last-child)": {
        position: "relative",
      },
      "& > *:not(:last-child)::after": {
        content: '""',
        display: "block",
        height: thickness,
        backgroundColor: color,
        bottom: indent,
        position: "absolute",
        width: "100%",
      },
      ...rest,
    };
  },
};
