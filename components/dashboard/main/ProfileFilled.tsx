import {
  Box,
  Container,
  Heading,
  Progress,
  SkeletonText,
  Text,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { FC } from "react";
import { trpc } from "@/utils/trpc.ts";
import { useLocale } from "@/utils/use-locale.ts";

export const ProfileFilled: FC = () => {
  const { t } = useLocale();
  const { data: session, status } = useSession();
  const { data: completeness, isLoading: isCompletenessLoading } =
    trpc.user.profileCompleteness.useQuery();
  return (
    <Container py={5}>
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
        <Text pt={1} fontSize={"sm"}>
          {t("dashboard.main_profile_status")} -{" "}
          {session?.user?.speaker
            ? t("dashboard.main_profile_speaker")
            : t("dashboard.main_profile_user")}
          .
        </Text>
      </SkeletonText>
      <Text pt={2} fontSize={"sm"}>
        {t("dashboard.main_profile_fill_60")}
      </Text>
      <Box position={"relative"}>
        <Progress
          mt={5}
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
      <Text pt={9} fontSize={"xs"} fontWeight={300}>
        {t("dashboard.main_profile_speaker_minimum")}
      </Text>
    </Container>
  );
};
