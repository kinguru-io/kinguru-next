import Link from "next/link";
import prisma from "@/server/prisma";
import { Center } from "~/styled-system/jsx";
import { button } from "~/styled-system/recipes";

export default async function VenueListingPage() {
  const venues = await prisma.venue.findMany({
    select: {
      id: true,
      slug: true,
      name: true,
    },
  });

  return (
    <Center flexDirection="column">
      {venues.map(({ id, name, slug }) => (
        <Link
          className={button({ variant: "ghost" })}
          key={id}
          href={`/venues/${slug}`}
        >
          {name}
        </Link>
      ))}
    </Center>
  );
}
