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
      pt={24}
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
            textAlign={"left"}
            whiteSpace={"pre"}
            fontWeight={700}
            lineHeight={1.2}
            fontSize={["4xl"]}
          >
            <Highlight
              query={["Organize", "choose", "earn"]}
              styles={{ color: "brand.primary", fontWeight: "bold" }}
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
            <Highlight
              query={t("company")}
              styles={{ color: "brand.primary", fontWeight: "bold" }}
            >
              {t("hero.description")}
            </Highlight>
          </Text>
          <Skeleton isLoaded={status !== "loading"} my={10} marginX={"auto"}>
            <SimpleGrid columns={[1, 2]} spacing={5}>
              <Button as={Link} variant={"primary"} href={"/events"}>
                {t("hero.view_events")}
              </Button>
              {status === "authenticated" ? (
                <Button as={Link} variant={"primary"} href={"/events/create"}>
                  {t("hero.create_event")}
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
