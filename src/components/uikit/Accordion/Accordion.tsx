import { useId } from "react";
import { Collapse } from "@/components/uikit";
import { css, cx } from "~/styled-system/css";
import { Box, styled } from "~/styled-system/jsx";
import { hstack } from "~/styled-system/patterns";
import { SystemStyleObject } from "~/styled-system/types";

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
      borderColor="neutral.2"
      borderWidth="1px"
      borderRadius="10px"
      paddingInline="30px 15px"
      paddingBlock="9px"
    >
      {children}
    </Box>
  );
}

export function AccordinItemToggle({
  children,
  titleCss,
}: {
  children: React.ReactNode;
  titleCss?: SystemStyleObject;
}) {
  const checkboxId = useId();
  const labelClassName = css(
    hstack.raw({
      cursor: "pointer",
      justifyContent: "space-between",
    }),
    titleCss,
  );

  return (
    <>
      <label className={labelClassName} htmlFor={checkboxId}>
        {children}
        <span>ArrowIcon</span>
      </label>
      <input
        id={checkboxId}
        className={cx("peer", css({ srOnly: true }))}
        type="checkbox"
      />
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
