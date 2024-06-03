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
        className={css({ srOnly: !isShown })}
        disabled={!isShown}
      >
        {children}
      </fieldset>
      <button
        className={css({
          alignSelf: "start",
          display: "inline-flex",
          gap: "15px",
          alignItems: "baseline",
          fontSize: "20px",
        })}
        type="button"
        onClick={collapseClicked}
      >
        <span className={css({ textStyle: "body.2", whiteSpace: "nowrap" })}>
          {isShown ? hideLabel : `${showLabel} (${count})`}
        </span>
        <ArrowIcon direction={isShown ? "up" : "down"} />
      </button>
    </>
  );
}
