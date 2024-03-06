"use server";
import { notFound } from "next/navigation";
import { MainInfo } from "./MainInfo";
import { PopularEvents } from "./PopularEvents";
import prisma from "@/server/prisma";

export default async function EventPage({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const event = await prisma.event.findFirst({
    where: { slug },
    include: {
      usersOnEvent: { include: { user: true } },
      speakersOnEvent: { include: { speaker: { include: { user: true } } } },
      place: true,
    },
  });

  const popularEvents = await prisma.event.findMany({
    take: 3,
    include: {
      usersOnEvent: { include: { user: true } },
    },
  });

  if (!event) {
    notFound();
  }

  return (
    <>
      <MainInfo event={event} />
      <PopularEvents popularEvents={popularEvents} />
    </>
  );
}
