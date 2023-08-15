"use client";

import {
  Stack,
  Flex,
  Button,
  Text,
  VStack,
  useBreakpointValue,
  Skeleton,
  SimpleGrid,
  Highlight,
} from "@chakra-ui/react";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { Stripes } from "@/components/common/stripes";
import { useLocale } from "@/utils/use-locale";

export function HeroContent() {
  const { t } = useLocale();
  const { status } = useSession();

  return (
    <Flex
      h={useBreakpointValue({ md: "100vh", base: "80vh" })}
      background={`
        url(/img/parallax-1.png) no-repeat center center, 
        url(/img/main.jpg) no-repeat center center`}
      backgroundAttachment={"fixed, scroll"}
      backgroundSize={"contain,cover"}
    >
      <VStack
        w={"full"}
        textAlign={"center"}
        justify={"center"}
        px={useBreakpointValue({ base: 4, md: 8 })}
        bgGradient={"linear(to-r, blackAlpha.100, transparent)"}
      >
        <Stack maxW={"2xl"} align={"flex-start"} spacing={6}>
          <Text
            marginX={"auto"}
            color={"white"}
            fontWeight={700}
            lineHeight={1.2}
            fontSize={useBreakpointValue({ base: "4xl", md: "6xl" })}
          >
            <Highlight
              query={t("company")}
              styles={{ px: "2", py: "1", rounded: "full", bg: "red.100" }}
            >
              {t("hero.slug")}
            </Highlight>
          </Text>
          <Stripes />
          <Text
            marginX={"auto"}
            color={"white"}
            fontWeight={300}
            lineHeight={1.2}
            fontSize={useBreakpointValue({ base: "xl", md: "2xl" })}
          >
            {t("hero.description")}
          </Text>
          <Skeleton isLoaded={status !== "loading"} marginX={"auto"}>
            <SimpleGrid columns={[1, 2]} spacing={5}>
              <Button as={Link} variant={"primary"} href={"/events"}>
                {t("hero.view_events")}
              </Button>
              {status === "authenticated" ? (
                <Button as={Link} variant={"primary"} href={"/dashboard"}>
                  {t("hero.go_to_dashboard")}
                </Button>
              ) : (
                <Button variant={"primary"} onClick={() => signIn()}>
                  {t("hero.sign_up")}
                </Button>
              )}
            </SimpleGrid>
          </Skeleton>
        </Stack>
      </VStack>
    </Flex>
  );
}
