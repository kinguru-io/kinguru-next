import {
  Avatar,
  Box,
  Button,
  Flex,
  FlexProps,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  useColorModeValue,
  VStack,
  Skeleton,
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { FiChevronDown, FiMenu } from "react-icons/fi";
import { useLocale } from "@/utils/use-locale.ts";

interface MobileProps extends FlexProps {
  onOpen: () => void;
}

export const NavSidebar = ({ onOpen, ...rest }: MobileProps) => {
  const { t } = useLocale();
  const { data: session, status } = useSession();
  const userNavigation = [
    { name: t("navbar.your_profile"), href: "/dashboard" },
    { name: t("navbar.settings"), href: "#" },
  ];

  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      backgroundColor={"rgba(255,255,255,.3)"}
      backdropFilter="auto"
      backdropBlur="8px"
      position={"fixed"}
      zIndex={100}
      w={["100%", "calc(100% - var(--chakra-space-60))"]}
      height="20"
      alignItems="center"
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />
      <Box
        as={Link}
        display={{ base: "flex", md: "none" }}
        mx={"auto"}
        href={"/"}
      >
        <Image
          src={"/img/logo_header.png"}
          width={96}
          height={72}
          alt={t("company")}
        />
      </Box>

      <HStack spacing={{ base: "0", md: "6" }}>
        <Skeleton isLoaded={status !== "loading"}>
          {status === "authenticated" ? (
            <Flex alignItems={"center"}>
              <Menu>
                <MenuButton
                  py={2}
                  transition="all 0.3s"
                  _focus={{ boxShadow: "none" }}
                >
                  <HStack>
                    <Avatar
                      size={"sm"}
                      src={session?.user?.image || undefined}
                    />
                    <VStack
                      display={{ base: "none", md: "flex" }}
                      alignItems="flex-start"
                      spacing="1px"
                      ml="2"
                    >
                      <Text fontSize="sm">{session?.user?.name}</Text>
                    </VStack>
                    <Box display={{ base: "none", md: "flex" }}>
                      <FiChevronDown />
                    </Box>
                  </HStack>
                </MenuButton>
                <MenuList
                  bg={useColorModeValue("white", "gray.900")}
                  borderColor={useColorModeValue("gray.200", "gray.700")}
                >
                  {userNavigation.map(({ name, href }) => (
                    <MenuItem as={Link} key={href} href={href}>
                      {name}
                    </MenuItem>
                  ))}
                  <MenuDivider />
                  <MenuItem onClick={() => signOut()}>
                    {t("navbar.sign_out")}
                  </MenuItem>
                </MenuList>
              </Menu>
            </Flex>
          ) : (
            <Button onClick={() => signIn()}>{t("navbar.sign_in")}</Button>
          )}
        </Skeleton>
      </HStack>
    </Flex>
  );
};
