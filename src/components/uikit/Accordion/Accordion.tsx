import { type ComponentProps, useId } from "react";
import { Collapse, Icon } from "@/components/uikit";
import { css, cx } from "~/styled-system/css";
import { Box, splitCssProps, styled } from "~/styled-system/jsx";
import type { HTMLStyledProps } from "~/styled-system/types";

export const Accordion = styled("div", {
  base: {
    display: "flex",
    flexDirection: "column",
    gap: "3.5",
  },
});

export const AccordionItem = styled("div", {
  base: {
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
  const checkboxId = useId();

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
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      fontSize: "md",
      "& > svg": {
        rotate: "-90deg",
        color: "secondary",
        flexShrink: "0",
        marginInlineStart: "2",
      },
      _peerChecked: { "& > svg": { rotate: "90deg" } },
      _peerDisabled: {
        cursor: "not-allowed",
      },
      _peerFocusVisible: {
        boxShadow: "focus",
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
        {...checkboxProps}
      />
      <label className={labelClassName} htmlFor={checkboxId} {...labelProps}>
        {children}
        <Icon name="action/arrow" />
      </label>
    </>
  );
}

export function AccordionItemContent({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Collapse>
      <Box className={className}>{children}</Box>
    </Collapse>
  );
}
