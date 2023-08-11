import { Navbar } from "@/components/navbar";
import { trpc } from "@/utils/trpc";

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
      <Navbar />
      {events?.pages.map((page) =>
        page.items.map((event) => {
          return <li>{event.topic}</li>;
        }),
      )}
      <button onClick={() => fetchNextPage()}>
        {hasNextPage ? "Next" : "That's all"}
      </button>
      Events
    </>
  );
}
