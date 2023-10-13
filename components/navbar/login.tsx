import {
  Avatar,
  Button,
  Divider,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Skeleton,
} from "@chakra-ui/react";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { useLocale } from "@/utils/use-locale";

export const Login = () => {
  const { t } = useLocale();
  const { data: session, status } = useSession();
  const userNavigation = [
    { name: t("navbar.your_profile"), href: "/dashboard" },
    { name: t("navbar.settings"), href: "#" },
  ];

  return (
    <Flex alignItems={"center"}>
      <Skeleton isLoaded={status !== "loading"}>
        {status === "authenticated" ? (
          <Menu>
            <MenuButton
              as={Button}
              rounded={"full"}
              variant={"link"}
              cursor={"pointer"}
              minW={0}
            >
              <Avatar
                size={"sm"}
                name={session?.user?.name || ""}
                src={session?.user?.image ?? undefined}
              />
            </MenuButton>
            <MenuList>
              {userNavigation.map(({ name, href }) => (
                <MenuItem as={Link} key={href} href={href}>
                  {name}
                </MenuItem>
              ))}
              <Divider />
              <MenuItem onClick={() => signOut()}>
                {t("navbar.sign_out")}
              </MenuItem>
            </MenuList>
          </Menu>
        ) : (
          <Button onClick={() => signIn()}>{t("navbar.sign_in")}</Button>
        )}
      </Skeleton>
    </Flex>
  );
};
