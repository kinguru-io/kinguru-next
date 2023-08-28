import { SimpleGrid } from "@chakra-ui/react";
import InfiniteScroll from "react-infinite-scroll-component";
import { FooterSection } from "@/components/footer";
import { EventCard } from "@/components/home/events/eventCard.tsx";
import SidebarWithHeader from "@/components/sidebarHeader";
import { trpc } from "@/utils/trpc.ts";

export default function Events() {
  const {
    data: events,
    fetchNextPage,
    hasNextPage,
  } = trpc.event.all.useInfiniteQuery(
    { limit: 10 },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    },
  );
  return (
    <>
      <SidebarWithHeader>
        <InfiniteScroll
          dataLength={
            events?.pages.reduce(
              (total, page) => total + page.items.length,
              0,
            ) || 0
          }
          next={fetchNextPage}
          hasMore={hasNextPage || false}
          loader={<h4>Loading...</h4>}
          endMessage={<FooterSection />}
        >
          <SimpleGrid columns={[1, 2, 2, 3, 3, 4]} spacingY={5}>
            {events?.pages.map((page) =>
              page.items.map((event) => <EventCard event={event} />),
            )}
          </SimpleGrid>
        </InfiniteScroll>
      </SidebarWithHeader>
    </>
  );
}
