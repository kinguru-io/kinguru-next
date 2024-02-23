import {
  Stack,
  Flex,
  Button,
  Text,
  VStack,
  useBreakpointValue,
  Skeleton,
  Highlight,
} from "@chakra-ui/react";
import { signIn, useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { Stripes } from "@/components/common/stripes";
import { Link } from "@/navigation.ts";

export function HeroContent() {
  const t = useTranslations();
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
            textAlign={"center"}
            whiteSpace={"pre"}
            fontWeight={700}
            lineHeight={1.2}
            fontSize={["xl", "4xl"]}
          >
            <Highlight
              query={t("hero.slug_keywords").split(",")}
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
            fontSize={["xl", "2xl"]}
          >
            <Highlight
              query={t("company")}
              styles={{ color: "brand.primary", fontWeight: "bold" }}
            >
              {t("hero.description")}
            </Highlight>
          </Text>
          <Skeleton isLoaded={status !== "loading"} my={10} marginX={"auto"}>
            {status === "authenticated" ? (
              <Flex>
                <Button
                  as={Link}
                  variant={"primary"}
                  href={"/places/create"}
                  mr={3}
                >
                  {t("hero.create_place")}
                </Button>
                <Button as={Link} variant={"primary"} href={"/events/create"}>
                  {t("hero.create_event")}
                </Button>
              </Flex>
            ) : (
              <Flex
                direction={["column", "row"]}
                alignItems={["center", "inherit"]}
                gap={[2, 0]}
              >
                <Button
                  variant={"primary"}
                  onClick={() =>
                    signIn(undefined, { callbackUrl: "/places/create" })
                  }
                  mr={[0, 3]}
                >
                  {t("hero.create_place")}
                </Button>
                <Button
                  variant={"primary"}
                  onClick={() =>
                    signIn(undefined, { callbackUrl: "/events/create" })
                  }
                >
                  {t("hero.create_event")}
                </Button>
              </Flex>
            )}
          </Skeleton>
        </Stack>
      </VStack>
    </Flex>
  );
}
