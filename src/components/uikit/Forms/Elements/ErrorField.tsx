import { Fade } from "@chakra-ui/react";
import { Flex } from "~/styled-system/jsx";

export function ErrorField({ error }: { error: any }) {
  const errorFromKey = error?.root || error;

  return (
    errorFromKey && (
      <Fade in={true}>
        <Flex grow="1" fontSize="14px" color="danger">
          {errorFromKey?.message}
        </Flex>
      </Fade>
    )
  );
}
