import {
  Box,
  Container,
  Heading,
  Progress,
  SkeletonText,
  Text,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { FC } from "react";
import { trpc } from "@/utils/trpc.ts";

export const ProfileFilled: FC = () => {
  const t = useTranslations();
  const { data: session, status } = useSession();
  const { data: completeness, isLoading: isCompletenessLoading } =
    trpc.user.profileCompleteness.useQuery();
  return (
    <Container
      py={5}
      display={"flex"}
      flexDir={"column"}
      h={"100%"}
      justifyContent={"space-between"}
    >
      <Heading fontSize={"lg"}>
        <SkeletonText
          noOfLines={1}
          skeletonHeight={"1.125rem"}
          endColor="#D4D4D4"
          isLoaded={!isCompletenessLoading}
        >
          {t("dashboard.main_profile_filled")} {completeness}%
        </SkeletonText>
      </Heading>
      <SkeletonText
        isLoaded={status !== "loading"}
        endColor="#D4D4D4"
        noOfLines={1}
      >
        <Text fontSize={"sm"}>
          {t("dashboard.main_profile_status")} -{" "}
          {session?.user?.speaker
            ? t("dashboard.main_profile_speaker")
            : t("dashboard.main_profile_user")}
          .
        </Text>
      </SkeletonText>
      <Text fontSize={"sm"}>{t("dashboard.main_profile_fill_60")}</Text>
      <Box position={"relative"} mt={[3, 3, 3, 0, 0, 0]}>
        <Progress
          value={completeness || undefined}
          borderRadius={10}
          height="26px"
          colorScheme={"brand"}
          bgColor={"white"}
        />
        <Box
          position={"absolute"}
          transform={"translate(-50%, -30%)"}
          left={"60%"}
          _before={{
            content: '"|"',
            fontSize: "xx-small",
            lineHeight: 1,
          }}
        >
          <Text fontSize={"sm"} lineHeight={0.4}>
            60
          </Text>
        </Box>
        <Box
          position={"absolute"}
          transform={"translate(-50%, -30%)"}
          left={"90%"}
          _before={{
            content: '"|"',
            fontSize: "xx-small",
            lineHeight: 1,
          }}
        >
          <Text fontSize={"sm"} lineHeight={0.4}>
            90
          </Text>
        </Box>
      </Box>
      <Text pt={[9, 9, 9, 6, 6, 3]} fontSize={"xs"} fontWeight={300}>
        {t("dashboard.main_profile_speaker_minimum")}
      </Text>
    </Container>
  );
};
