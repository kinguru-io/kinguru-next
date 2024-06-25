import { InlineBox, Stack } from "~/styled-system/jsx";

export function Filter({
  heading,
  children,
}: {
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <Stack gap="4" height="min-content">
      <InlineBox fontSize="3xl" fontWeight="bold">
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
      gap="3"
      paddingBlockEnd="4"
      borderBlockEnd={{
        base: "1px solid token(colors.tertiary)",
        _last: "none",
      }}
    >
      <InlineBox fontSize="md" fontWeight="bold">
        {heading}
      </InlineBox>
      {children}
    </Stack>
  );
}
