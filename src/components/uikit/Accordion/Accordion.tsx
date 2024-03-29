import { useId } from "react";
import { Collapse } from "@/components/uikit";
import { css, cx } from "~/styled-system/css";
import { Box, splitCssProps, styled } from "~/styled-system/jsx";
import { HTMLStyledProps } from "~/styled-system/types";

export const Accordion = styled("div", {
  base: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
});

export function AccordionItem({ children }: { children: React.ReactNode }) {
  return (
    <Box
      bgColor="neutral.5"
      borderColor="neutral.2"
      borderWidth="1px"
      borderRadius="10px"
      paddingInline="30px 15px"
      paddingBlock="9px"
      transition="colors"
      _focusWithin={{
        borderColor: "focus",
      }}
    >
      {children}
    </Box>
  );
}

export function AccordinItemToggle(props: HTMLStyledProps<"label">) {
  const checkboxId = useId();

  const [cssProps, { children, ...restProps }] = splitCssProps(props);
  const { css: cssProp, ...styleProps } = cssProps;
  const labelClassName = css(
    {
      position: "relative",
      cursor: "pointer",
      display: "block",
      _after: {
        position: "absolute",
        content: "''",
        width: "0.61em",
        height: "0.61em",
        borderWidth: "1px",
        borderStyle: "none solid solid none",
        borderColor: "neutral.1",
        top: "50%",
        right: "1.25rem",
        transform: "translateY(-75%) rotate(45deg)",
        transition: "transform",
        _peerChecked: {
          transform: "translateY(-25%) rotate(-135deg)",
        },
      },
    },
    styleProps,
    cssProp,
  );

  return (
    <>
      <input
        id={checkboxId}
        className={cx("peer", css({ srOnly: true }))}
        type="checkbox"
      />
      <label className={labelClassName} htmlFor={checkboxId} {...restProps}>
        {children}
      </label>
    </>
  );
}

export function AccordionItemContent({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Collapse>
      <Box padding="30px">{children}</Box>
    </Collapse>
  );
}
