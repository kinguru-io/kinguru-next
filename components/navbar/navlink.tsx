import { Box, useColorModeValue } from "@chakra-ui/react";
import Link from "next/link";

export const NavLink = ({
  children,
  href,
  locale,
}: {
  href: string;
  children: React.ReactNode;
  locale?: string;
}) => {
  return (
    <Box
      as={Link}
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("gray.200", "gray.700"),
      }}
      href={href}
      locale={locale}
    >
      {children}
    </Box>
  );
};
