import { Avatar, Container, Flex, Heading } from "@chakra-ui/react";
import Flicking from "@egjs/react-flicking";
import { useInView } from "react-intersection-observer";
import { Stripes } from "@/components/common/stripes";
import { trpc } from "@/utils/trpc.ts";
import "@egjs/react-flicking/dist/flicking.css";
import { useTranslations } from "next-intl";

export const EventGuestsSection = ({ eventId }: { eventId: string }) => {
  const t = useTranslations();
  const {
    data: users,
    fetchNextPage,
    hasNextPage,
  } = trpc.event.usersOnEvent.useInfiniteQuery(
    { limit: 40, eventId },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    },
  );
  const { ref } = useInView({
    threshold: 0,
    onChange: (inView) => (inView && hasNextPage ? fetchNextPage() : null),
  });
  return (
    <Container
      maxWidth={"100%"}
      py={16}
      px={0}
      style={{
        position: "relative",
        background:
          "#ffd800 url(/img/parallax-speakers.png) no-repeat center center",
        backgroundAttachment: "fixed",
        backgroundSize: "contain",
        color: "black",
      }}
    >
      <Heading variant={"brand"}>{t("events.meeting_guests")}</Heading>
      <Stripes color={"white"} />
      <Flex w={"full"} mx={"auto"}>
        <Flicking hideBeforeInit={true}>
          {users?.pages
            .reduce((acc, page) => ({
              items: acc.items.concat(page.items),
              nextCursor: page.nextCursor,
            }))
            .items.map((user, index, allUsers) => (
              <div key={user.user.id}>
                <Avatar
                  mx={1}
                  size="2xl"
                  name={user.user.name || undefined}
                  src={user.user.image || undefined}
                />
                <div
                  ref={index + 1 === allUsers.length ? ref : undefined}
                ></div>
              </div>
            ))}
        </Flicking>
      </Flex>
    </Container>
  );
};
