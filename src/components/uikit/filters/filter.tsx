import { InlineBox, Stack } from "~/styled-system/jsx";

export function Filter({
  heading,
  children,
}: {
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <Stack
      layerStyle="outlineSecondaryWrapper"
      borderRadius="27px"
      paddingBlock="15px 10px"
      gap="0"
      height="min-content"
    >
      <InlineBox textStyle="heading.6" paddingInline="25px">
        {heading}
      </InlineBox>
      {children}
    </Stack>
  );
}

export function FilterGroup({
  heading,
  children,
}: {
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <Stack
      gap="15px"
      paddingBlock="15px"
      paddingInline="25px"
      borderBlockEnd={{
        base: "1px solid token(colors.neutral.2)",
        _last: "none",
      }}
    >
      <InlineBox textStyle="heading.4">{heading}</InlineBox>
      {children}
    </Stack>
  );
}
