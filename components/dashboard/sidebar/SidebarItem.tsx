import { LinkBox, LinkOverlay } from "@chakra-ui/react";
import NextLink from "next/link";
import { FC } from "react";

export const SidebarItem: FC<{
  href: string;
  name: string;
  active?: boolean;
  disabled?: boolean;
}> = ({ name, href, active, disabled }) => {
  return (
    <LinkBox
      borderRightRadius={"full"}
      mt={2}
      py={2}
      bg={active ? "#ffd8001a" : undefined}
      // @ts-ignore
      disabled={disabled}
      _hover={{
        bg: active ? "#ffd8002a" : "gray.100",
      }}
      _active={{
        bg: active ? "#ffd8004a" : "gray.200",
      }}
      _disabled={{
        bg: "white",
        color: "gray.300",
      }}
      w={"50%"}
    >
      <LinkOverlay as={NextLink} ml={7} href={disabled ? "" : href}>
        {name}
      </LinkOverlay>
    </LinkBox>
  );
};
