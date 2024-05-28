import { Fade } from "@chakra-ui/react";
import { Flex } from "~/styled-system/jsx";

export function ErrorField({ error }: { error: any }) {
  return (
    error && (
      <Fade in={true}>
        <Flex grow="1" fontSize="14px" color="danger">
          {error?.message}
        </Flex>
      </Fade>
    )
  );
}
