"use client";

import { useSelectedLayoutSegments } from "next/navigation";
import { ArrowIcon, Button } from "@/components/uikit";
import { useRouter } from "@/navigation";
import { css } from "~/styled-system/css";
import { InlineBox, type InlineBoxProps } from "~/styled-system/jsx";

/**
 * @description regex for a segment from a list of segments that doesn't start with `(` or `_`
 */
const actualSegmentRegex = /^[^\(_]/m;

export function GoBackButton({
  label = null,
  ...inlineBoxProps
}: { label?: string | null } & InlineBoxProps) {
  const segments = useSelectedLayoutSegments();
  const router = useRouter();

  if (segments.filter((part) => actualSegmentRegex.test(part)).length < 2) {
    return null;
  }

  return (
    <InlineBox marginBlockEnd={{ base: "2", md: "4" }} {...inlineBoxProps}>
      <Button
        type="button"
        colorPalette="secondary"
        icon={<ArrowIcon direction="left" />}
        onClick={router.back}
        className={css({ paddingBlock: "2", gap: "1" })}
        rounded={false}
      >
        {label}
      </Button>
    </InlineBox>
  );
}
