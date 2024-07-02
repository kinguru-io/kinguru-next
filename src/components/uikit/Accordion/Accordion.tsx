import { type ComponentProps, useId } from "react";
import { Collapse } from "@/components/uikit";
import { css, cx } from "~/styled-system/css";
import { Box, splitCssProps, styled } from "~/styled-system/jsx";
import type { HTMLStyledProps } from "~/styled-system/types";

export const Accordion = styled("div", {
  base: {
    display: "flex",
    flexDirection: "column",
    gap: "3.5",
    marginBottom: "6",
    // bgColor: "secondary.lighter",
    // padding="3"
    // alignItems="center"
    // borderRadius="lg"
  },
});

export const AccordionItem = styled("div", {
  base: {
    // bgColor: "secondary.lighter",
    // borderRadius: "lg",
    // paddingInline: "4",
    // paddingBlock: "3",
    transition: "colors",
    _focusWithin: {
      borderColor: "focus",
    },
  },
});

export function AccordionItemToggle(
  props: HTMLStyledProps<"label"> & {
    checkboxProps?: Omit<
      ComponentProps<"input">,
      "id" | "className" | "type" | "style"
    >;
  },
) {
  const checkboxId = useId() + "accordion-item";

  const [cssProps, { children, checkboxProps, ...labelProps }] =
    splitCssProps(props);
  const { css: cssProp, ...styleProps } = cssProps;
  const labelClassName = css(
    {
      position: "relative",
      bgColor: "secondary.lighter",
      borderRadius: "lg",
      paddingInline: "4",
      paddingBlock: "3",
      cursor: "pointer",
      display: "block",
      fontSize: "md",
      _peerDisabled: {
        cursor: "not-allowed",
      },
      _after: {
        position: "absolute",
        content: "''",
        width: "0.61em",
        height: "0.61em",
        borderWidth: "1px",
        borderStyle: "none solid solid none",
        borderColor: "dark",
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
    // TODO leave just `cssProp` once `@pandacss/dev` is updated from 0.38.0
    ...(Array.isArray(cssProp) ? cssProp : [cssProp]),
  );

  return (
    <>
      <input
        id={checkboxId}
        className={cx("peer", css({ srOnly: true }))}
        type="checkbox"
        {...checkboxProps}
      />
      <label className={labelClassName} htmlFor={checkboxId} {...labelProps}>
        {children}
      </label>
    </>
  );
}

export function AccordionItemContent({
  padding = "30px",
  children,
}: {
  padding?: string;
  children: React.ReactNode;
}) {
  return (
    <Collapse>
      <Box padding={padding}>{children}</Box>
    </Collapse>
  );
}
