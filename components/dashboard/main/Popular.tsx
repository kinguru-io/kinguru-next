import {
  AbsoluteCenter,
  Box,
  Container,
  Flex,
  Heading,
  Text,
  Image,
  AspectRatio,
} from "@chakra-ui/react";
import moment from "moment";
import Link from "next/link";
import { FC } from "react";
import { trpc } from "@/utils/trpc.ts";
import { useLocale } from "@/utils/use-locale.ts";

export const Popular: FC = () => {
  const { t } = useLocale();
  const { data: popularEvents } = trpc.event.popularEvents.useQuery();
  return (
    <>
      <Container
        py={5}
        w={["sm", "sm", "sm", "100%", "100%", "100%"]}
        overflow={"hidden"}
      >
        <Heading fontSize={"lg"}>{t("dashboard.main_popular")}</Heading>
        <Text mt={1} fontSize={"sm"}>
          {t("dashboard.main_popular_do_not_miss")}
        </Text>
        <Flex w={"120%"} mt={1}>
          {popularEvents?.map((event) => (
            <Box w={"230px"} mr={3}>
              <AspectRatio maxW="230px" ratio={1.7}>
                <Image
                  src={event.poster || undefined}
                  alt={event.topic}
                  borderRadius={10}
                />
              </AspectRatio>
              <Heading mt={1} fontSize={"md"}>
                {event.topic}
              </Heading>
              <Text fontSize={"sm"}>
                {moment(event.starts).format("DD.MM.yyyy hh:mm")}
              </Text>
            </Box>
          ))}
        </Flex>
      </Container>
      <AbsoluteCenter
        as={Link}
        bg={
          "linear-gradient(90deg, transparent 0%, transparent 50%, #A79E9E 100%)"
        }
        transition={"all 0.1s ease-out"}
        _hover={{
          opacity: 0.7,
        }}
        w={"full"}
        h={"full"}
        borderRadius={10}
        justifyContent={"center"}
        alignItems={"center"}
        p={5}
        href={"/events"}
      />
    </>
  );
};
