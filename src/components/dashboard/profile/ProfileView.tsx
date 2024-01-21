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
import { useTranslations } from "next-intl";
import { FC } from "react";

export const ProfileView: FC = () => {
  const t = useTranslations();
  const { data: session, status } = useSession();
  return (
    <Flex
      maxW={"4xl"}
      mx={"auto"}
      pt={[24, 32]}
      mb={5}
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
      {!session?.user?.speaker && (
        <Button mt={3} variant={"primary"}>
          {t("dashboard.become_speaker")}
        </Button>
      )}
    </Flex>
  );
};
