import { Client } from "@elastic/elasticsearch";
import { env } from "@/env";
import { Link } from "@/navigation.ts";
import prisma from "@/server/prisma.ts";
import { VStack } from "~/styled-system/jsx";

export default async function EventsPage() {
  const client = new Client({
    node: env.ELASTICSEARCH_URL,
  });

  const data = await client.search({
    index: "kinguru.public.event",
    query: {
      match_all: {},
    },
    aggs: {
      tags: {
        terms: {
          field: "tags.keyword",
        },
      },
    },
  });

  const events = await prisma.event.findMany({
    take: 10,
  });
  return (
    <VStack>
      <pre>{JSON.stringify(data, null, 4)}</pre>
      {events.map((event) => (
        <Link key={event.id} href={`/events/${event.slug}`}>
          {event.topic}
        </Link>
      ))}
    </VStack>
  );
}
