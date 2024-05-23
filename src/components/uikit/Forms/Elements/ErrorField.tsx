import { Flex } from "~/styled-system/jsx";

export function ErrorField({ error }: { error: any }) {
  return (
    error && (
      <Flex grow="1" fontSize="14px" color="danger">
        {error?.message}
      </Flex>
    )
  );
}
