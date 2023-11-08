"use client";

import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  HStack,
  IconButton,
  useDisclosure,
  useColorModeValue,
  Stack,
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { Login } from "@/components/navbar/login";
import { NavLink } from "@/components/navbar/navlink";
import headerLogo from "@/public/img/logo_header.png";
import { useLocale } from "@/utils/use-locale";

export function Navbar({ full }: { full?: boolean }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { t } = useLocale();

  const navigation = [
    { name: t("navbar.events"), href: "/events" },
    { name: t("navbar.speakers"), href: "/speakers" },
    { name: t("navbar.places"), href: "/places" },
    { name: t("navbar.price"), href: "/price" },
  ];

  return (
    <>
      <Box
        bg={useColorModeValue("white", "gray.900")}
        borderBottom={"1px"}
        borderBottomColor={"gray.200"}
        position={"fixed"}
        w={"100vw"}
        px={4}
        zIndex={100}
        backdropFilter="saturate(180%) blur(5px)"
      >
        <Flex
          h={16}
          maxWidth={full ? "full" : "4xl"}
          marginX={"auto"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={t("navbar.open_main_menu")}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Box as={Link} href={"/"}>
              <Image
                src={headerLogo}
                width={96}
                height={36}
                alt={t("company")}
              />
            </Box>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {navigation.map(({ name, href }) => (
                <NavLink href={href} key={href}>
                  {name}
                </NavLink>
              ))}
            </HStack>
          </HStack>
          <Login />
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {navigation.map(({ name, href }) => (
                <NavLink href={href} key={href}>
                  {name}
                </NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
