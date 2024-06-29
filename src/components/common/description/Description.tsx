"use client";

import { useState } from "react";
import { TextCollapse, ArrowIcon } from "@/components/uikit";
import { css } from "~/styled-system/css";
import { Stack } from "~/styled-system/jsx";

type DescriptionProps = {
  description: string;
  maxW?: string;
  showMoreLabel: string;
  showLessLabel: string;
};

export function Description({
  description,
  showLessLabel,
  showMoreLabel,
}: DescriptionProps) {
  const [isShown, setIsShown] = useState(false);

  return (
    <Stack gap="3" fontSize="px15" color="secondary" whiteSpace="pre-line">
      <TextCollapse
        isShown={isShown}
        textContent={description}
        visibleCharsCount={500}
      />
      {description.length > 500 && (
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
          onClick={() => setIsShown((prev) => !prev)}
        >
          {isShown ? showLessLabel : showMoreLabel}
          <ArrowIcon direction={isShown ? "up" : "down"} />
        </button>
      )}
    </Stack>
  );
}
