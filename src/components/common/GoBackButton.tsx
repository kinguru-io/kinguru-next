"use client";

import { useSelectedLayoutSegments } from "next/navigation";
import { ArrowIcon, Button } from "@/components/uikit";
import { useRouter } from "@/navigation.ts";
import { InlineBox, type InlineBoxProps } from "~/styled-system/jsx";

export function GoBackButton({
  label = null,
  ...inlineBoxProps
}: { label?: string | null } & InlineBoxProps) {
  const segments = useSelectedLayoutSegments();
  const router = useRouter();

  if (!segments || segments.length < 2) return null;

  return (
    <InlineBox {...inlineBoxProps}>
      <Button
        type="button"
        colorPalette="secondary"
        size={label ? "md" : "iconOnly"}
        variant="ghost"
        icon={<ArrowIcon direction="left" />}
        onClick={router.back}
      >
        {label}
      </Button>
    </InlineBox>
  );
}
