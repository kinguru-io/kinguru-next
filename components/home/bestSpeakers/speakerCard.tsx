import {
  Heading,
  Avatar,
  Box,
  Center,
  Image,
  Flex,
  Text,
  Stack,
  Button,
  useColorModeValue,
  Skeleton,
} from "@chakra-ui/react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { trpc } from "@/utils/trpc.ts";
import { useLocale } from "@/utils/use-locale.ts";

export const SpeakerCard = ({
  speaker,
}: {
  speaker: {
    id: string;
    user: {
      image: string | null;
      name: string | null;
      position: string | null;
      company: string | null;
    };
  };
}) => {
  const { t } = useLocale();
  const { status: userStatus } = useSession();
  const { mutateAsync: followSpeaker, isLoading: followSpeakerLoading } =
    trpc.speaker.followSpeaker.useMutation();
  const { mutateAsync: unfollowSpeaker, isLoading: unfollowSpeakerLoading } =
    trpc.speaker.unfollowSpeaker.useMutation();
  const { data: isFollowing, refetch: isFollowingRefetch } =
    trpc.speaker.isFollowing.useQuery({
      speakerId: speaker.id,
    });
  const {
    data: followers,
    refetch: followersRefetch,
    isLoading: isFollowersLoading,
  } = trpc.speaker.speakerFollowers.useQuery({
    speakerId: speaker.id,
  });
  return (
    <>
      <Center py={6}>
        <Box
          w={"full"}
          bg={useColorModeValue("white", "gray.800")}
          boxShadow={"2xl"}
          rounded={"md"}
          overflow={"hidden"}
        >
          <Image
            h={"120px"}
            w={"full"}
            src={
              "https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
            }
            objectFit="cover"
            alt={speaker.user.name ?? "Speaker"}
          />
          <Flex justify={"center"} mt={-12}>
            <Avatar
              size={"xl"}
              src={speaker.user.image ?? undefined}
              css={{
                border: "2px solid white",
              }}
            />
          </Flex>

          <Box p={6}>
            <Stack spacing={0} align={"center"} mb={5}>
              <Heading
                as={Link}
                fontSize={"2xl"}
                mb={5}
                fontWeight={500}
                fontFamily={"body"}
                href={`/speakers/${speaker.id}`}
              >
                {speaker.user.name}
              </Heading>
              <Text color={"gray.500"}>{speaker.user.position}</Text>
              <Text color={"gray.500"}>{speaker.user.company}</Text>
            </Stack>

            <Stack direction={"row"} justify={"center"} spacing={6}>
              <Stack spacing={0} align={"center"}>
                <Skeleton isLoaded={!isFollowersLoading}>
                  <Text fontWeight={600}>{followers?._count.followers}</Text>
                </Skeleton>
                <Text fontSize={"sm"} color={"gray.500"}>
                  {t("best_speakers.followers")}
                </Text>
              </Stack>
            </Stack>

            {userStatus === "authenticated" && isFollowing ? (
              <Button
                w={"full"}
                mt={8}
                isLoading={unfollowSpeakerLoading}
                variant={"primary"}
                onClick={() =>
                  unfollowSpeaker({ speakerId: speaker.id })
                    .then(() => isFollowingRefetch())
                    .then(() => followersRefetch())
                }
              >
                {t("best_speakers.unfollow")}
              </Button>
            ) : (
              <Button
                w={"full"}
                mt={8}
                isLoading={followSpeakerLoading}
                variant={"primary"}
                onClick={() =>
                  followSpeaker({ speakerId: speaker.id })
                    .then(() => isFollowingRefetch())
                    .then(() => followersRefetch())
                }
              >
                {t("best_speakers.follow")}
              </Button>
            )}
          </Box>
        </Box>
      </Center>
    </>
  );
};
