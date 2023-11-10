import {
  Avatar,
  Button,
  Flex,
  Heading,
  SkeletonCircle,
  SkeletonText,
  Text,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { FC } from "react";
import { useLocale } from "@/utils/use-locale.ts";

export const ProfileView: FC = () => {
  const { t } = useLocale();
  const { data: session, status } = useSession();
  return (
    <Flex
      maxW={"4xl"}
      mx={"auto"}
      pt={32}
      textAlign={"center"}
      flexDir={"column"}
      alignItems={"center"}
    >
      <SkeletonCircle size={"64px"} isLoaded={status !== "loading"}>
        <Avatar
          size={"lg"}
          borderWidth={3}
          borderColor={"brand.primary"}
          src={session?.user?.image || undefined}
        />
      </SkeletonCircle>
      <SkeletonText
        noOfLines={2}
        spacing="4"
        skeletonHeight="8"
        isLoaded={status !== "loading"}
      >
        <Heading mt={3}>
          {t("dashboard.greeting")}, {session?.user?.name}!
        </Heading>
        <Text mt={3}>{t("dashboard.announce")}</Text>
      </SkeletonText>
      <Button my={3} variant={"primary"}>
        {t("dashboard.become_speaker")}
      </Button>
    </Flex>
  );
};
