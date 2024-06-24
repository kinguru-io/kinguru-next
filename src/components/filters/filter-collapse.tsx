"use client";

import { useRef, useState } from "react";
import { ArrowIcon } from "@/components/uikit";
import { css } from "~/styled-system/css";

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
  const collapsedRef = useRef<HTMLFieldSetElement | null>(null);

  const scrollBack = () => {
    if (isShown && collapsedRef.current) {
      window.scrollBy({ top: -collapsedRef.current.clientHeight });
    }
  };

  const collapseClicked = (e: React.PointerEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setShownState((prevState) => !prevState);
    scrollBack();
  };

  return (
    <>
      <fieldset
        ref={collapsedRef}
        className={css({
          minWidth: "unset",
          "&[aria-expanded=false]": { srOnly: true },
        })}
        disabled={!isShown}
        aria-expanded={isShown}
      >
        {children}
      </fieldset>
      <button
        className={css({
          alignSelf: "start",
          display: "inline-flex",
          alignItems: "center",
          gap: "1",
          fontSize: "px13",
          color: "success",
          "& > svg": { color: "secondary" },
          _hoverOrFocusVisible: {
            color: "success.darker",
            "& > svg": { color: "dark" },
          },
        })}
        type="button"
        onClick={collapseClicked}
      >
        {isShown ? hideLabel : showLabel} ({count})
        <ArrowIcon direction={isShown ? "up" : "down"} />
      </button>
    </>
  );
}
