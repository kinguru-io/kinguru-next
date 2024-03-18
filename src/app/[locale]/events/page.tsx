import { Link } from "@/navigation.ts";
import prisma from "@/server/prisma.ts";
import { VStack } from "~/styled-system/jsx";

export default async function EventsPage() {
  const events = await prisma.event.findMany({
    take: 10,
  });
  return (
    <VStack>
      {events.map((event) => (
        <Link key={event.id} href={`/events/${event.slug}`}>
          {event.topic}
        </Link>
      ))}
    </VStack>
  );
}
