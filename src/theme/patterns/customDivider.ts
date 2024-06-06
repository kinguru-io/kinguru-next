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
      ...rest
    } = props;
    return {
      "& > *": {
        paddingInline: "10px",
        paddingBlock: "5px",
        _hover: {
          backgroundColor: "primary.disabled",
        },
      },
      "& > *:first-child": { paddingBlockStart: "10px" },
      "& > *:last-child": { paddingBlockEnd: "10px" },
      "& > *:not(:last-child)": {
        position: "relative",
        marginBlockEnd: parseInt(thickness) + "px",
        _after: {
          content: '""',
          display: "block",
          height: thickness,
          backgroundColor: color,
          bottom: parseInt(thickness) * -1 + "px",
          position: "absolute",
          insetInlineStart: "10px",
          width: "calc(100% - 20px)",
        },
      },
      ...rest,
    };
  },
};
