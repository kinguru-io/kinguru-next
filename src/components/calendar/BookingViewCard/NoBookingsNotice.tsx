import { Center } from "~/styled-system/jsx";

export function NoBookingsNotice({ label }: { label: string }) {
  return (
    <Center
      flexBasis="full"
      maxWidth="156px"
      textStyle="body.2"
      textAlign="center"
      color="secondary"
    >
      <span>{label}</span>
    </Center>
  );
}
