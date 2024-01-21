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
  VStack,
  Skeleton,
  Input,
} from "@chakra-ui/react";
import { SearchBox } from "@elastic/react-search-ui";
import { signIn, signOut, useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { FiChevronDown, FiMenu } from "react-icons/fi";
import { Link } from "@/navigation.ts";

interface MobileProps extends FlexProps {
  onOpen: () => void;
}

export const NavSidebar = ({ onOpen, ...rest }: MobileProps) => {
  const t = useTranslations();
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
      justifyContent={{ base: "space-between", md: "space-between" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />
      <SearchBox
        autocompleteSuggestions={false}
        debounceLength={0}
        inputView={({ getInputProps }) => (
          <Input
            {...getInputProps({
              placeholder: t("navbar.search_placeholder"),
            })}
            width={["auto", "auto", "auto", "xl"]}
          />
        )}
      />

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
                <MenuList bg={"white"} borderColor={"gray.200"}>
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
