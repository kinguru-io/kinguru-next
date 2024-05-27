"use client";

import { useState } from "react";
import { ArrowIcon } from "@/components/uikit";
import { css } from "~/styled-system/css";
import { Box } from "~/styled-system/jsx";

export function FilterCollapse({
  children,
  count,
  showLabel,
  hideLabel,
}: {
  children: React.ReactNode;
  count: number;
  showLabel: string;
  hideLabel: string;
}) {
  const [isShown, setShownState] = useState(false);

  const collapseClicked = (e: React.PointerEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setShownState((prevState) => !prevState);
  };

  return (
    <>
      <Box srOnly={!isShown}>{children}</Box>
      <button
        className={css({
          alignSelf: "start",
          display: "inline-flex",
          gap: "15px",
          alignItems: "baseline",
          fontSize: "20px",
          whiteSpace: "nowrap",
        })}
        type="button"
        onClick={collapseClicked}
      >
        <span className={css({ textStyle: "body.2" })}>
          {isShown ? hideLabel : `${showLabel} (${count})`}
        </span>
        <ArrowIcon direction={isShown ? "up" : "down"} />
      </button>
    </>
  );
}
