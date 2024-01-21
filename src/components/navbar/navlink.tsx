import { Box, useColorModeValue } from "@chakra-ui/react";
import { Link } from "@/navigation.ts";

export const NavLink = ({
  children,
  href,
}: {
  href: string;
  children: React.ReactNode;
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
    >
      {children}
    </Box>
  );
};
