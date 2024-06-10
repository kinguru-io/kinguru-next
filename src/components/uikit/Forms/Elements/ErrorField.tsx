import { Flex } from "~/styled-system/jsx";

export function ErrorField({ error }: { error: any }) {
  const errorFromKey = error?.root || error;

  return (
    errorFromKey && (
      <Flex grow="1" fontSize="0.875rem" color="danger" animation="fade-in">
        {errorFromKey?.message}
      </Flex>
    )
  );
}
